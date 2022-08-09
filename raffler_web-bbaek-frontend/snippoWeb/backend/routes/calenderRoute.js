const express = require('express');
const router = express.Router();
const NewsModel = require('../models/NewsModel');
const RaffleModel = require('../models/raffleModel');


router.get('/mobile/getScheduleByMonth', (req, res, next) => {
  NewsModel.getNewsByMonth(req.headers.year,req.headers.month,(err,data)=>{
      if(err){
        res.json({success: false, msg: "Fail to select News By Month"});
      }
      else{
        //*****************JSON형식으로 합쳐야함 */
        var newsData = {"news":data}
        RaffleModel.getRaffleByMonth(req.headers.year,req.headers.month,(err,data)=>{
          if(err){
            res.json({success: false, msg: 'Fail to select Raffle by month'})
          }
          else{
           var raffleData= {"raffle":data}

           var data = Object.assign(newsData,raffleData)
            res.json({sucess: true, data:data});
           }
        })
      }
    })
});


module.exports =router;