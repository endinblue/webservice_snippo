const express = require('express');
const router = express.Router();
const AdminRaffleModel = require('../models/adminRaffleModel');


router.get('/selectDataAll', (req, res, next) => {
    AdminRaffleModel.selectDataAll((err,data)=>{
        if(err) console.log(err);
        else{
          res.json({sucess: true, data: data});
        } 
      });
});

router.get('/getNewsById',(req, res, next) =>{
    AdminRaffleModel.getNewsById(req.headers._id, (err,data)=>{
      if(err) throw err;
      else{
        res.json({data:data});
      }
    });
});

module.exports =router;