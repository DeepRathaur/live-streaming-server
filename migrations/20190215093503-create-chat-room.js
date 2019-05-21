'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('chat_rooms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            socket_id: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            room_name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            user_display_name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            room_created_by: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('chat_rooms');
    }
};