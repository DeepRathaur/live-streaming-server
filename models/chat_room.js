'use strict';
module.exports = (sequelize, DataTypes) => {
    const chat_room = sequelize.define('chat_room', {
        socket_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        room_name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        user_display_name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        room_created_by: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
    }, {});
    chat_room.associate = function (models) {
        // associations can be defined here
        // this.belongsTo(models.User,{foreignKey: 'user_id', sourceKey: 'id'});
    };
    chat_room.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return chat_room;
};