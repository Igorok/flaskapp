### pyenv installer
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential python-dev python-setuptools python-pip python-smbus
sudo apt-get install libncursesw5-dev libgdbm-dev libc6-dev
sudo apt-get install zlib1g-dev libsqlite3-dev tk-dev
sudo apt-get install libssl-dev openssl
sudo apt-get install libffi-dev
sudo apt-get install libbz2-dev
sudo apt-get install libreadline-dev wget curl llvm libncurses5-dev xz-utils liblzma-dev

curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
pyenv update
pyenv versions
pyenv install 3.7.1
```

### install venv
```
sudo apt-get install python3-venv
python3 -m venv venv/
source venv/bin/activate
```

### install modules
```
pip install -e .
```

### launch site
```
source venv/bin/activate
export FLASK_APP="flaskapp.index"
export FLASK_DEBUG=1
flask run
```

### webpack
```
increase limit of watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
cd flaskapp/flaskapp/blueprints/web
npm run-script build
```

### test hosting
test-web-application.herokuapp.com