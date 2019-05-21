'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const PARAMS            = require('../config/globalparam');


module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        role_id: {
            type: DataTypes.INTEGER,
            defaultValue: PARAMS.userRoles.user,
            allowNull:false
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: "",
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: ""
        },
        gender: {
            type: DataTypes.STRING(32),
            allowNull: false,
            comment: "",
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "",
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {isEmail: {msg: "Email is invalid."}}
        },
        mobile: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            validate: {
                len: {args: [7, 20], msg: "Mobile number invalid, too short."},
                isNumeric: {msg: "not a valid phone number."}
            }
        },
        password: {type: DataTypes.STRING, allowNull: false},
        logdate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Login time",
        },
        lognum: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Total Login time",
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            comment: "0 for disable and 1 is active",
        },
        online_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            comment: "0 for offline and 1 is online and 2 is away",
        },
        user_type: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: 'free',
            comment: "Free for disable and Premium is active",
        },
        extra: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Extra information of user",
        },
        rp_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "reset password token",
        },
        rp_token_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "reset password token created",
        }
    }, {comment : "User Table"});
    User.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Role,  {foreignKey: 'role_id',   sourceKey: 'id'});
        this.belongsTo(models.State,{foreignKey: 'state_id', sourceKey: 'id'});
        this.belongsTo(models.City,{foreignKey: 'city_id', sourceKey: 'id'});
        //this.hasMany(models.chat_room,{foreignKey: 'user_id', targetKey: 'id'});
    };

    User.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    User.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    };

    User.prototype.getJWT = function () {
        let expiration_time = parseInt(PARAMS.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, PARAMS.jwt_encryption, {expiresIn: expiration_time});
    };

    User.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return User;
};