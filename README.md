# RECYCLER 
## About: 
This is an interactive recycling competiton application that allows you submit recyling receipts and accumulate points.
Compete with your friends by submitting reciepts on the submission tab and view progress by using the dashboard tab.
Also present is a map of nearby recyling centers, so get to work. May the most enviornmentally friendly win!
This project uses React/Redux to build an interactive webpage and uses Django for the backend
## Set-up and installing 
Clone git repo
### For development: 
Active a python enviorment from recycler file 
```bash 
pipenv shell
```
Install python packages: 
```bash 
pipenv install Pillow
pipenv install django-cors-headers
pipenv install requests
pipenv install django~=3.2.9 djangorestframework django-rest-knox
```
Install other packages: 
```bash 
npm install --save -D webpack webpack-cli
npm install --save -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties
npm install --save react react-dom prop-types
npm install --save react-router@5.1.2 react-router-dom@5.1.2
npm install --save redux react-redux redux-thunk redux-devtools-extension
npm install --save axios
npm install --save react-alert react-alert-template-basic
npm install --save google-map-react
npm install --save mdb-react-ui-kit --force 
```
In one terminal window run 
```bash 
npm run dev
```
In another terminal, to run server AND make migrations 
```bash 
./server_migration_script.sh
```
Alternatively, you can run migrations manully with commands python manage.py makemigrations, then, python manage.py migrate from recyclermanager folder
To just run server: 
```bash 
cd recyclermanager
python manage.py runserver
```