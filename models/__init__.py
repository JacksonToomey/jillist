import datetime
from sqlalchemy.ext.declarative import declared_attr
from flask_sqlalchemy import SQLAlchemy, BaseQuery


class JillistQuery(BaseQuery):
    @property
    def active(self):
        return self.filter_by(deleted=False)


db = SQLAlchemy(query_class=JillistQuery)


class ModelBase(db.Model):
    __abstract__ = True

    id = db.Column(
        db.Integer,
        primary_key=True,
        nullable=False,
    )
    deleted = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
        server_default=db.text('false'),
    )
    created = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP'),
    )
    updated = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP'),
    )


class Ownable(ModelBase):
    __abstract__ = True

    @declared_attr
    def owner_id(cls):
        return db.Column(
            db.Integer,
            db.ForeignKey('user.id', ondelete='CASCADE'),
            nullable=False,
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
    details = db.Column(
        db.Text,
        nullable=True
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
        default=datetime.datetime.utcnow(),
        server_default=db.text('CURRENT_TIMESTAMP')
    )

    owner = db.relationship(
        'User',
        backref=db.backref(
            'tasks',
            lazy='dynamic',
        )
    )
