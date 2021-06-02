// Import models

const User = require('./User');
const JournalEntry = require('./JournalEntry');

// Model Associations
User.hasMany(JournalEntry, {
    foreignKey: 'user_id'
});

JournalEntry.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'SET NULL'?
})

module.exports = {
    User,
    JournalEntry
};
