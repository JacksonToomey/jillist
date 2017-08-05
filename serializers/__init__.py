from marshmallow import post_load, fields
from flask_marshmallow import Marshmallow
import models


ma = Marshmallow()


class TaskSchema(ma.ModelSchema):
    class Meta:
        model = models.Task
        sqla_session = models.db.session

    @post_load
    def create_task(self, data):
        if 'user' in self.context:
            data['owner'] = self.context['user']
        return data


class AdminUsageSchema(ma.Schema):
    user = fields.Integer()
    active_count = fields.Integer()
    deleted_count = fields.Integer()
    total_count = fields.Integer()
