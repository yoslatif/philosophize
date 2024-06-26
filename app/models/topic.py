from app.models.vote import Vote
from .db import db
from datetime import datetime
from .user import User

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, name='fk_topics_user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    topic_of_the_day = db.Column(db.Boolean, default=False)

    user = db.relationship('User', backref='topics')
    votes = db.relationship('Vote', back_populates='topic')
    comments = db.relationship('Comment', back_populates='topic')
    resources = db.relationship('Resource', back_populates='topic')

    @property
    def vote_count(self):
        return Vote.query.filter_by(topic_id=self.id).count()

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,  
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'vote_count': self.vote_count,
            'topic_of_the_day': self.topic_of_the_day,
        }
