/* Example
    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../config/connection');

    class Category extends Model {
    // maybe include a static create data method to clean up api routes?
    }

    Category.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        category_name: {
        type: DataTypes.STRING,
        allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category',
    }
    );

    module.exports = Category;

*/
