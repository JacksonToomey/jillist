import datetime
from sqlalchemy.ext.declarative import declared_attr
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class ModelBase(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    deleted = db.Column(db.Boolean, nullable=False, default=False)
    created = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow
    )
    updated = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow
    )


class Ownable(ModelBase):
    __abstract__ = True

    @declared_attr
    def owner(cls):
        return db.Column(
            db.Integer,
            db.ForeignKey('user.id', ondelete='CASCADE'),
            nullable=False
        )


class User(ModelBase):
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)

    @property
    def is_authenticated(self):
        return self.id is not None

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return not self.is_authenticated

    def get_id(self):
        return str(self.id)


class Task(Ownable):
    description = db.Column(
        db.String(255),
        nullable=False,
        index=True
    )
    closed = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
        index=True,
        server_default=db.text('false'),
    )
    duedate = db.Column(
        db.DateTime,
        nullable=False,
        index=True,
        default=datetime.datetime.utcnow()
    )


# def init_auth(app):
#     lm = LoginManager(app)
#     lm.login_view = 'login'

#     @lm.user_loader
#     def load_user(user_id):
#         return User.query.get(user_id)

#     @app.before_request
#     def global_user():
#         g.user = current_user._get_current_object()

#     @app.context_processor
#     def inject_user():
#         try:
#             return {'user': g.user}
#         except AttributeError:
#             return {'user': None}
