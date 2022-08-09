const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const TagModel = require('../models/tagModel');
const NewsModel = require('../models/NewsModel');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const passport = require('passport');
//const upload = require('../util/s3Upload');

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'snippo',
    key(req, file, cb) {
      cb(null, `news/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', upload.array('image'), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.location));
});


router.post('/addNews', (req, res, next) => {
  let newNews = {
    hide: req.body.hide,
    model: req.body.model,
    releaseDate: req.body.releaseDate,
    title: req.body.title,
    content: req.body.content,
    source: req.body.source,
    price: req.body.price,
    subtitle: req.body.subtitle,
    image_urls: req.body.image_urls,
    brand: req.body.brand,
    username: req.body.username
  };

  NewsModel.addNews(newNews, (err, user) => {
    if (err) {
      console.log("error1");
      console.log(err)
      res.json({ success: false, msg: 'Failed to add News' });
    }
    else {
      if (req.body.checkboxNews) {
        NewsModel.updateNewsMain(user._id, user.title, (err, data) => {
          if (err)
            res.json({ success: false, msg: 'Failed to update News' });
          else
            res.json({ success: true, msg: 'News updated' });
        });
      }

      console.log(req.body.model.length);
      for (let i = 0; i < req.body.model.length; i++) {
        console.log(i);
        TagModel.findModelTag(req.body.model[i], (err, data) => {
          console.log(req.body.model[i]);
          if (err) {
            console.log("error1 is here");
            res.json({ success: false, msg: 'fail to find modeltag' });
          }
          else {

            if (data.length == 0) {
              //모델태그없음

              newstagarray = new Array();
              newstagarray.push(user._id);

              //추가할모델태그 추가해줌

              let newModelTag = {
                value: req.body.model[i],
                newstags: newstagarray
              };

              TagModel.addTag("model", newModelTag, (err, newTag) => {
                if (err) {
                  res.json({ success: false, msg: err });
                }
                else {
                  console.log("addTag");
                  res.json({ success: true, msg: newTag });
                }
              });
            }
            else {
              //모델태그있음
              TagModel.insertTagedId("model", data[0]._id, "raffle", user._id, (err, data3) => {
                if (err)
                  res.json({ success: false, msg: err });
                else {
                  res.json({ success: true, msg: data3 });
                }
              });

            }
          }
        });
      }
    }
  });
});


router.get('/getNewsMain', (req, res, next) => {

  NewsModel.getNewsMainByRandom((err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Fail to select' });
    } else {
      res.json({ success: true, data: data });
    }

  })

  // NewsModel.getNewsMain((err, data) => {
  //   if (err) {
  //     res.json({ success: false, msg: 'Fail to select' });
  //   }
  //   else {

  //     NewsModel.getNewsById(data.id, (err, data) => {
  //       if (err) {
  //         res.json({ success: false, msg: 'Fail to select' });
  //       }
  //       else
  //         res.json({ success: true, data: data });
  //     })
  //   }
  // });
});


router.get('/selectDataAll', (req, res, next) => {
  NewsModel.selectDataAll((err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      res.json({ success: true, data: data });
    }
  });
});

router.get('/getRecentRelease', (req, res, next) => {
  NewsModel.getRecentRelease((err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      res.json({ success: true, data: data });
    }
  });
});


router.get('/getDetailById', (req, res, next) => {
  NewsModel.getNewsById(req.headers._id, (err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      console.log(data);
      res.json({ success: true, data: data });
    }
  });
});

router.post('/updateNews', (req, res, next) => {
  let news = {
    _id: req.body._id,
    hide: req.body.hide,
    model: req.body.model,
    releaseDate: req.body.releaseDate,
    title: req.body.title,
    content: req.body.content,
    link: req.body.link,
    brand: req.body.brand,
    image_urls: req.body.image_urls
  };

  NewsModel.updateNews(news, (err, user) => {
    if (err)
      res.json({ success: false, msg: 'Failed to update News' });
    else {
      if (req.body.checkboxNews) {
        NewsModel.updateNewsMain(req.body._id, (err, data) => {
          if (err)
            res.json({ success: false, msg: 'Failed to update News' });
          else
            res.json({ success: true, msg: 'News updated' });
        });
      }
      else
        res.json({ success: true, msg: 'News updated' });
    }
  });
});

router.post('/deleteNews', (req, res, next) => {
  console.log(req.body._id);
  NewsModel.findOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    else { console.log(data); }
  });
  NewsModel.deleteById({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      console.log(data);
      res.json({ success: true, msg: 'News deleted' });
    }
  });
});

router.get('/isLikedByUserEmail', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  NewsModel.isLikedByUserEmail(req.user.email, req.query.newsId, (err, data) => {
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