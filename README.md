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
git clone https://github.com/huzefa182/gammastack-contactbook-ratlamwala-huzefa.git <folder-name>
```
### Project Setup
Once you clone or download project go into you folder

>now cope **.env.local** file to **.env** file

### Database Config Setup
```
DB_HOST=localhost                                       # database connection host
DB_USER=root                                            # database username
DB_PASS=secret@123                                      # database password
DB_NAME=contactbook                                     # database name
DB_DIALECT=postgres                                     # database dialect
DB_PORT=3306                                            # database port
DB_TIMEZONE='+00:00'                                    # database timezone
DATABASE_URL=postgres://username:password@host/dbname   # database url
```
some other inportant parameters/keys in **.env** file
```
NODE_ENV=development         # application environment
APP_HOST=localhost           # application host name
SWAGGER_HOST=localhost:3000  # swagger host name
PORT=3000                    # application port
SECRET=secret                # secret key for encrypt/decrypt JWT token
```

### Migration and Seeders run
After creating database and updating .env file run below commands
```
> node_modules/.bin/sequelize db:migrate
> node_modules/.bin/sequelize db:seed:all
```

### Installing
```
> **npm install** (this will install all dependent libraries)
> **npm start** (this will run your project locally)
> **npm run test** (this will run the test cases locally)
```

# Other Information about setup/commands
## Middlewares
```
> ApiAuth this will check user access token that we have return in login response.
> AdminAuth this will check admin auth and it's access.
```
## Routing files
> Currently we have added 3 routing files 
```
> account.js   # contains route for login, register, profile
> contact.js   # contains route for creating contact in firebase
```
## API Documentation URL
> https://localhost:3000/api-docs or https://gammastack-contactbook.herokuapp.com/api-docs

## API BASE URL
> https://localhost:3000/api or https://gammastack-contactbook.herokuapp.com/api

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