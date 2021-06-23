const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, JournalEntry } = require('../models');
const withAuth = require('../utils/auth')

router.get('/home', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
      }

    JournalEntry.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.user_id
            },
            attributes: [
                'id', 'first_grateful_input', 'second_grateful_input', 'third_grateful_input', 'freewrite_input', 'mood_input', 'created_at', 'user_id'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: User,
            }]
        })
        .then(dbJournalEntryData => {
            // serialize data before passing to template
            const journalEntries = dbJournalEntryData.map(journalEntry => journalEntry.get({
                plain: true
            }));
            res.render('dashboard', {
                journalEntries,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/journalentry/:id', withAuth, (req, res) => {
    JournalEntry.findOne({
        where: {
            // use the ID from the session
            id: req.params.id
        },
        attributes: [
            'id', 'first_grateful_input', 'second_grateful_input', 'third_grateful_input', 'freewrite_input', 'mood_input', 'created_at', 'user_id'
        ],
        include: [{
            model: User,
        }]
    })
    .then(dbJournalEntryData => {
        if (!dbJournalEntryData) {
          res.status(404).json({ message: 'No journal entry found with this id' });
          return;
        }

        // serialize data
        const journalEntry = dbJournalEntryData.get({ plain: true });

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

router.get('/newjournalentry', (req, res) => {
    res.render('newjournalentry', {
        loggedIn: req.session.loggedIn
    })
})

module.exports = router;
