const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    value : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : false
    }, 

    raffletags : [],

    newstags : [],

    communitytags : []

});


module.exports.getTagList = function(type,callback){
    const TagModel = module.exports = mongoose.model(type,TagSchema);
   
    TagModel.find({}, callback);
}

module.exports.addTag = function(type, tag, callback){
   
   
    const TagModel = module.exports = mongoose.model(type,TagSchema);
    
    TagModel.create(tag, callback);
}

module.exports.deleteTag = function(type, value, callback){
    const TagModel = module.exports =  mongoose.model(type,TagSchema);
    TagModel.findOneAndDelete({value : value}, callback);
}

module.exports.findModelTag = function (modelname, callback) {
    const TagModel = module.exports =  mongoose.model("model",TagSchema);
    TagModel.find({ value : modelname }, callback);
}

module.exports.addModelTagImage = function(tagId, addedId, image, callback){
    const TagModel = module.exports =  mongoose.model("model",TagSchema);
    TagModel.findByIdAndUpdate(tagId,({$push: {"raffletags":addedId}},{image:image}),{safe: true, upsert: true, new : true},callback );

}

module.exports.insertTagedId = function(type, tagId, whichTag, addedId, callback){
    const TagModel = module.exports =  mongoose.model(type,TagSchema);
    if(whichTag == "raffle")
    TagModel.findByIdAndUpdate(tagId,{$push: {"raffletags":addedId}},callback );
    else if(whichTag=="news")
    TagModel.findByIdAndUpdate(tagId,{$push: {"newstags":addedId}},callback );
    else if(whichTag=="community")
    TagModel.findByIdAndUpdate(tagId,{$push: {"communitytags":addedId}},callback );
    else return err;

}