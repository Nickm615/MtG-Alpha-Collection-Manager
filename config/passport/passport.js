const bCrypt = require("bcrypt");

module.exports = (passport, user) => {
  // console.log(user);
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      if (user) {
        return done(null, user.get());
      } else {
        return done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var generateHash = (password) => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        // console.log(user);
        User.findOne({ where: { email: email } }).then((user) => {
          // console.log(user);
          if (user) {
            console.log("user exist");
            return done(null, false, {
              message: "That email is already taken",
            });
          } else {
            console.log("no user");

            var userPassword = generateHash(password);
            var data = {
              email: email,
              username: req.body.username,
              password: userPassword,
              first_name: req.body.firstname,
              last_name: req.body.lastname,
            };
            //   console.log(data);
            User.create(data).then((newUser) => {
              console.log(newUser);
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var User = user;

        var isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email: email } })
          .then((user, err) => {
            // console.log(user);
            // if (!user) {
            //   // console.log(done(null, false, { message: "Email does not exist" }));
            //   // return { msg: "test" };
            //   // return done(err);
            //   // return done(null, false, { message: "Email does not exist" });
            // }

            // if (!isValidPassword(user.password, password)) {
            //   return done(null, false, { message: "Incorrect password." });
            // }

            console.log(!user);
            console.log(!isValidPassword(user.password, password));

            if (!user || !isValidPassword(user.password, password)) {
              return done(err);
            } else {
              var userinfo = user.get();

              return done(null, userinfo);
            }
          })
          .catch((err) => {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin",
            });
          });
      }
    )
  );
};
