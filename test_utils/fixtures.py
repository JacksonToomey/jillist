import factory
from factory.alchemy import SQLAlchemyModelFactory
from faker import Factory
import models


fake = Factory.create()


class UserFactory(SQLAlchemyModelFactory):
    class Meta:
        model = models.User
        sqlalchemy_session = models.db.session
        sqlalchemy_session_persistence = 'commit'

    username = factory.LazyAttribute(lambda o: fake.user_name())
    email = factory.LazyAttribute(lambda o: fake.safe_email())


class TaskFactory(SQLAlchemyModelFactory):
    class Meta:
        model = models.Task
        sqlalchemy_session = models.db.session
        sqlalchemy_session_persistence = 'commit'
