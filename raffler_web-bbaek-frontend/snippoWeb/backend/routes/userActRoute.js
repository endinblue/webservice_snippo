const express = require('express');
const router = express.Router();

const newsModel = require('../models/NewsModel');
const userModel = require('../models/userModel');
const passport = require('passport');
const raffleModel = require('../models/raffleModel');
const commentModel = require('../models/commentModel.js');
const communityModel = require('../models/communityModel');
const alarmModel = require('../models/alarmModel');


router.post('/addNewsLike', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    
    newsModel.addLikeByPost(req.body.newsId, req.user.email, (err, data) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Fail to add' });
        }
        else {
            userModel.addLikeByUser(req.user.email, req.body.newsId, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: 'Fail to add' });
                }
                else
                    res.json({ success: true, msg: 'updated' });
            })
        }
    });
});

router.post('/deleteNewsLike', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsModel.deleteLikeByPost(req.body.newsId, req.user.email, (err, data) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Fail to add' });
        }
        else {
            userModel.deleteLikeByUser(req.user.email, req.body.newsId, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: 'Fail to add' });
                }
                else
                    res.json({ success: true, msg: 'updated' });
            })
        }
    });
});

router.post('/addRaffleDone', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    userModel.addRaffleDone(req.user.email, req.body.raffleId, (err, data) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Fail to add RaffleDone' });
        }
        else {
            raffleModel.addRaffleDone(req.body.raffleId, req.user.email, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: 'Fail to add RaffleDone' });
                }
                else { res.json({ success: true, msg: 'raffleDone updated' }); }
            });
        }
    });
});



router.post('/addComment', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    const getTitleFromPost = req.body.postType === "raffle" ?
        raffleModel : communityModel;


    getTitleFromPost.getTitle(req.body.post_id, (err, data) => {
        let newComment = new commentModel({
            author: {
                id: req.user._id,
                username: req.user.username
            },
            text: req.body.text,
            post: {
                id: req.body.post_id,
                title: data,
                postType: req.body.postType
            }
        });

        commentModel.addComment(newComment, (err, data) => {
            if (err) {
                console.log(err);
                res.json({ success: false, msg: 'fail to add comment' });
            } else {
                res.json({ success: true, msg: 'comment updated' });
            }
        });
    });
});

router.post('/deleteComment', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    commentModel.deleteComment(req.body.commentId, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'fail to add comment' });
        } else {
            res.json({ success: true, msg: 'comment deleted' });
        }
    });
});

router.get('/getCommentsByPostId', (req, res, next) => {
    commentModel.getCommentsByPostId(req.query.postId, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'fail to get comments' });
        } else {
            res.json({ success: true, msg: data });
        }
    });
});

router.get('/getCommentsByUser', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    commentModel.getCommentsByUser(req.user._id, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'fail to get comments' });
        } else {
            res.json({ success: true, msg: data });
        }
    });
});


router.post('/addSubComment', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let subComment =
    {
        author: { id: req.user._id, username: req.user.username },
        text: req.body.text,
        createdAt: new Date(),

    }
    commentModel.addSubComment(req.body.parentComment, subComment, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'fail to add subcomments' });
        } else {
            res.json({ success: true, msg: 'subcomment added' });
        }
    })
});

// router.post('/testt', (req, res, next) => {
//     const getTitleFromPost = req.body.postType === "raffle" ?
//         raffleModel : communityModel;


//     getTitleFromPost.getTitle(req.body.post_id, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.json({ success: false, msg: 'fail to add subcomments' });
//         } else {
//             res.json({ success: true, msg: data });
//         }
//     });
// });

router.post('/addAlarm', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let author=   { id: req.user._id, username: req.user.username }
    alarmModel.addUser(req.body.postId, author, (err, data)=>{
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'fail to add alarm' });
        } else {
            res.json({ success: true, msg: 'alarm added' });
        }
    })
})


router.post('/deleteAlarm', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    alarmModel.deleteUser(req.body.postId, req.user._id, (err, data)=>{
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'fail to delete alarm' });
        } else {
            res.json({ success: true, msg: 'alarm deleted' });
        }
    });
});
router.get('/isUserSubscByPost', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    alarmModel.isUserSubscByPost(req.user._id, req.query.raffleId, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: 'fail' });
      }
      else if (data) {
        res.json({ success: true, msg: true });
      }
      else if (data==null) {
        res.json({ success: true, msg: false });
      }
    });
  });

module.exports = router;