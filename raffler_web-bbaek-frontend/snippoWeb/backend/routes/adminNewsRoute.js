const express = require('express');
const router = express.Router();
const AdminNewsModel = require('../models/adminNewsModel');


router.get('/selectDataAll', (req, res, next) => {
    AdminNewsModel.selectDataAll((err,data)=>{
        if(err) console.log(err);
        else{
          res.json({sucess: true, data: data});
        } 
      });
});

router.get('/getNewsById',(req, res, next) =>{
    AdminNewsModel.getNewsById(req.headers._id, (err,data)=>{
      if(err) throw err;
      else{
        res.json({data:data});
      }
    });
});

module.exports =router;