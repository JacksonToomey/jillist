from flask import Flask, render_template, g, request, redirect, abort
from social_flask.routes import social_auth
from flask_login import current_user, LoginManager, login_required
from flask_migrate import Migrate
from serializers import ma
from social_flask_sqlalchemy.models import init_social
from api import api
from models import db, User


def create_app(config='Config'):
    app = Flask(__name__)
    app.config.from_object('config.' + config)

    db.init_app(app)
    Migrate(app, db)
    if config != 'TestConfig':
        init_social(app, db.session)

    lm = LoginManager(app)
    lm.login_view = 'login'

    ma.init_app(app)

    @lm.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    @app.before_request
    def force_ssl():
        if not app.config['SKIP_SSL'] and request.url.startswith('http://'):
            new = request.url.replace('http://', 'https://', 1)
            return redirect(new, code=301)

    @app.before_request
    def global_user():
        g.user = current_user._get_current_object()

    @app.context_processor
    def inject_user():
        try:
            return {'user': g.user}
        except AttributeError:
            return {'user': None}

    app.register_blueprint(social_auth)
    app.register_blueprint(api, url_prefix='/api')

    @app.route('/login')
    def login():
        return render_template('login.html')

    @app.route('/admin/')
    @app.route('/admin/<path:path>')
    @login_required
    def admin(path=None):
        if not g.user.email == app.config['ADMIN_USER']:
            raise abort(403)
        return render_template('admin.html')

    @app.route('/')
    @app.route('/<path:path>')
    @login_required
    def index(path=None):
        return render_template('app.html')

    return app
