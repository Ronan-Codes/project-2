const router = require('express').Router();

const userRoutes = require('./user-routes');
const journalEntryRoutes = require('./journal-entry-routes');

router.use('/users', userRoutes);
router.use('/journalentries', journalEntryRoutes);

module.exports = router;
