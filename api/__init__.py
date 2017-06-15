from flask import Blueprint, jsonify, g, request
from flask_login import login_required
from serializers import TaskSchema
import models


api = Blueprint('api', __name__)


@api.route('/tasks/', methods=['GET'])
@login_required
def get_tasks():
    tasks = g.user.tasks.order_by('created').all()
    return jsonify(TaskSchema(many=True).dump(tasks).data)


@api.route('/tasks/', methods=['POST'])
@login_required
def create_task():
    data, error = TaskSchema(
        context={'user': g.user}
    ).load(request.get_json())
    if error:
        return jsonify(error), 422
    models.db.session.add(data)
    models.db.session.commit()
    return jsonify(TaskSchema().dump(data).data), 201
