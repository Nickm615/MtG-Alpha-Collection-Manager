//I copied this directly from mini-project unit 14. We can delete what we don't need, add what we do, etc. --Nick
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const passport = require("passport");
const bcrypt = require("bcrypt");
const routes = require("./controllers");
const models = require("./models");
// const helpers = require('')

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: { maxAge: 86400000 },
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize,
  // }),
};

app.use(session(sess));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require("./controllers/authcontroller");
authRoute(app, passport);

app.use(authRoute);

const passportFunction = require("./config/passport/passport.js");
passportFunction(passport, models.User);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at${PORT}`));
});
