# Server for the Vehicle Verification Application

VVApp

## Description

The application makes use of QR-Codes to handle data storage and transmission

## Working Principle

- The application gets the user's information, such as driver's license and vehicle information
- The application moves to store the data in the database and stores it
- The application generates a QR-Code, which is then handed over to the driver and is applied anywhere for visibility
- To get the user of a vehicle and the details the QR-Code is scanned by the application and the details of the user is recoverd from the code.
- The identification number of the data is then cross-matched with an identification number from the database to determine the validity of the code.

## Deployment

- The application is run on a typescript base node server
- The application is being handled under an NGINX server
- The application is being deployed on heroku
- The mobile application is being deployed for iOS and Android OS

## Technologies

- NodeJS
- TypeScript
- React Native
- Docker
- Heroku
- Git
- MySQL

## Routes

### user auth

- http://localhost:7070/api/v1/auth/ [create-account] [POST]

- http://localhost:7070/api/v1/auth/login/local [local-login] [POST]

- http://localhost:7070/api/v1/auth/login/google [google-login] [GET]

- http://localhost:7070/api/v1/auth/login/google/callback [google-login-callback] [GET]

- http://localhost:7070/api/v1/auth/users [get-users] [GET] [DEV]

### registered

- http://localhost:7070/api/v1/registered/ [create-new-register] [POST]

- http://localhost:7070/api/v1/registered/confirmation/:id [confirm-register] [GET]

- http://localhost:7070/api/v1/registered/details/email/:email [get-register-by-email] [GET]

- http://localhost:7070/api/v1/registered/details/license/:license [get-register-by-license] [GET]

- http://localhost:7070/api/v1/registered/details/id/:id [get-register-by-id] [GET]

## Address

- heroku address: https://vehicle-auth-app.herokuapp.com/

### Deployment Process

- run "npm run build" on general server folder to create a JS version of the app inside the public folder

- take documents from public folder and insert into server/build/src

- add folder server/src/env to build/src

- commit changes to git in folder server/build

- push changes to heroku

## Heroku Terminal

-run "heroku logs --tail" for terminal watching
