from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User




def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[
        DataRequired(),
        Length(min=6, message='Password must be at least 6 characters long.')
    ], render_kw={"placeholder": "Password must be at least 6 characters long"})



# # In your signup_form.py or wherever the form is defined
# from wtforms.validators import DataRequired, Length, Regexp

# class SignUpForm(FlaskForm):
#     # Other fields...
#     password = StringField('password', validators=[
#         DataRequired(message="Password is required"),
#         Length(min=6, message="Password must be at least 6 characters"),
#         Regexp(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', message="Password must contain a number, a lowercase and an uppercase letter")
#     ])