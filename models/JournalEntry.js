const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class JournalEntry extends Model {}

// create fields/columns for JournalEntry model
JournalEntry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_grateful_input: {
            type: DataTypes.STRING,
            allowNull: false
        },
        second_grateful_input: {
            type: DataTypes.STRING,
            allowNull: true
        },
        third_grateful_input: {
            type: DataTypes.STRING,
            allowNull: true
        },
        freewrite_input: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        mood_input: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        reg_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            // unique: true
            // ,
            // get: function() {
            //     return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
            // }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'journalentry',
        timestamps: false
    }
);

module.exports = JournalEntry;
