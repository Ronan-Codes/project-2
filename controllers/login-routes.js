const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, JournalEntry } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard/home');
        return;
      }

    res.render('login')
})

module.exports = router;
