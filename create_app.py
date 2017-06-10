from flask import Flask, render_template, g
from social_flask.routes import social_auth
from flask_login import current_user, LoginManager, login_required
from flask_migrate import Migrate
from social_flask_sqlalchemy.models import init_social, PSABase
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

    @lm.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

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

    @app.before_first_request
    def init_app():
        PSABase.metadata.create_all(db.engine)
        db.create_all()

    @app.route('/login')
    def login():
        return render_template('login.html')

    @app.route('/')
    @app.route('/<path:path>')
    @login_required
    def index(path=None):
        return 'coming soon'

    return app
