from flask import Blueprint, jsonify, g
from flask_login import login_required


api = Blueprint('api', __name__)


@api.route('/tasks/', methods=['GET'])
@login_required
def get_tasks():
    tasks = g.user.tasks.order_by('created').all()
    return jsonify([])
