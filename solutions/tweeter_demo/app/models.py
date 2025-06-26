from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class Tweet(db.Model):
  __tablename__ = "tweets"

  id = db.Column(db.Integer, primary_key=True)
  author = db.Column(db.String(50), nullable=False)
  tweet = db.Column(db.String(100), nullable=False)
  date = db.Column(db.Date, default=date.today())
  likes = db.Column(db.Integer, default=0)