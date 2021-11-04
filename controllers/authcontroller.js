const { Card, User, Collection } = require("../models");
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

  app.get("/collection", isLoggedIn, async (req, res) => {
    try {
      // console.log(req.user.id);
      console.log("hello, world");
      // Get all projects and JOIN with user data
      const collectionData = await Collection.findAll({
        where: {
          user_id: req.user.id,
        },
        // include: [
        //   {
        //     model: Card,
        //     // as: 'card_owner',
        //     attributes: ["imageUrl"],
        //   },
        // ],
      });
      console.log(collectionData);
      // Serialize data so the template can read it
      const cards = collectionData.map((card) => card.get({ plain: true }));
      console.log(cards);
      req.session.save(() => {
        req.session.loggedUser = req.user;
      });
      // Pass serialized data and session flag into template
      res.render("collection", {
        cards,
        user: req.session.loggedUser,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
    //   console.log(req.user);

    //   req.session.save(() => {
    //     req.session.loggedUser = req.user;
    //   });
    //   res.render("collection", {
    //     user: req.session.loggedUser,
    //   });
    // });

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
  app.get("/card-list", async (req, res) => {
    try {
      // console.log(req.session.loggedUser.id)
      const dbCardData = await Card.findAll();
      // console.log(dbCardData)
      const cards = dbCardData.map((e) => e.get({ plain: true }));

      res.render("card-list", {
        cards,
        // loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  app.post("/card-list", async (req, res) => {
    try {
      console.log(req.session.loggedUser.id);
      console.log(req.body.url);

      const checkCardData = await Collection.findOne({
        where: {
          card_id: parseInt(req.body.id),
          user_id: req.session.loggedUser.id,
        },
      });
      // console.log(checkCardData.dataValues);
      if (!checkCardData) {
        console.log("no data");
        const dbCardData = await Collection.create(
          {
            card_id: parseInt(req.body.id),
            quantity: 1,
            user_id: req.session.loggedUser.id,
            imageUrl: req.body.url,
            cardId: parseInt(req.body.id),
            userId: req.session.loggedUser.id,
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
        // console.log('update data',checkCardData.dataValues);
        const dbCardData = await Collection.update(
          {
            quantity: checkCardData.dataValues.quantity + 1,
          },
          {
            where: {
              card_id: parseInt(req.body.id),
              user_id: req.session.loggedUser.id,
            },
          }
        );
      }
      // const dbCardData = await Collection.create({
      //     card_id: parseInt(req.body.id),
      //     quantity: 1,
      //     user_id: 1
      // // });
      // } ,{fields:['card_id', 'quantity', 'user_id']});
      res.status(200).json("Card added to collection");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
