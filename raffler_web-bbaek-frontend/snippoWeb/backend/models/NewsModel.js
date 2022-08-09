const mongoose = require('mongoose');


const NewsMainSchema = mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    }
});

const NewsSchema = mongoose.Schema({
    hide: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        default: false
    },
    model: {
        type: [],
        required: false
    },
    releaseDate: {
        type: Date,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    source: {
        type: [],
        required: false
    },

    createdAt: {
        type: Date,
        required: false

    },
    updatedAt: {
        type: Date,
        required: false

    },
    price: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },

    link: {
        type: String,
        required: false
    },

    image_urls: [],
    likes: [],
    brand: [],
    views: {
        type: Number,
        required: false
    }

});


const News = module.exports = mongoose.model('News', NewsSchema);
const NewsMain = module.exports = mongoose.model('newsMain', NewsMainSchema);
module.exports.updateNewsMain = function (id, title, callback) {
    NewsMain.findOneAndUpdate({ des: 'newsMain' }, { id: id, title: title }, { upsert: true }, callback);
}

module.exports.getNewsMain = function (callback) {
    NewsMain.findOne({ des: 'newsMain' }, 'id', callback);
}


// Six Data sorted by release date (desc)
module.exports.getRecentRelease = function (callback) {
    News.find({}).sort({ releaseDate: -1 }).limit(6).exec(callback)
}



module.exports.addNews = function (news, callback) {
    news.createdAt = new Date();
    news.updatedAt = new Date();
    News.create(news, callback);
}


module.exports.updateNews = function (news, callback) {
    news.updatedAt = new Date();
    News.findByIdAndUpdate(news._id, news, callback);
}

module.exports.getNewsById = function (id, callback) {
    News.findById(id, callback);
}

module.exports.getNewsByReleaseDate = function (releaseDate, callback) {
    News.find({ releaseDate: releaseDate }, callback);
}

//find by month
module.exports.getNewsByMonth = function (clickYear, clickMonth, callback) {

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

    // ******starMonth, EndMonth 생성이 이상한듯
    var startMonth = new Date(clickYear, clickMonth - 1);
    var endMonth = new Date(clickYear, clickMonth);
    //console.log(clickMonth,clickYear,startMonth);
    News.find({ "releaseDate": { "$gte": startMonth, "$lte": endMonth } }, callback);
}


module.exports.selectDataAll = function (callback) {

    News.find({}).sort({ createdAt: -1 }).exec(callback)
}

//find and update
module.exports.changeHide = function (hide, callback) {
    hide.save(callback)
}


module.exports.deleteById = function (id, callback) {
    News.findByIdAndRemove(id, callback)
}

module.exports.addLikeByPost = function (newsId, userEmail, callback) {
    News.findByIdAndUpdate(newsId, { $push: { likes: { userEmail: userEmail } } }, callback);
}
module.exports.deleteLikeByPost = function(newsId, userEmail, callback){
    News.findByIdAndUpdate(newsId, { "$pull": { "likes": { "userEmail": userEmail } }}, { safe: true, multi:true }, callback);
 }


module.exports.isLikedByUserEmail = function (userEmail, newsId, callback) {
    News.findById(newsId)
        .where('likes').in({ 'userEmail': userEmail })
        .select('likes')
        .exec(callback);
}

module.exports.getNewsMainByRandom = function(callback){
    var cutoff = new Date();
cutoff.setDate(cutoff.getDate()-7);
    News.aggregate([{"$match": {"createdAt":{"$gte": cutoff}}}]).sample(3).exec(callback);
 }