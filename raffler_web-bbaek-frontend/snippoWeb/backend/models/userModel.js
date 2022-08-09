const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    email:{
        type : String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type : String,
        required : true
    },
    created : { 
        type : Date, 
        default : new Date 
    },
    isAdmin:{
        type:Boolean,
        required : false
    },
    pushtoken:{
        type: String,
        default:" "
    },
    newsLikes : [{newsId: String}],
    raffleDone : [{raffleId:String}],
    commPosts :[{postId:String}],
    commLikes : [{postId: String}],
    alarm : [{raffleID:String}]
});

const User = module.exports = mongoose.model('user', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
}

module.exports.checkByEmail = function(email, callback){
    const query = {email: email}
    User.findOne(query, callback);
}   

module.exports.checkByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, callback);
  }

  module.exports.selectDataAll = function(callback) {
    User.find(callback);
}

module.exports.addLikeByUser = function(email, newsId, callback){
User.findOneAndUpdate({email:email},{$push: {newsLikes:{newsId:newsId}}}, callback);
}

module.exports.deleteLikeByUser = function(email, newsId, callback){
    User.findOneAndUpdate({email:email}, { "$pull": { "newsLikes": { "newsId": newsId } }}, { safe: true, multi:true }, callback);
 }

module.exports.addRaffleDone = function(email, raffleId, callback){
    User.findOneAndUpdate({email:email},{$push: {raffleDone:{raffleId:raffleId}}}, callback);
}

module.exports.addAlarm = function(email, raffleId, callback){
    User.findOneAndUpdate({email:email},{$push: {alarm:{raffleId:raffleId}}}, callback);
}

module.exports.generateToken = function(user){
    const token = jwt.sign({ data: user }, config.secret, {expiresIn: '300h',});
    return token;
}
module.exports.deleteUser = function(email,callback){
    User.deleteOne({email:email},callback);
}
module.exports.addPushToken = function(pushtoken, username, callback){
    User.findOneAndUpdate({username : username},{$set:{pushtoken : pushtoken}},callback,function(err,doc){
        if(err){
            console.log("fuckyou man")
        }
    });
}