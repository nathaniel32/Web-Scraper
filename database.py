from sqlalchemy import create_engine, Column, Integer, Text, func, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends
import config

URL_DATABASE = f'sqlite:///{config.DATABASE_PATH}'

database_engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

session_local = sessionmaker(autocommit=False, autoflush=False, bind=database_engine)

model_base = declarative_base()

class TScraping(model_base):
    __tablename__ = 't_scraping'

    url_s = Column(Text, primary_key=True)
    title_s = Column(Text, nullable=True)
    description_s = Column(Text, nullable=True)
    location_s = Column(Text, nullable=True)
    email_s = Column(Text, nullable=True)
    content_s = Column(Text, nullable=True)
    time_s = Column(Integer, default=func.now())

model_base.metadata.create_all(bind=database_engine)

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]