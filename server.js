const express = require('express');
const routes = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Express-session, etc. (review, delete comment before pushing to main)
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// Handlebars (review, delete comment before pushing to main)
// Tell handlebars.js about the helpers file
const helpers = require('./utils/helpers');
// continue
const exphbs = require('express-handlebars');
// pass helpers to existing exphbs.create
const hbs = exphbs.create({
    helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

// Use path to utilize public files (style.css). `app.use(express.static(path.join(__dirname, 'public')));`
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// turn on routes
app.use(routes);

// for public files
app.use(express.static(path.join(__dirname, 'public')));
// app.use statements END

// sync sequelize models to the database, then turn on the server
sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})
