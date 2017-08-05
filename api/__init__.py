from functools import wraps
from flask import Blueprint, jsonify, g, request, abort, current_app
from flask_login import login_required
from serializers import TaskSchema
import models


api = Blueprint('api', __name__)


def admin_required(f):
    @wraps(f)
    def _wrapper(*args, **kwargs):
        if not g.user.email == current_app.config['ADMIN_USER']:
            raise abort(403)
        return f(*args, **kwargs)
    return _wrapper


@api.route('/tasks/', methods=['GET'])
@login_required
def get_tasks():
    tasks = g.user.tasks.active.order_by('created').all()
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
    task = g.user.tasks.active.filter_by(id=task_id).first()
    if not task:
        return abort(404)
    data, error = TaskSchema(
        instance=task,
        context={'user': g.user}
    ).load(request.get_json())
    if error:
        return jsonify(error), 422
    models.db.session.add(data)
    models.db.session.commit()
    return jsonify(TaskSchema().dump(data).data), 200


@api.route('/tasks/<task_id>/', methods=['DELETE'])
@login_required
def delete_task(task_id):
    task = g.user.tasks.active.filter_by(id=task_id).first()
    if not task:
        return abort(404)
    task.deleted = True
    models.db.session.add(task)
    models.db.session.commit()
    return jsonify({}), 202


@api.route('/admin/foo', methods=['GET'])
@login_required
@admin_required
def foo():
    return jsonify({})
