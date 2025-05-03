from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    reset_otp = db.Column(db.String(6), nullable=True)  # Ensure this exists
    otp_expiry = db.Column(db.Integer, nullable=True)   # Ensure this exists'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class PhysicalResource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    condition = db.Column(db.String(50), nullable=True)
    from_date = db.Column(db.DateTime, nullable=False)
    to_date=db.Column(db.DateTime, nullable=False)
    upload_item = db.Column(db.String(255), nullable=False)  # Stores file or image path as a string
    status = db.Column(db.Boolean, nullable=False, default=True)  # True means 'available', False means 'taken'


class DigitalResource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    condition = db.Column(db.String(50), nullable=True)
    upload_item = db.Column(db.String(255), nullable=False)  # Stores file or image path as a string
    status = db.Column(db.Boolean, nullable=False, default=True)  # True means 'available', False means 'taken'
    






# from app import db
# from werkzeug.security import generate_password_hash, check_password_hash

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password_hash = db.Column(db.String(128), nullable=False)
#     reset_otp = db.Column(db.String(6), nullable=True)
#     otp_expiry = db.Column(db.Integer, nullable=True)

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)




