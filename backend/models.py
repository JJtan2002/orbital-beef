from sqlalchemy import create_engine, Column, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class StockData(Base):
    __tablename__ = 'stock_data'
    id = Column(String, primary_key=True)
    ticker = Column(String)
    close_price = Column(Float)
    date = Column(DateTime)

# PostgreSQL database configuration
DATABASE_URI = 'postgresql://username:password@localhost:5432/yourdatabase'
engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)