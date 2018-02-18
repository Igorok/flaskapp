# -*- coding: utf-8 -*-

# export FLASK_APP="flaskapp.index:create_app()"
# flask run

from setuptools import setup, find_packages

setup(
    name='flaskapp',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flaskapp',
    ],
    setup_requires=[
        'pytest-runner',
    ],
    tests_require=[
        'pytest',
    ],
)