import json
from test_utils import DBTestCase, fixtures
import models


class TestTaskViews(DBTestCase):
    def set_up(self):
        self.user = fixtures.UserFactory()

    def tear_down(self):
        models.User.query.delete()
        models.Task.query.delete()
        models.db.session.commit()

    def test_create_task(self):
        self.assertEqual(0, models.Task.query.count())
        with self.app.test_client() as c:
            with c.session_transaction() as sess:
                sess['user_id'] = self.user.id
            resp = c.post(
                '/api/tasks/',
                data=json.dumps({
                    'description': 'Foo'
                }),
                content_type='application/json',
            )

        self.assertEqual(201, resp.status_code)
        self.assertEqual(1, models.Task.query.count())

        tsk = models.Task.query.first()
        self.assertEqual('Foo', tsk.description)

        data = json.loads(resp.data)
        self.assertEqual('Foo', data['description'])

    def test_get_tasks_only_owned(self):
        u2 = fixtures.UserFactory()
        fixtures.TaskFactory(
            description='First User',
            owner=self.user,
        )
        fixtures.TaskFactory(
            description='Second User',
            owner=u2
        )
        with self.app.test_client() as c:
            with c.session_transaction() as sess:
                sess['user_id'] = self.user.id
            resp = c.get('/api/tasks/')
            self.assertEqual(200, resp.status_code)
            data = json.loads(resp.data)
            self.assertEqual(1, len(data))

            task = data[0]

            self.assertEqual('First User', task['description'])
