'use strict';
module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING,
        },

        lastName: {
            type: DataTypes.STRING,
        },

        image: {
            type: DataTypes.BLOB,
        },

        pdf: {
            type: DataTypes.BLOB,
        },

    }, {
        tableName: 'users',
        timestamps: true,
    });

    Users.associate = models => {
    };

    Users.addScopes = models => {
    };

    return Users;
};
