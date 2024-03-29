from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class HouseModel(db.Model):
    __tablename = "house"
    house_id = db.Column(db.Integer, primary_key=True)
    house_name = db.Column(db.String(150))
    house_capacity = db.Column(db.Integer())
    house_price = db.Column(db.Integer())
    house_info = db.Column(db.Integer())
    adress_id = db.Column(db.Integer())