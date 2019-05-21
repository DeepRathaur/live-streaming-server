'use strict';
module.exports = (sequelize, DataTypes) => {
    let State = sequelize.define('State', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        zone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
    }, {});
    State.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.City, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.User, {foreignKey: 'state_id', sourceKey: 'id'});

    };

    State.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return State;
};