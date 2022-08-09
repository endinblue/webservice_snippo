const mongoose = require('mongoose');

//subdocument..
const NewSubComment = mongoose.Schema({
    author:{
        id: { type: String},
        username: {type: String}
    },
    text:{
        type: String
    },
    createdAt: {
        type: Date
    }
});

const NewCommentSchema = mongoose.Schema({
    author:{
        id :{type:String, required: true},
        username :{type:String, required: true},
    },
    text:{
        type: String,
        required: true
    },
    subComments:[
        NewSubComment
    ],
    post:{
        id :{type:String, required: true},
        postType: {type:String},
        title: {type:String}
    },
    createdAt:{
        type: Date,
        required : false
    }
});
const Comment = module.exports = mongoose.model('Comment', NewCommentSchema);


module.exports.addComment = function(newComment, callback) {
    newComment.createdAt = new Date();
    newComment.save(callback);
}

//Delete whole comment doc by _id
module.exports.deleteComment = function(commentId, callback){   
    Comment.findByIdAndRemove(commentId, callback)
}


module.exports.getCommentsByPostId = function(postId, callback) {
    Comment.find({"parent_id": postId}).sort({createdAt: -1}).exec(callback);
}

module.exports.addSubComment = function(parentComment, subComment, callback) {
    Comment.findByIdAndUpdate(parentComment, {$push:{subComments: subComment}}, callback);
}

module.exports.getCommentsByUser = function(userId, callback) {
    //Comment.find({$or: [{"author.id": userId}, {$eleMatch: {"subComment.author.id": userId} }]}).sort({createdAt: -1}).exec(callback);
    //Comment.find({"author.id": userId},{text:1,parent_id:1,createdAt:1}).sort({createdAt: -1}).exec(callback);
    Comment.find({"author.id": userId}).sort({createdAt: -1}).exec(callback);
}

/***Reference**
Official Doc : https://docs.mongodb.com/ecosystem/use-cases/storing-comments/

Subdocumnet
*/
