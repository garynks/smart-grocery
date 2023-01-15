# smart-grocery

### For backend devs:

```
cd smartgrocery
virtualenv venv
source venv/bin/active
pip install -r requirements.txt
```

### For frontend devs:

```
cd frontend
npm install
```


## To start the app
First run the Django server:
*note: venv should always be ran. If you've already done `virtualenv venv`, skip that step, as well as `pip install -r requirements.txt`*
```
cd smartgrocery
virtualenv venv
source venv/bin/active
pip install -r requirements.txt
python3 manage.py runserver
```

Now run React in another terminal:
*note: npm install only needs to be done once*
```
cd frontend
npm install
npm start
```
