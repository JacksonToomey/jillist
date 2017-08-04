import os


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SOCIAL_AUTH_AUTHENTICATION_BACKENDS = (
        'social_core.backends.google.GoogleOAuth2',
    )
    SOCIAL_AUTH_FIELDS_STORED_IN_SESSION = ['keep']
    SOCIAL_AUTH_LOGIN_URL = '/login'
    SOCIAL_AUTH_USER_MODEL = 'models.User'
    SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/'
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ.get('GOOGLE_CLIENT_ID')
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    DEBUG = os.environ.get('DEBUG', '0') == '1'
    SKIP_SSL = os.environ.get('SKIP_SSL', '0') == '1'
    ADMIN_USER = os.environ.get('ADMIN_USER', None)
    TESTING = False
    LOGIN_DISABLED = False


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL')
    TESTING = True
