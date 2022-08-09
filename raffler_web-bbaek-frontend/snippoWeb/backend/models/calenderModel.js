const mongoose = require('mongoose');

const SuggetionBrandSchema = mongoose.Schema({
    brand:{
        type : String,
        required :true
    }
});



const postSchema = mongoose.Schema({
    hide:{
        type : Boolean,
        default: false
    },
    username:{
        type : String,
        default: false
    },
    model:{
        type : String,
        required: false
    },
    releaseDate: {
        type: Date,
        required: false
    },
    title: {
        type : String,
        required : true
    },
    content : { 
        type : String, 
        required : true
    },

    source: { 
        type : String, 
        required : false
    } ,

    createdAt: { 
        type : Date, 
        required : false
        
    },
    updatedAt: { 
        type : Date, 
        required : false
        
    },
    price:{
        type: String,
        required : false
    },
    subtitle:{
        type: String,
        required : false
    },

    link:{
        type: String,
        required: false
    },
 
    image_urls:[],
    likes : [],
    brand:[],
    views : {
        type: Number,
        required :  false
    }

});


const post = module.exports = mongoose.model('post', postSchema);
const SuggestionBrand = module.exports = mongoose.model('suggestionBrand', SuggetionBrandSchema);


module.exports.getSuggetionList = function(callback){
    SuggestionBrand.find({}, callback);
 }

 // Six Data sorted by release date (desc)
 module.exports.getRecentRelease = function(callback){
     post.find({}).sort({releaseDate: -1}).limit(6).exec(callback)
 }



module.exports.addpost = function(post, callback) {
        post.createdAt = new Date();
        post.updatedAt = new Date();
        post.create(post, callback);
}


module.exports.updatepost = function(post, callback) {
    post.updatedAt = new Date();
    post.findByIdAndUpdate(post._id,post,callback);
}

module.exports.getpostById = function(id, callback){
    post.findById(id, callback);
}

module.exports.getpostByReleaseDate = function(releaseDate, callback){
    post.find({releaseDate:releaseDate},callback);
}

//find by month

module.exports.selectDataAll = function(callback) {
    
    post.find({}).sort({createdAt: -1}).exec(callback)
}

//find and update
module.exports.changeHide = function(hide, callback){
    hide.save(callback)
}


module.exports.deleteById = function(id, callback){
    post.findByIdAndRemove(id, callback)
}

module.exports.addLikeByPost = function(Id, userEmail, callback){
    post.findByIdAndUpdate(Id,{$push: {likes: {userEmail:userEmail}}}, callback);
 }

module.exports.isLikedByUserEmail = function(userEmail, Id,  callback){
  post.findById(id)
  .where('likes').in({'userEmail':userEmail})
  .select('likes')
  .exec(callback);
 }