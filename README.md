### pyenv installer
```
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
pyenv update
pyenv versions
pyenv install 3.6.5
```

### install venv
```
python3 -m venv venv/
source venv/bin/activate
```

### install modules
```
python setup.py install
```

### launch site
```
source venv/bin/activate
export FLASK_APP="flaskapp.index"
export FLASK_DEBUG=1
flask run
```