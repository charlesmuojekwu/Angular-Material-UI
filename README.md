
## Angular Material In Depth

# Installation pre-requisites

IMPORTANT: Please use Node 16 LST (Long Term Support version).

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 

# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/charlesmuojekwu/Angular-Material-ui.git

    cd angular-material-ui
    npm ci

Note: **We recommend using npm ci, instead of npm install**. This will ensure that you use the exact dependency versions set on package-lock.json, unlike npm install which might potentially change those versions.

# To Run the Development Backend Server

Our Angular frontend connects to a simple Node server, running also in your local development machine.

We can start the sample application backend with the following command:

    npm run server

# To run the Development UI Server

Once the backend server is up and running, we can now run our frontend server. 

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

Note: **make sure to use command npm start and not ng serve, as npm start adds a couple extra options that are needed for our project **





