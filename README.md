# Social-Media App (FB Clone) MERN Stack Application

## Description

![image](https://github.com/Abdul-Moiz-i999/Social-Media/assets/67798125/f1788230-07d4-4857-9a7a-24775c80a4ca)

![image](https://github.com/Abdul-Moiz-i999/Social-Media/assets/67798125/ff12b141-0568-4e1f-b63c-cdc83836db34)

![image](https://github.com/Abdul-Moiz-i999/Social-Media/assets/67798125/8de5904d-c73d-4096-b15d-92ddf914da5e)

Welcome to this MERN (MongoDB, Express.js, React, Node.js) Stack practice project, a social platform designed for user interaction. This platform enables users to register, log in, share posts, images, follow other users, and like posts.
Currently, the follow functionality is not implemented on the front end side but you can use any api tester to manually call those endpoints (explained at the end).

# Technology Stack

## Frontend:
+ ReactJS
+ Vanilla CSS

## Backend:

+ Implemented in Node.js.
+ Utilizes MongoDB as the database.
+ Mongoose is employed for seamless interaction with the database.
+ Helmet is employed to securely store images locally on the server.

### Security Measures:

+ Utilizes bcrypt encryption for secure password storage.

# Prerequisites:
+ NodeJS
+ MongoDB Installed Locally on the Machine OR you can provide your own MongoDB atlas link in the connection url in the index.js file in the node.
+ Mongosh or MongoDbCompass for locally running the database

# Instructions To Setup

## Frontend: ##

### Yarn: ###
```
yarn
yarn start
```
### Npm: ###
```
npm i
npm start
```

## Backend: ##
+ Rename .env.example to .env
+ Run the database locally using mongosh or mongoDbCompass
+ If don't wanna run locally then register for MongoDB Atlas and provide it's connection URL in the index.js connection string.

### Running the Server: ###
```
yarn or npm i
node index.js
```

## For Following Functionality:
+ Install Insomnia or Postman or whichever api tester you like
+ Make a Request to the id of the user like that (localhost:8800/api/users/6554d799c5b17aa4e37f2e85/follow) Must include the login user id in the body "userId" variable like below
<img width="644" alt="image" src="https://github.com/Abdul-Moiz-i999/Social-Media/assets/67798125/568d244d-6ace-4da5-a5d9-05e418ccb97c">

### Thanks to LamaDev 
