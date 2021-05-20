# GAMMASTACK Contact Book
Here API access token encapsulated/encrypted with JWT token based system.
 - API ready for login 
 - API middlewares for normal user
 - ES6 import/export available to the user with spread operators
 - Deploy your app with cluster (cluster implementation is integrated)
 - jest test configured
 - add test case for mock database model/functions to test controllers functions
## Getting Started
You can download this repo or clone using below command. (folder-name will be project folder in which you want to start your project).
```
git clone https://github.com/huzefa182/gammastack-contactbook.git <folder-name>
```
### Project Setup
Once you clone or download project go into you folder

>now cope **.env.local** file to **.env** file

### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Database Config Setup
Create new database (let's say i'm going to use mysql and my database name is **express-sequelize-api**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=express-sequelize-api   # database name
DB_DIALECT=mysql                # database dialect
DB_PORT=3306                    # database port
DATABASE_URL=postgres://username:password@host/dbname   # database url
```
some other inportant parameters/keys in **.env** file
```
APP_HOST=localhost           # application host name
SWAGGER_HOST=localhost:3000  # swagger host name
PORT=3000                    # application port
SECRET=secret                # secret key for encrypt/decrypt JWT token
```

are you going to user google captcha while register? then also add/update in .env 
```
IS_GOOGLE_AUTH_ENABLE=true          # enable google captcha
GOOGLE_CAPTCHA_SECRET_CLIENT=secret
GOOGLE_CAPTCHA_SECRET_SERVER=secret
GOOGLE_CAPTCHA_URL=https://www.google.com/recaptcha/api/siteverify
```


### Migration and Seeders run
After creating database and updating .env file run below commands
```
> node_modules/.bin/sequelize db:migrate
> node_modules/.bin/sequelize db:seed:all
```
Migration will create table users and seed some default users
* **users** - this is normal user table with some required fields like (firstName, lastName, email, password, and isAdmin)
Seeders will create one new client entry in application and 2 users entry one admin and one normal user.

`npm start` to run your project 
>Everythig is setup and you are good to go now. Happy Coding :)



# Other Information about setup/commands
## Middlewares
```
> ApiAuth this will check user access token that we have return in login response.
> AdminAuth this will check admin auth and it's access.
```
## Routing files
> Currently we have added 3 routing files 
```
> account.js   # public routing access everyone can access this APIs
> contact.js   # only logged in user/ with vaild token user can access this routes
```
## API Documentation URL
>here attached link of postman collection you can download and check in local
>https://localhost:3000/api-docs

### Success Response
```
{
    "success": true,
    "code": 200,
    "data": "object or array"
}
```
### Error Response
```
{
    "success": false,
    "code": 500,
    "errorMessage": "Incorrect Email Id/Password",
    "error": {},
    "data": null
}
```