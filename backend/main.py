import logging
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, func
from typing import Optional

from config import settings
from database import init_db, get_session
from models import Enquiry, Stat

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AJAY SATHYESH M - Portfolio API", version="1.0.0")

# Enable CORS for all domains during development.
# In production, specify the client domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

def send_email_notifications(enquiry_id: int, full_name: str, email: str, phone: str, company: str, subject: str, message: str):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    # Log the email content locally
    logger.info(
        f"\n--- LOGGED EMAIL FOR ENQUIRY {enquiry_id} ---\n"
        f"Recipient (Owner): kmajay2004@gmail.com\n"
        f"Recipient (User): {email}\n"
        f"Subject: {subject}\n"
        f"Sender: {full_name} ({phone}) | Company: {company or 'None'}\n"
        f"Message Body:\n{message}\n"
        f"----------------------------------------"
    )

    if not settings.SMTP_PASSWORD:
        logger.warning("SMTP_PASSWORD is empty. Email sending skipped (mock logs created).")
        return

    try:
        # 1. Send notification to portfolio owner
        msg_owner = MIMEMultipart("alternative")
        msg_owner["From"] = settings.SMTP_FROM
        msg_owner["To"] = "kmajay2004@gmail.com"
        msg_owner["Subject"] = f"New Portfolio Enquiry: {subject}"
        
        body_owner_plain = f"""Hello Ajay,

You have received a new enquiry from your portfolio website contact form.

Details:
- Full Name: {full_name}
- Email: {email}
- Phone: {phone}
- Company: {company or "N/A"}
- Subject: {subject}

Message:
{message}

Best regards,
Portfolio System Backend
"""
        body_owner_plain = body_owner_plain.replace("\n", "\r\n")
        part_owner_plain = MIMEText(body_owner_plain, "plain")
        
        html_owner = f"""
<!DOCTYPE html>
<html>
<head>
  <style>
    body {{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f5f7;
      margin: 0;
      padding: 0;
    }}
    .email-container {{
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }}
    .header {{
      background: linear-gradient(135deg, #10b981 0%, #4f46e5 100%);
      padding: 30px 20px;
      text-align: center;
      color: #ffffff;
    }}
    .header h1 {{
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }}
    .content {{
      padding: 30px 25px;
    }}
    .details-table {{
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }}
    .details-table th, .details-table td {{
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }}
    .details-table th {{
      font-weight: 600;
      color: #64748b;
      width: 30%;
    }}
    .details-table td {{
      color: #334155;
    }}
    .message-box {{
      background-color: #f8fafc;
      border-left: 4px solid #10b981;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }}
    .message-header {{
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
    }}
    .message-text {{
      color: #334155;
      white-space: pre-wrap;
    }}
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Portfolio Enquiry</h1>
    </div>
    <div class="content">
      <p>Hello Ajay,</p>
      <p>You have received a new enquiry from your portfolio website contact form.</p>
      
      <table class="details-table">
        <tr>
          <th>Full Name</th>
          <td>{full_name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td><a href="mailto:{email}">{email}</a></td>
        </tr>
        <tr>
          <th>Phone</th>
          <td><a href="tel:{phone}">{phone}</a></td>
        </tr>
        <tr>
          <th>Company</th>
          <td>{company or "N/A"}</td>
        </tr>
        <tr>
          <th>Subject</th>
          <td>{subject}</td>
        </tr>
      </table>
      
      <div class="message-box">
        <div class="message-header">Message</div>
        <div class="message-text">{message}</div>
      </div>
    </div>
  </div>
</body>
</html>
"""
        part_owner_html = MIMEText(html_owner, "html")
        msg_owner.attach(part_owner_plain)
        msg_owner.attach(part_owner_html)

        # 2. Send confirmation to user
        msg_user = MIMEMultipart("alternative")
        msg_user["From"] = settings.SMTP_FROM
        msg_user["To"] = email
        msg_user["Subject"] = "Enquiry Confirmation - Ajay Sathyesh M"
        
        body_user_plain = f"""Hi {full_name},

Thank you for reaching out! This email confirms that I have received your enquiry regarding "{subject}".

I will review your message and get back to you within 24 hours.

Your Message:
---
{message}
---

Best regards,
Ajay Sathyesh M
AI Engineer & Python Developer
Puducherry, India
Email: kmajay2004@gmail.com
LinkedIn: linkedin.com/in/ajaysathyesh
GitHub: github.com/AjaySathyesh
"""
        body_user_plain = body_user_plain.replace("\n", "\r\n")
        part_user_plain = MIMEText(body_user_plain, "plain")
        
        html_user = f"""
<!DOCTYPE html>
<html>
<head>
  <style>
    body {{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f5f7;
      margin: 0;
      padding: 0;
    }}
    .email-container {{
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }}
    .header {{
      background: linear-gradient(135deg, #4f46e5 0%, #10b981 100%);
      padding: 30px 20px;
      text-align: center;
      color: #ffffff;
    }}
    .header h1 {{
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }}
    .content {{
      padding: 30px 25px;
    }}
    .greeting {{
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }}
    .message-box {{
      background-color: #f8fafc;
      border-left: 4px solid #4f46e5;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }}
    .message-header {{
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
    }}
    .message-text {{
      font-style: italic;
      color: #334155;
      white-space: pre-wrap;
    }}
    .footer {{
      background-color: #f8fafc;
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }}
    .social-links {{
      margin-top: 15px;
    }}
    .social-links a {{
      color: #4f46e5;
      text-decoration: none;
      margin: 0 10px;
      font-weight: 600;
    }}
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Enquiry Confirmation</h1>
    </div>
    <div class="content">
      <div class="greeting">Hi {full_name},</div>
      <p>Thank you for reaching out! This email confirms that I have received your enquiry regarding <strong>"{subject}"</strong>.</p>
      <p>I will review your message and get back to you within 24 hours.</p>
      
      <div class="message-box">
        <div class="message-header">Your Message</div>
        <div class="message-text">{message}</div>
      </div>
      
      <p>Best regards,</p>
      <p><strong>Ajay Sathyesh M</strong><br>
      AI Engineer & Python Developer<br>
      Puducherry, India</p>
    </div>
    <div class="footer">
      <p>Email: <a href="mailto:kmajay2004@gmail.com" style="color: #64748b; text-decoration: underline;">kmajay2004@gmail.com</a></p>
      <div class="social-links">
        <a href="https://linkedin.com/in/ajaysathyesh" target="_blank">LinkedIn</a> | 
        <a href="https://github.com/AjaySathyesh" target="_blank">GitHub</a>
      </div>
    </div>
  </div>
</body>
</html>
"""
        part_user_html = MIMEText(html_user, "html")
        msg_user.attach(part_user_plain)
        msg_user.attach(part_user_html)

        # Connect and send
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg_owner)
            server.send_message(msg_user)
            
        logger.info(f"Emails successfully sent for enquiry {enquiry_id}")
    except Exception as e:
        logger.error(f"Failed to send email notifications for enquiry {enquiry_id}: {e}")

