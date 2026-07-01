import os
import urllib.parse
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / ".env"

class Settings(BaseSettings):
    MYSQL_HOST: str = "localhost"
    MYSQL_USER: str = "root"
    MYSQL_PASSWORD: str = "Ajay@2004"
    MYSQL_DATABASE: str = "ajay_portfolio"
    
    DATABASE_URL: str | None = None

    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "kmajay2004@gmail.com"
    SMTP_PASSWORD: str = ""
    SMTP_FROM: str = "kmajay2004@gmail.com"
    
    FALLBACK_TO_SQLITE: bool = True
    SQLITE_URL: str = "sqlite:///./portfolio.db"

    model_config = SettingsConfigDict(env_file=ENV_FILE, env_file_encoding="utf-8", extra="ignore")

    @property
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        encoded_password = urllib.parse.quote_plus(self.MYSQL_PASSWORD)
        return f"mysql+pymysql://{self.MYSQL_USER}:{encoded_password}@{self.MYSQL_HOST}/{self.MYSQL_DATABASE}"

settings = Settings()
