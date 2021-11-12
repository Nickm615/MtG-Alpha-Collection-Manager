# MtG Alpha Collection Manager

![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)

## Description

This is a set collection tracker that presents the user with a gallery of cards from Magic's first set and allows them to add them to a virtual collection.


## Table of Contents

- [Installation](#Installation)

- [Usage](#Usage)

- [Technologies](#Technologies)

- [Credits](#Credits)

- [License](#License)

- [Thanks](#Thanks)


## Installation

If you down load the package.json file, you just need to run: 

```npm install```

and then set up a .env file with:
```
DB_NAME=mtgcollection_db
DB_PASSWORD=[your MySQL password]
DB_USER=[your MySQL username]
```

## Usage

Create an account on the starting screen and log in. You will be directed to your empty collection. Use the navigation bar to go to the add cards screen, where you can click on any given card to add it to your collection. Find the live website on heroku here: https://mtg-alpha-collection-manager.herokuapp.com/ 

You can log in using these credentials: RichardGarfieldPHD@wizards.com with the password 'testtest'.

## Technologies

Technologies used were:

- Node.js
- Javascript
- HTML
- CSS
- Bootstrap
- Handlebars
- bcrypt
- Express
- MTGSDK
- Passport
- Sequelize

Production deployment on Heroku using JAWSDB.

## Credits

Sarah Garrison https://github.com/segarrison, Nate Skidmore https://github.com/nskidmore7, Nick Margaritondo https://github.com/Nickm615

Magic: The Gathering is owned by Wizards of the Coast


## License

This project is licensed under MIT
You can find out more about this license by clicking this badge: ![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)

## Thanks

This project could not have been completed without the help of our instructional team: Poornima Sewak and Veronica Harris.

Passport implimentation was greatly helped by jasymascarenas' repo found [here.](https://github.com/jaymascarenas/node-passport-sequelize)