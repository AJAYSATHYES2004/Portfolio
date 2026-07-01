from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Enquiry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    email: str
    phone: str
    company_name: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Stat(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    metric_name: str = Field(index=True, unique=True)
    value: int = Field(default=0)
