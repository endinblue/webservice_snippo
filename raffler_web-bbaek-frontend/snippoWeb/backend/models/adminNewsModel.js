const mongoose = require('mongoose');

const AdminNewsSchema = mongoose.Schema({
    link:{
        type : String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type : String,
        required : true
    },
    created:{ 
        type : Date, 
        required : false
    }
});

const AdminNews = module.exports = mongoose.model('item', AdminNewsSchema);

module.exports.selectDataAll = function(callback) {
    AdminNews.find({}, callback);
}
module.exports.getNewsById = function(_id, callback){
    AdminNews.findById(_id, callback);
}