"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Send, Loader2, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

// Custom SVG components for brand icons that are missing in this version of lucide-react
const GithubIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry. Please try again.");
      }

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#10b981", "#a855f7"],
      });

      setSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company_name: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <Mail className="text-indigo-400" size={18} />, label: "Email", val: "kmajay2004@gmail.com", href: "mailto:kmajay2004@gmail.com" },
    { icon: <Phone className="text-emerald-400" size={18} />, label: "Phone", val: "+91 8190035108", href: "tel:+918190035108" },
    { icon: <MapPin className="text-purple-400" size={18} />, label: "Location", val: "Puducherry, India", href: null },
    { icon: <LinkedinIcon className="text-blue-400" size={18} />, label: "LinkedIn", val: "linkedin.com/in/ajaysathyesh", href: "https://linkedin.com/in/ajaysathyesh" },
    { icon: <GithubIcon className="text-text-muted" size={18} />, label: "GitHub", val: "github.com/AjaySathyesh", href: "https://github.com/AjaySathyesh" },
    { icon: <Globe className="text-indigo-400" size={18} />, label: "Portfolio", val: "ignitelabs.in/ajaysathyesh", href: "http://ignitelabs.in/ajaysathyesh" },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 bg-background border-t border-card-border">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight mb-2">
            Let's Work Together
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-foreground tracking-wide mb-4">Contact Details</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-8">
              Feel free to reach out for project proposals, collaboration, inquiries, or just to say hello. I'm always open to discussing new opportunities.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-card-border bg-card-bg backdrop-blur-md flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background border border-card-border shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-text-muted/70 text-[10px] uppercase font-bold block">{info.label}</span>
                    {info.href ? (
                      <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-foreground/90 hover:text-indigo-500 dark:hover:text-indigo-400 text-sm font-semibold tracking-wide truncate block mt-0.5 transition-colors">
                        {info.val}
                      </a>
                    ) : (
                      <span className="text-foreground/90 text-sm font-semibold tracking-wide truncate block mt-0.5">
                        {info.val}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 rounded-2xl border border-card-border bg-card-bg backdrop-blur-md p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="full_name" className="text-xs text-text-muted font-bold uppercase">Full Name</label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs text-text-muted font-bold uppercase">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                        placeholder="johndoe@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs text-text-muted font-bold uppercase">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="company_name" className="text-xs text-text-muted font-bold uppercase">Company Name</label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs text-text-muted font-bold uppercase">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                      placeholder="Project details..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs text-text-muted font-bold uppercase">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-medium resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && <p className="text-xs text-rose-400 font-semibold">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer disabled:opacity-50 border border-indigo-400/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending Enquiry...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center flex flex-col items-center shadow-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3">Enquiry Submitted!</h3>
                  <p className="text-text-muted font-semibold text-base max-w-md mb-6 leading-relaxed">
                    Thank you for reaching out. I will get back to you within 24 hours.
                  </p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-card-bg border border-card-border hover:border-indigo-500/30 text-text-muted hover:text-foreground font-semibold text-xs transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
