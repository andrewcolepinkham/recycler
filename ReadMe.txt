Readme for recycler web app

PYTHON PACKAGES
- pipenv install Pillow
- pipenv install django-cors-headers
- pipenv install requests
- pipenv install django~=3.2.9 djangorestframework django-rest-knox

DATABASE MIGRATIONS
python manage.py makemigrations
python manage.py migrate

START VIRTUAL ENVIORNMENT
- pipenv shell

NPM PACKAGES
- npm install --save -D webpack webpack-cli
- npm install --save -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties
- npm install --save react react-dom prop-types
- npm install --save react-router@5.1.2 react-router-dom@5.1.2
- npm install --save redux react-redux redux-thunk redux-devtools-extension
- npm install --save axios
- npm install --save react-alert react-alert-template-basic
- npm install --save google-map-react
- npm install --save mdb-react-ui-kit --force 

START WEBPACK
- npm run dev

START DJANGO SERVER
python manage.py runserver