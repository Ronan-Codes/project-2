const router = require('express').Router();
const {
    JournalEntry,
    User
} = require('../../models');
const withAuth = require('../../utils/auth');

// get all journal entries
router.get('/', (req, res) => {
    JournalEntry.findAll({
            attributes: [
                'id', 'first_grateful_input', 'second_grateful_input', 'third_grateful_input', 'freewrite_input', 'mood_input', 'user_id', 'reg_date'
            ],
            // display data in descending order based on `reg_date`
            order: [
                ['reg_date', 'DESC']
            ],
            include: [{
                model: User,
            }]
        })
        .then(dbJournalEntryData => res.json(dbJournalEntryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:user_id/:reg_date', (req, res) => {
    JournalEntry.findOne({
            where: {
                reg_date: req.params.reg_date,
                user_id: req.params.user_id
            },
            include: [{
                model: User,
            }]
        })
        .then(dbJournalEntryData => {
            if (!dbJournalEntryData) {
                res.status(404).json({
                    message: 'No journal entry found with this id'
                });
                return;
            }
            res.json(dbJournalEntryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/', withAuth, (req, res) => {
    JournalEntry.create({
            first_grateful_input: req.body.first_grateful_input,
            second_grateful_input: req.body.second_grateful_input,
            third_grateful_input: req.body.third_grateful_input,
            freewrite_input: req.body.freewrite_input,
            mood_input: req.body.mood_input,
            user_id: req.session.user_id,
            reg_date: req.body.reg_date
        })
        .then(dbJournalEntryData => res.json(dbJournalEntryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:user_id/:reg_date', withAuth, (req, res) => {
    JournalEntry.update(req.body, {
            where: {
                reg_date: req.params.reg_date,
                user_id: req.session.user_id
            }
        })
        .then(dbJournalEntryData => {
            if (!dbJournalEntryData) {
                res.status(404).json({
                    message: 'No journal entry found with this id'
                });
                return;
            }
            res.json(dbJournalEntryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:user_id/:reg_date', withAuth, (req, res) => {
    JournalEntry.destroy({
            where: {
                reg_date: req.params.reg_date,
                user_id: req.session.user_id
            }
        })
        .then(dbJournalEntryData => {
            if (!dbJournalEntryData) {
                res.status(404).json({
                    message: `No journal entry found with this id`
                });
                return;
            }
            res.json(dbJournalEntryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
