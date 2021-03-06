const { Card, User, Collection } = require("../models");
module.exports = (app, passport) => {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log("failure");
      res
        .status(401)
        .json({ msg: "You are not authorized to view this resource" });
    }
  }

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
      successRedirect: "/signin",
      failureRedirect: "/",
    })
  );
  app.get("/collection", isLoggedIn, async (req, res) => {
    try {
      const collectionData = await Collection.findAll({
        where: {
          user_id: parseInt(req.user.id),
        },
      });
      console.log(req.user.id);
      console.log(collectionData);
      const cards = collectionData.map((card) => card.get({ plain: true }));

      req.session.save(() => {
        req.session.loggedUser = req.session.passport.user;
        console.log("success");
      });
      console.log(req.session);
      console.log(req.session.passport.user);
      res.render("collection", {
        cards,
        user: req.session.passport.user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
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
  app.get("/card-list", isLoggedIn, async (req, res) => {
    try {
      const dbCardData = await Card.findAll();
      const cards = dbCardData.map((e) => e.get({ plain: true }));
      req.session.save(() => {
        req.session.loggedUser = req.user;
      });

      res.render("card-list", {
        cards,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  app.post("/card-list", isLoggedIn, async (req, res) => {
    try {
      console.log(req.user);
      console.log(req.body);
      console.log(req.user.id);
      console.log(req.body.id);

      const checkCardData = await Collection.findOne({
        where: {
          card_id: parseInt(req.body.id),
          user_id: req.user.id,
        },
      });
      if (!checkCardData) {
        console.log("no data");
        const dbCardData = await Collection.create(
          {
            card_id: parseInt(req.body.id),
            quantity: 1,
            user_id: req.user.id,
            imageUrl: req.body.url,
            cardId: parseInt(req.body.id),
            userId: req.user.id,
          },
          {
            fields: [
              "card_id",
              "quantity",
              "user_id",
              "imageUrl",
              "cardId",
              "userId",
            ],
          }
        );
      } else {
        const dbCardData = await Collection.update(
          {
            quantity: checkCardData.dataValues.quantity + 1,
          },
          {
            where: {
              card_id: parseInt(req.body.id),
              user_id: req.user.id,
            },
          }
        );
      }

      res.status(200).json("Card added to collection");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
}
