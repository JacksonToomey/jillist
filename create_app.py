from flask import Flask


def create_app(config='config'):
    app = Flask(__name__)
    return app
