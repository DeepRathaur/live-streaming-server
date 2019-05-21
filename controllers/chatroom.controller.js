const { chat_room } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    let err, user;
    [err, user] = await to(chat_room.create(req));
    if (err) return err ;
    return {message: 'Successfully created new user.'} ;
};
module.exports.create = create;

const remove = async function (req, res) {
    let user, err;
    let id = req;
    [err, user] = await to(chat_room.destroy({
        where: { socket_id: id }
    }));
    if (err) return {message:"error occured trying to delete user"};
    return { message: 'Deleted User' };
};
module.exports.remove = remove;

const getActiveRooms = async function (req, res) {
    let err, chatroom;
    [err, users] = await to(chat_room.findAll({
        distinct: 'room_name'
    }));

    if(err) return {message:"Some problem occured"} ;

    let chatroom_json = []

    for (let i in chatroom) {
        let details = chatroom[i];
        let info = details.toWeb();
        chatroom_json.push(info);
    }
    return chatroom_json;
}
module.exports.getActiveRooms = getActiveRooms;

const getName = async function (req, res) {
    let err, user;
    [err, user] = await to(chat_room.findOne({
        attributes:['user_display_name'],
        where: {
            socket_id: req,
        }
    }));

    if (err) return err ;
    return user.user_display_name ;
};
module.exports.getName = getName;


