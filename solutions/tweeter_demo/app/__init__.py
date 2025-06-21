from flask import Flask, render_template, redirect
from datetime import date
import random

from .config import Config
from .tweets import tweets
from .form.form import TweetForm

app = Flask(__name__)

app.config.from_object(Config)

@app.route("/")
def home():
  tweet = random.choice(tweets)

  return render_template("index.html", tweet=tweet)

@app.route("/feed")
def feed():
  return render_template("feed.html", tweets=tweets)

@app.route("/new", methods=["GET", "POST"])
def new_tweet_form():
  form = TweetForm()

  if form.validate_on_submit():
    new_tweet = {
      "id": len(tweets),
      "author": form.data["author"],
      "tweet": form.data["tweet"],
      "date": date.today(),
      "likes": 0,
    }

    
    return redirect("/feed")
  
  if form.errors:
    return form.errors

  return render_template("new_tweet.html", form=form)