@app.post("/api/enquiry", status_code=status.HTTP_201_CREATED)
def create_enquiry(
    enquiry: Enquiry, 
    background_tasks: BackgroundTasks, 
    session: Session = Depends(get_session)
):
    try:
        session.add(enquiry)
        session.commit()
        session.refresh(enquiry)
        
        # Trigger background task for emails
        background_tasks.add_task(
            send_email_notifications,
            enquiry.id,
            enquiry.full_name,
            enquiry.email,
            enquiry.phone,
            enquiry.company_name or "",
            enquiry.subject,
            enquiry.message
        )
        
        return {
            "success": True, 
            "message": "Thank you for reaching out. I will get back to you within 24 hours.",
            "data": {
                "id": enquiry.id,
                "full_name": enquiry.full_name
            }
        }
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating enquiry: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save enquiry. Please try again."
        )

@app.get("/api/stats")
def get_stats(session: Session = Depends(get_session)):
    try:
        downloads_stat = session.exec(select(Stat).where(Stat.metric_name == "cv_downloads")).first()
        cv_downloads = downloads_stat.value if downloads_stat else 0
        
        # Perform query count
        total_enquiries = session.exec(select(func.count(Enquiry.id))).first() or 0
        
        return {
            "cv_downloads": cv_downloads,
            "total_enquiries": total_enquiries
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not fetch statistics."
        )

@app.post("/api/download")
def record_download(session: Session = Depends(get_session)):
    try:
        downloads_stat = session.exec(select(Stat).where(Stat.metric_name == "cv_downloads")).first()
        if not downloads_stat:
            downloads_stat = Stat(metric_name="cv_downloads", value=1)
            session.add(downloads_stat)
        else:
            downloads_stat.value += 1
            session.add(downloads_stat)
            
        session.commit()
        session.refresh(downloads_stat)
        
        return {
            "success": True,
            "cv_downloads": downloads_stat.value
        }
    except Exception as e:
        session.rollback()
        logger.error(f"Error updating download stats: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not update download stats."
        )
