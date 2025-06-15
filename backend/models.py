from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class File(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    content_type = Column(String)
    upload_time = Column(DateTime, default=datetime.utcnow)
