const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const models = require('./models');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at${PORT}`));
});

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/views/collection.handlebars'))
);

// GET request for cards
app.get('/api/Card', async (req, res) => {
  console.info(`GET /api/Card`);
  res.status(200).json(cards);
  try{
    const dbCardData = await Card.findAll({
        
    });
    const cards = dbCardData.map((e) => 
        e.get({plain: true})
        
    );
    res.render('card-list', {
        cards,
       // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// GET a single card
app.get('/api/Card/:Card_name', (req, res) => {
  if (req.params.Card_name) {
    console.info(`${req.method} request received to get a Card`);
    const cardName = req.params.card_name;
    for (let i = 0; i < cards.length; i++) {
      const currentCard = cards[i];
      if (currentCard.Card_name === cardName) {
        res.json(currentCard);
        return;
      }
    }
    res.status(404).send('Card not found');
  } else {
    res.status(400).send('Card name not provided');
  }
});

