from unittest import TestCase
from models import db


class DBTestCase(TestCase):
    app = None

    @classmethod
    def setUpClass(cls):
        print(cls.__name__)
        if cls.app is None:
            from create_app import create_app
            cls.app = create_app('TestConfig')
            with cls.app.app_context():
                db.drop_all()
                db.create_all()

    def setUp(self):
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.set_up()

    def tearDown(self):
        self.tear_down()
        self.app_context.pop()

    def set_up(self):
        pass

    def tear_down(self):
        pass
