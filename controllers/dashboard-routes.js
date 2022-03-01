const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    JournalEntry
} = require('../models');
const withAuth = require('../utils/auth')

router.get('/home', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    User.findOne({
            where: {
                // use the ID from the session
                id: req.session.user_id
            },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: JournalEntry,
            }]
        })
        .then(dbUserData => {
            // serialize data before passing/access to template(dashboard.handlebars)
            const userData = dbUserData.get({
                plain: true
            });
            res.render('dashboard', {
                userData,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/journalentry/:id/:date', withAuth, (req, res) => {
    JournalEntry.findOne({
            where: {
                // use the ID from the session
                user_id: req.params.id,
                reg_date: req.params.date
            },
            include: [{
                model: User,
            }]
        })
        .then(dbJournalEntryData => {
            if (!dbJournalEntryData) {
                res.status(404).json({
                    message: 'No journal entry found with this date'
                });
                return;
            }

            // serialize data
            const journalEntry = dbJournalEntryData.get({
                plain: true
            });

            res.render('journalentry', {
                journalEntry,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/newjournalentry/:reg_date', withAuth, (req, res) => {
    res.render('newjournalentry', {
        loggedIn: req.session.loggedIn
    })
})

module.exports = router;
