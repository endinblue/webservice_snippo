const express = require('express');
const router = express.Router();
const TagModel = require('../models/tagModel');
const passport = require('passport');

router.get('/listTag', (req, res, next) => {
  TagModel.getTagList(req.headers.tagtype, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'err' });
    }
    else if (data) {
      res.json({ success: true, data: data });
    }
    else if (!data) {
      res.json({ success: false, msg: "no_data" });
    }
  })
});


router.post('/addTag', (req, res, next) => {
  let tag = {
    value: req.body.value,
    image: req.body.image
  };

  TagModel.addTag(req.body.tagtype, tag, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: "can not add tag" });
    }
    else {
      res.json({ success: true, msg: "yes! add tag" });
    }
  });
}),

  router.get('/deleteTag', (req, res, next) => {
    TagModel.deleteTag(req.headers.type, req.headers.value, (err) => {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: "can delete tag" });
      }
      else {
        res.json({ success: true, msg: "delete tag" });
      }
    })
  })
module.exports = router;