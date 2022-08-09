const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username:{
        type : String,
        default: false
    },
    title: {
        type : String,
        required : true
    },
    content : { 
        type : String, 
        required : true
    },
    createdAt: { 
        type : Date, 
        required : false
        
    },
    updatedAt: { 
        type : Date, 
        required : false
        
    },
    image_urls:[],
    likes : [],
    brand:[],
    views : {
        type: Number,
        required :  false,
        default : 0
    }
});

const Post = module.exports = mongoose.model('post', postSchema);

 // Six Data sorted by release date (desc)
module.exports.getRecentRelease = function(callback){
     Post.find({}).sort({releaseDate: -1}).limit(10).exec(callback)
 }

module.exports.addPost = function(post, callback) {
        post.createdAt = new Date();
        post.updatedAt = new Date();
        post.create(post, callback);
}

module.exports.updatePost = function(post, callback) {
    post.updatedAt = new Date();
    post.findByIdAndUpdate(post._id, post, callback);
}

module.exports.getPostById = function(id, callback){
    post.findById(id, callback);
}

module.exports.getPostByReleaseDate = function(releaseDate, callback){
    post.find({releaseDate:releaseDate},callback);
}

module.exports.selectDataAll = function(callback) {
    post.find({}).sort({createdAt: -1}).exec(callback)
}

module.exports.deleteById = function(id, callback){
    post.findByIdAndRemove(id, callback)
}

module.exports.getTitle= function(id , callback){
    Post.findById(id, {title:1}, callback)
}





/*****************************************************************************************88 */
module.exports.addLikeByPost = function(Id, userEmail, callback){
    post.findByIdAndUpdate(Id,{$push: {likes: {userEmail:userEmail}}}, callback);
}

module.exports.isLikedByUserEmail = function(userEmail, Id,  callback){
  post.findById(id)
  .where('likes').in({'userEmail':userEmail})
  .select('likes')
  .exec(callback);
 }