#!/usr/bin/env python
import click
import unittest
from flask.cli import FlaskGroup
from flask_migrate import MigrateCommand
from create_app import create_app


def create_cli_app(info):
    return create_app()


@click.group(cls=FlaskGroup, create_app=create_cli_app)
def cli():
    pass


@cli.command()
def tests():
    tests = unittest.TestLoader().discover('./tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

cli.add_command(MigrateCommand, 'db')


if __name__ == '__main__':
    cli()
