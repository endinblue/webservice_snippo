const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const firebaseconfig = require('./config/firebase_config');
require('dotenv').config();
const passport = require('passport');
const admin = require('firebase-admin');

const prod = process.env.NODE_ENV === 'production';


admin.initializeApp({
    credential: admin.credential.cert(firebaseconfig.config),
    // credential: admin.credential.applicationDefault(),
    databaseURL: "https://fcmtest-74b28.firebaseio.com"
});


//data base setting
mongoose.connect(process.env.database, { useNewUrlParser: true, useFindAndModify : false });
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + process.env.database);
});
mongoose.connection.on('error', (err) => {
    console.log('DB error ' + err);
});

const app = express();

app.use(cors());


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//IMAGE
app.use('/',express.static( 'uploads'));


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
//==========================================================
// var registrationToken = 'fgAQ3PN0Ah8mRckBI9A10y:APA91bHG_a-x7p3hPnTR3dT3aa_k6akliKs59g3KdUCuILQS4VLyoqfNAzaf2kYhRBuEamTjZeNm_A0d8q-lD6IfoxJLioqgzUopPOXdw7WxHiKmwrbNR9WRm5_56gbJBFPeF0_v9jiY';
//
// const messages = [];
// messages.push({
//     notification: {title: 'Praasddfice drop', body: '5% off all electronics'},
//     token: registrationToken,
// });
// messages.push({
//     notification: {title: 'Price drop', body: '2% off all books'},
//     topic: 'readers-club',
// });
//
// admin.messaging().sendAll(messages)
//     .then((response) => {
//         console.log(response.successCount + ' medssdages were sent successfully');
//     });
//=========================================================
const usersRoute = require('./routes/userRoute');
const adminNewsRoute = require('./routes/adminNewsRoute');
const newsRoute = require('./routes/newsRoute');
const adminRaffleRoute = require('./routes/adminRaffleRoute');
const raffleRoute = require('./routes/raffleRoute');
const calenderRoute = require('./routes/calenderRoute');
const userActRoute = require('./routes/userActRoute');
const communityRoute = require('./routes/communityRoute');
const adminRoute = require('./routes/adminRoute');
app.use('/users', usersRoute);
app.use('/adminNews',adminNewsRoute);
app.use('/news', newsRoute);
app.use('/adminRaffle', adminRaffleRoute);
app.use('/raffle', raffleRoute);
app.use('/calender',calenderRoute);
app.use('/act', userActRoute);
app.use('/community', communityRoute);
app.use('/admin', adminRoute);

// Start Server
app.listen(prod ? process.env.PORT : 4000, () => {
    console.log(`backend server started on port ${process.env.PORT}`);
});

