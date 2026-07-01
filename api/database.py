import logging
from sqlalchemy import create_engine, text
from sqlmodel import SQLModel, Session
from api.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

engine = None

def init_db():
    global engine
    # Try connecting to MySQL and creating database if not exists
    mysql_url = settings.get_database_url
    
    try:
        import pymysql
        # Connect to MySQL server first to create database
        conn = pymysql.connect(
            host=settings.MYSQL_HOST,
            user=settings.MYSQL_USER,
            password=settings.MYSQL_PASSWORD
        )
        try:
            with conn.cursor() as cursor:
                cursor.execute(f"CREATE DATABASE IF NOT EXISTS {settings.MYSQL_DATABASE}")
            conn.commit()
            logger.info(f"Database {settings.MYSQL_DATABASE} ensured.")
        finally:
            conn.close()
            
        engine = create_engine(mysql_url, echo=True)
        # Test connection
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        logger.info("Successfully connected to MySQL database!")
    except Exception as e:
        logger.warning(f"Failed to connect to MySQL database: {e}")
        if settings.FALLBACK_TO_SQLITE:
            sqlite_url = settings.get_sqlite_url
            logger.info(f"Falling back to SQLite database at: {sqlite_url}")
            engine = create_engine(sqlite_url, connect_args={"check_same_thread": False}, echo=True)
        else:
            raise e

    # Create tables
    from api.models import Enquiry, Stat  # Ensure models are imported
    SQLModel.metadata.create_all(engine)
    
    # Initialize download counter stat if not exists
    with Session(engine) as session:
        from sqlmodel import select
        db_stat = session.exec(select(Stat).where(Stat.metric_name == "cv_downloads")).first()
        if not db_stat:
            session.add(Stat(metric_name="cv_downloads", value=0))
            session.commit()

def get_session():
    global engine
    if engine is None:
        init_db()
    with Session(engine) as session:
        yield session
