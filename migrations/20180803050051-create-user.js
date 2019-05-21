'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER,
                defaultValue: PARAMS.userRoles.user,
                allowNull:false
            },
            state_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            city_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false,
                comment: "",
            },
            dob: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                comment: "",
            },
            gender: {
                type: Sequelize.STRING(32),
                allowNull: false,
                comment: "",
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
                comment: "",
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
                validate: {isEmail: {msg: "Email is invalid."}}
            },
            mobile: {
                type: Sequelize.BIGINT,
                allowNull: false,
                unique: true,
                validate: {
                    len: {args: [7, 20], msg: "Mobile number invalid, too short."},
                    isNumeric: {msg: "not a valid phone number."}
                }
            },
            password: {type: Sequelize.STRING, allowNull: false},
            logdate: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Login time",
            },
            lognum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "Total Login time",
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: 0,
                comment: "0 for disable and 1 is active",
            },
            online_status: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: 0,
                comment: "0 for offline and 1 is online and 2 is away",
            },
            user_type: {
                type: Sequelize.STRING(200),
                allowNull: true,
                defaultValue: 'free',
                comment: "Free for disable and Premium is active",
            },
            extra: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Extra information of user",
            },
            rp_token: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "reset password token",
            },
            rp_token_created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "reset password token created",
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
        return queryInterface.dropTable('Users');
    }
};