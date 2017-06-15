from marshmallow import post_load
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
