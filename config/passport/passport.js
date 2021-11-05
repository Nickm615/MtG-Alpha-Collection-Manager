const bCrypt = require("bcrypt");

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });


  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
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
        User.findOne({ where: { email: email } }).then((user) => {
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
