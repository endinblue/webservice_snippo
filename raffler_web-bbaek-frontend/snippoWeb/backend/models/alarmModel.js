
const mongoose = require('mongoose');

const AlarmSchema = mongoose.Schema({
    raffleId: String,
    userId:[{
        id: { type: String},
        username: {type: String}
    }],
    gubun : String // news= 뉴스정보 / community = 커뮤니티
});


const Alarms = module.exports = mongoose.model('alarm', AlarmSchema);



module.exports.createAlarmPost = function(alarmPost, callback){
    
    alarmPost.save(callback);
 }
    

 module.exports.addUser = function(raffleId, userId, callback){
    
    Alarms.findOneAndUpdate({raffleId:raffleId},{$push: {userId:userId}}, callback);
 }

 module.exports.deleteUser = function(raffleId, userId, callback){
    Alarms.update({ raffleId: raffleId }, { "$pull": { "userId": { "id": userId } }}, { safe: true, multi:true }, callback);
 }



 module.exports.isUserSubscByPost = function (userId, raffleId, callback) {
     console.log(userId)
    Alarms.findOne({"raffleId":raffleId, "userId.id":userId})
        .select('raffleId')
        .exec(callback);
}