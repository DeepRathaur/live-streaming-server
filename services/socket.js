const UserController 	        = require('../controllers/user.controller');
const ChatRoomController 	        = require('../controllers/chatroom.controller');
const { User } 	        = require('../utills/users');
const moment = require('moment');

let users   =   new User();


const generateMessage = function(from, text){
    return {
        from,
        text,
        createdAt : moment().valueOf()
    };
};

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('user is connected');
        socket.emit('newMessage',generateMessage('Admin',`User is connected`) );
        socket.emit('newMessage',generateMessage('Base URL',`http://lsa.ckmeout.com:50008`) );
        let data = UserController.getActiveUsers();
        data.then(function(result) {
            socket.emit('activeUsers',result);
        });
        //console.log(data);
        //socket.emit('activeUsers',result);
        //socket.emit('activeRooms',UserController.getActiveRooms());
        socket.on('join', ( params, callback ) => {
            console.log(params);
            socket.emit('newMessage',generateMessage('Admin',`Welcome to the Live streaming  App`) );
            let socketid = socket.id;
            params.room = params.room.toLowerCase();
            socket.emit('updateUserStatus',UserController.updateStatus({userid:params.id,online_status:true}));
            socket.emit('createRoom',ChatRoomController.create({user_id:params.id,socket_id:socketid,room_name:params.room,user_display_name:params.name}));
            let data = UserController.getActiveUsers();
            data.then(function(result) {
                socket.emit('activeUsers',result);
            });
            socket.join(params.room);
            io.to(params.room).emit('some event');
            //callback();
        });

        socket.on('createMessages', ( params, callback ) => {
            //socket.emit('newMessage',generateMessage('Admin',params.message) );
            let socketid = socket.id;
            let username = '';
            data = ChatRoomController.getName(socketid);
            data.then(function(result) {
                 username = result;
                 console.log(username +' sent a message ==> ' + params.message);
                 io.sockets.emit('newMessage',generateMessage(username,params.message) );
            });

        });

        socket.on('onPlayUser', ( params, callback ) => {
            //socket.emit('newMessage',generateMessage('Admin',params.message) );
            let socketid = socket.id;
            let username = '';
            let message = ' Press Play Button';
            data = ChatRoomController.getName(socketid);
            data.then(function(result) {
                username = result;
                console.log(username +' sent a message ==> ' + message);
                io.sockets.emit('newMessage',generateMessage(username,message) );
            });

        });

        socket.on('onPlayGo', ( params, callback ) => {
            //socket.emit('newMessage',generateMessage('Admin',params.message) );
            let socketid = socket.id;
            let username = '';
            let message = ' Press Play GO Button';
            data = ChatRoomController.getName(socketid);
            data.then(function(result) {
                username = result;
                console.log(username +' sent a message ==> ' + message);
                io.sockets.emit('newMessage',generateMessage(username,message) );
            });

        });


        socket.on('onStandUpUser', ( params, callback ) => {
            //socket.emit('newMessage',generateMessage('Admin',params.message) );
            let socketid = socket.id;
            let username = '';
            let message = ' Press Stand Up Button';
            data = ChatRoomController.getName(socketid);
            data.then(function(result) {
                username = result;
                console.log(username +' sent a message ==> ' + message);
                io.sockets.emit('newMessage',generateMessage(username,message) );
            });

        });

        socket.on('onWinUser', ( params, callback ) => {
            //socket.emit('newMessage',generateMessage('Admin',params.message) );
            let socketid = socket.id;
            let username = '';
            let message = ' Press Win Button';
            data = ChatRoomController.getName(socketid);
            data.then(function(result) {
                username = result;
                console.log(username +' sent a message ==> ' + message);
                io.sockets.emit('newMessage',generateMessage(username,message) );
            });

        });

        socket.on('onBidUser', ( params, callback ) => {
            //socket.emit('newMessage',generateMessage('Admin',params.message) );
            let socketid = socket.id;
            let username = '';
            let message = ' Press BID Button';
            data = ChatRoomController.getName(socketid);
            data.then(function(result) {
                username = result;
                console.log(username +' sent a message ==> ' + message);
                io.sockets.emit('newMessage',generateMessage(username,message) );
            });

        });



        socket.leave('room');

        socket.on('disconnect', () => {
            let id = socket.id;
            console.log('user is disconnected');
            socket.emit('chnageOnlineSatatus',UserController.remove(id));
            socket.emit('removeUsers',ChatRoomController.remove(id));
        });
    });
};