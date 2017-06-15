from flask import Blueprint, jsonify, g, request, abort
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


@api.route('/tasks/<task_id>/', methods=['PUT'])
@login_required
def update_task(task_id):
    task = g.user.tasks.filter_by(id=task_id).first()
    if not task:
        return abort(404)
    data, error = TaskSchema(
        instance=task,
        # partial=True,
        context={'user': g.user}
    ).load(request.get_json())
    if error:
        return jsonify(error), 422
    models.db.session.add(data)
    models.db.session.commit()
    return jsonify(TaskSchema().dump(data).data), 200
