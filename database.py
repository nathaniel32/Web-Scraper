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

class TScrap(model_base):
    __tablename__ = 't_scrap'
    id_s = Column(Integer, primary_key=True, autoincrement=True)
    url_s = Column(Text, unique=True, nullable=False)
    time_s = Column(Integer, default=func.now(), nullable=False)

class TCategory(model_base):
    __tablename__ = 't_category'
    id_c = Column(Integer, primary_key=True, autoincrement=True)
    name_c = Column(Text, unique=True, nullable=False)

class TData(model_base):
    __tablename__ = 't_data'
    id_d = Column(Integer, primary_key=True, autoincrement=True)
    id_s = Column(Integer, ForeignKey('t_scrap.id_s'), nullable=False)
    id_c = Column(Integer, ForeignKey('t_category.id_c'), nullable=False)
    data_d = Column(Text, nullable=False)

    scrap = relationship('TScrap', backref='data')
    category = relationship('TCategory', backref='data')

model_base.metadata.create_all(bind=database_engine)

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]