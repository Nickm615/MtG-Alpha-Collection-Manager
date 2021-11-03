module.exports = (app, passport) => {
    // console.log(passport);
    app.get("/", (req, res) => {
      res.render("index");
    });
  
    app.get("/signup", (req, res) => {
      res.render("signup");
    });
  
    app.get("/signin", (req, res) => {
      res.render("signin");
    });
  
    app.post(
      "/signup",
      passport.authenticate("local-signup", {
        successRedirect: "/collection",
        failureRedirect: "/index",

      })
    );
  
    app.get("/collection", isLoggedIn, (req, res) => {
      console.log(req.user)
      req.session.save(() => {
        req.session.loggedUser = req.user});
      res.render("collection", {
        user:req.session.loggedUser
      });
   
    });
  
    app.get("/logout", (req, res) => {
      req.session.destroy((err) => {
        res.redirect("/");
      });
    });
  
    app.post(
      "/signin",
      passport.authenticate("local-signin", {
        successRedirect: "/collection",
        failureRedirect: "/",
      })
    );
  
    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) return next();
  
      res.redirect("/signin");
    }
  };