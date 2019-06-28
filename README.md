# OMDB App
* Search for a movie on OMDB
* See Movies that have been rated by Users
* Add in a Movie, With a Rating or Comment
* Update a Movie Rating or Comment
* Delete a Movie (n/a)

http://omdb.alicechuang.com/ (Reverse Proxy not working. Please install below to run!)

![](https://github.com/AliceWonderland/Omdb-App/blob/master/public/assets/imgs/favorites.png)

### Stack + Tech
* React
* Express
* Postgres/Sequelize
* Node
* Webpack/Babel
* Fetch
* Sass

### Pre-Installation
* Node.js https://nodejs.org/en/
* Postgres https://postgresapp.com/
* Postico https://eggerapps.at/postico/
* Make sure Postgres is running
* Open Postico > Create new db named "omdb-app"

### Installation
From Terminal/Command Line, run the following:
* `git clone https://github.com/AliceWonderland/Omdb-App.git`
* `cd Omdb-App`
* `npm install`
* `npm run start`
* Browse to http://localhost:3003/

### Dirs + Files
* App Root `/client/index.js`
* Server Root `/server/index.js`
* Views `/client/components`
* DB `/db/models`
* API `/server/api`
* CSS `/public/styles.scss`


### Notes:
This app is built using my barebones react-app skelly.
https://github.com/AliceWonderland/React-App

<img src="https://github.com/AliceWonderland/Omdb-App/blob/master/public/assets/imgs/landing.png" width="225" /> <img src="https://github.com/AliceWonderland/Omdb-App/blob/master/public/assets/imgs/detail.png" width="225" /> <img src="https://github.com/AliceWonderland/Omdb-App/blob/master/public/assets/imgs/search.png" width="225" />