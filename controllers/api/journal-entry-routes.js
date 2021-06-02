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
                'id', 'first_grateful_input', 'second_grateful_input', 'third_grateful_input', 'freewrite_input', 'mood_input', 'created_at', 'user_id'
            ],
            // display data in descending order based on `created_at`
            order: [
                ['created_at', 'DESC']
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
// watch video at 13.3.6 to review process of include (JOIN)

router.get('/:id', (req, res) => {
    JournalEntry.findOne({
            where: {
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

router.post('/', withAuth, (req, res) => {
    JournalEntry.create({
            first_grateful_input: req.body.first_grateful_input,
            second_grateful_input: req.body.second_grateful_input,
            third_grateful_input: req.body.third_grateful_input,
            freewrite_input: req.body.freewrite_input,
            mood_input: req.body.mood_input,
            user_id: req.session.user_id
        })
        .then(dbJournalEntryData => res.json(dbJournalEntryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', withAuth, (req, res) => {
    JournalEntry.update(req.body, {
            where: {
                id: req.params.id
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

router.delete('/:id', withAuth, (req, res) => {
    JournalEntry.destroy({
            where: {
                id: req.params.id
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
