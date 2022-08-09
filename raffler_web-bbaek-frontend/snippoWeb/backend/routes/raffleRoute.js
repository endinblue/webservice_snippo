  const express = require('express');
const router = express.Router();
const RaffleModel = require('../models/raffleModel');
const TagModel = require('../models/tagModel');
const AlarmModel = require('../models/alarmModel');
const passport = require('passport');

router.post('/addRaffle', (req, res, next) => {
  let newRaffle = new RaffleModel({
    hide: req.body.hide,
    store: req.body.store,
    model: req.body.model,
    raffleClose: req.body.raffleClose,
    country: req.body.country,
    link: req.body.link,
    webApp: req.body.webApp,
    pickUp: req.body.pickUp,
    image_urls: req.body.image_urls
  });
  
  RaffleModel.addRaffle(newRaffle, (err, addedraffle) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to add Raffle' });
    }
    else {
        
        /*let alarmPost = new AlarmModel({
          raffleId: addedraffle._id,
          gubun: "raffle"
        });
        
        AlarmModel.createAlarmPost(alarmPost, (err, data) => {
          if (err)
            res.json({ success: false, msg: 'Failed to create likePost' });
          else {

            //응모완료 테이블 만들어야함.....
            res.json({ success: true, msg: 'Raffle updated' });
          }
        });*/

        //모델태그있는지 확인
        for(let i=0; i<req.body.model.length; i++){
        TagModel.findModelTag(req.body.model[i], (err, data)=>{
           if(err)
              res.json({success : false, msg : 'fail to find modeltag'});
            else{
              
              if(data.length == 0){
                //모델태그없음
                console.log("no model tag");
                raffletagarray = new Array();
                raffletagarray.push(addedraffle._id);

                //추가할모델태그 추가해줌
                let newModelTag = {
                  value : req.body.model[i],
                  image : req.body.image_urls,
                  raffletags : raffletagarray
                };

                TagModel.addTag("model", newModelTag, (err,newTag)=>{
                  if(err){
                    console.log("err1");
                    res.json({success : false, msg:err});}
                  else {
                    console.log("newTag");
                    res.json({success : true,msg : newTag});
                  }
                });
              }
              else{

                /*if(!data[0].raffletags.length){
                  TagModel.addModelTagImage(data[0]._id, addedraffle._id, req.body.image_urls,(err,data2 )=>{
                   if(err){
                    console.log("err2");
                    res.json({success : false,msg:err});}
                  else{
                    console.log("addModelTagImage");
                    res.json({success : true,msg:data2});}
                  });
                  
                }*/
                
                  TagModel.insertTagedId("model",data[0]._id,"raffle",addedraffle._id,(err, data3)=>{
                    if(err){
                    console.log("err3");
                    res.json({success : false,msg:err});}
                    else{
                    console.log("inserTagId");
                    res.json({success : true,msg:data3});
                  }
                  });
                

              }
            }
         });
        }
    }
  });
});

router.get('/getDataAll', (req, res, next) => {
  RaffleModel.getDataAll((err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to get' });
    }
    else {
      res.json({ success: true, data: data });
    }
  });
});

router.get('/getDetailById', (req, res, next) => {
  RaffleModel.getRaffleById(req.headers._id, (err, data) => {
    if (err) {
      res.json({ success: false, msg: 'Fail to select' });
    }
    else
      res.json({ success: true, data: data });
  })
});

router.post('/deleteRaffle', (req, res, next) => {
  console.log(req.body._id);
  RaffleModel.findOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    else { console.log(data); }
  });
  RaffleModel.deleteById({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Fail to select' });
    }
    else {
      console.log(data);
      res.json({ success: true, msg: 'Raffle deleted' });
    }
  });
});

router.get('/isRaffleDoneByUserEmail', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  RaffleModel.isRaffleDoneByUserEmail(req.user.email, req.query.raffleId, (err, data) => {

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