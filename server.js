const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

console.log('✅ Required all modules');

const routes = require('./controllers');
console.log('✅ Imported routes');

const sequelize = require('./config/connection');
console.log('✅ Connected to Sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('✅ Express app initialized');

const sess = {
  secret: 'super secret session',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));
console.log(' Session middleware configured');

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
console.log(' Handlebars engine set up');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log(' Middleware applied');

app.use(routes);
console.log(' Routes loaded');

sequelize.sync({ force: false }).then(() => {
  console.log(' Sequelize synced');
  app.listen(PORT, () => {
    console.log(` App running at http://localhost:${PORT}`);
  });
});
