from unittest import TestCase
from models import db


class DBTestCase(TestCase):
    app = None

    @classmethod
    def setUpClass(cls):
        if DBTestCase.app is None:
            from create_app import create_app
            DBTestCase.app = create_app('TestConfig')
            with DBTestCase.app.app_context():
                db.reflect()
                db.drop_all()
                db.create_all()

    @classmethod
    def tearDownClass(cls):
        if DBTestCase.app is not None:
            with DBTestCase.app.app_context():
                db.reflect()
                db.drop_all()
            DBTestCase.app = None

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
