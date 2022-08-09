const mongoose = require('mongoose');

const RaffleSchema = mongoose.Schema({

    hide: {
        type: Boolean,
        default: false
    },

    model: {
        type: [],
        required: true,
    },

    store: [],

    raffleClose: {
        type: Date,
        required: false
    },

    country: [],

    createdAt: {
        type: Date,
        required: false

    },
    updatedAt: {
        type: Date,
        required: false

    },

    link: {
        type: String,
        required: true
    },

    webApp: [],
    pickUp: [],
    image_urls: [],
    raffleDone: []

});


const Raffle = module.exports = mongoose.model('Raffle', RaffleSchema);


module.exports.addRaffle = function (raffle, callback) {
    raffle.createdAt = new Date();
    raffle.updatedAt = new Date();

    Raffle.create(raffle, callback);
}


module.exports.getDataAll = function (callback) {

    Raffle.find({}).sort({ createdAt: -1 }).exec(callback)
}

module.exports.getRaffleByMonth = function (clickYear, clickMonth, callback) {
    clickYear = parseInt(clickYear);
    clickMonth = parseInt(clickMonth)
    if (clickYear < 2000 || clickYear > 2019 || clickYear == null) {
        clickYear = 2019;
        console.log("outrange of clickYear");
    }
    if (clickMonth < 0 || clickMonth > 11 || clickMonth == null) {
        clickMonth = 0;
        console.log("outrange of clickMonth")
    }
    var startMonth = new Date(clickYear, clickMonth - 1);
    var endMonth = new Date(clickYear, clickMonth);

    Raffle.find({ $or: [{ "createdAt": { "$gte": startMonth, "$lte": endMonth } }, { "raffleClose": { "$gte": startMonth, "$lte": endMonth } }] }, callback);
}

module.exports.getRaffleById = function (id, callback) {
    Raffle.findById(id, callback);
}

module.exports.deleteById = function (id, callback) {
    Raffle.findByIdAndRemove(id, callback)
}

module.exports.addRaffleDone = function (raffleId, userEmail, callback) {
    Raffle.findByIdAndUpdate(raffleId, { $push: { raffleDone: { userEmail: userEmail } } }, callback);
}

module.exports.isRaffleDoneByUserEmail = function (userEmail, raffleId, callback) {
    Raffle.findById(raffleId)
    .where('raffleDone').in({'userEmail':userEmail})
    .select('raffleDone')
    .exec(callback);
}

module.exports.getTitle= function(id , callback){
      Raffle.findById(id, 'model',(err, data)=>{
        callback(null,data.model);
      });
}