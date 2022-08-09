const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const CommunityModel = require('../models/communityModel');
const TagModel = require('../models/tagModel');
const passport = require('passport');
const upload = require('../util/s3Upload');



router.post('/addPost',  (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    } else {
      var image_url_arr = [];
      for(i=0; i<req.files.length; i++){
        image_url_arr.push(req.files[i].key);
      }
      
      let newPost = {
        title: req.body.title,
        content: req.body.content,
        image_urls: image_url_arr,
        brand: req.body.brand,
        username: req.body.username
      };
      CommunityModel.addPost(newPost, (err) => {
        if (err) {
          console.log(err)
          res.json({ success: false, msg: 'Failed to add post' });
        }
        else {
    
            res.json({ success: true, msg: 'post updated' });
        }
      });
    }
  });
});


router.get('/selectDataAll', (req, res, next) => {
  CommunityModel.selectDataAll((err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      res.json({ success: true, data: data });
    }
  });
});

router.get('/getRecentRelease', (req, res, next) => {
  CommunityModel.getRecentRelease((err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      res.json({ success: true, data: data });
    }
  });
});


router.get('/getDetailById', (req, res, next) => {
  CommunityModel.getPostById(req.headers._id, (err, data) => {
    console.log(req.headers._id);
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else
      res.json({ success: true, data: data });
  });
});

router.post('/updatePost', (req, res, next) => {
  let post = new postModel({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    image_urls: req.body.image_urls,
    brand: req.body.brand,
  });

  CommunityModel.updatePost(post, (err, user) => {
    if (err)
      res.json({ success: false, msg: 'Failed to update post' });
    else {
        res.json({ success: true, msg: 'post updated' });
    }
  });
});

router.post('/deletePost', (req, res, next) => {
  CommunityModel.deleteById(req.body._id, (err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else
      res.json({ success: true, msg: 'post deleted' });
  });
});






















/*********************************************************************************** */
router.get('/isLikedByUserEmail', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  CommunityModel.isLikedByUserEmail(req.user.email, req.query.mostId, (err, data) => {

    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'fail' });
    }
    else if (data) {
      res.json({ success: true, msg: true });
    }
    else if (!data) {
      res.json({ success: true, msg: false });
    }

  });
});


module.exports = router;