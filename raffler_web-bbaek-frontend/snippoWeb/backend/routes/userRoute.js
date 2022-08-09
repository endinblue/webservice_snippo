const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {

  var adminval = false;
  if (req.body.isAdmin === true) {
    adminval = true;
  }


  let newUser = new UserModel({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: adminval
  });
  console.log(req.body);
  UserModel.checkByEmail(newUser.email, (err, isConflict) => {
    if (err) throw err;
    if (isConflict) {
      console.log("EMAIL ERROR")
      return res.json({ success: false, msg: 'email conflict' });
    }
    UserModel.checkByUsername(newUser.username, (err, isConflict) => {
      if (err) throw err;
      if (isConflict)
        return res.json({ success: false, msg: 'usersname conflict' });
      else {
        UserModel.addUser(newUser, (err, user) => {
          if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
          }
          else {
            const token = UserModel.generateToken(user);
            res.json(
              {
                success: true,
                msg: 'User registered',
                token: "jwt " + token,

              });
          }
        });
      }
    });
  });
});

//login
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  UserModel.checkByEmail(email, (err, user) => {
    console.log("로그인 실행");
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    UserModel.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = UserModel.generateToken(user);

        return res.json({
          success: true,
          token: "jwt " + token,
          // user: {
          //   id: user._id,
          //   username: user.username,
          //   email: user.email,
          //   isAdmin:user.isAdmin
          // }
        });
      } else return res.json({ success: false, msg: 'Password does not match' });
    });
  });
});

// Profile  (header=> Authorization : jwt ....)
router.get('/profile', /*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
  res.json({ success: true, msg: 'asd' })
});

router.get('/selectDataAll', (req, res, next) => {
  UserModel.selectDataAll((err, data) => {
    if (err) throw err;
    else {
      res.json({ success: true, data: data });
    }
  });
});

router.get('/check', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  console.log("check");
  const token = req.headers.authorization.substring(4, req.headers.authorization.length);//token 앞에 jwt 버리고 가져오는것
  const decode = jwt.verify(token, config.secret);
  const user = {                    //user 정보가 더 필요하면 decode.정보 값 추가하면 됌!
    id: decode.data._id,
    username: decode.data.username,
    email: decode.data.email,
    isAdmin: decode.data.isAdmin
  }


  res.json({ success: true, user });

});

router.post('/logout', (req, res, next) => {
  res.req.headers.authorization = "";
  console.log("logout");
  res.json({ success: true, msg: 'asd' });
});

router.post('/deleteUser', (req, res, next) => {
  UserModel.deleteUser(req.body.email, (err, isConflict) => {
    if (err)
      res.json({ success: false, msg: "cannotdelete user" });
    else
      res.json({ success: true, msg: "deleteuser" });

  });

})

router.post('/setPushToken', (req, res, next)=>{
  UserModel.addPushToken(req.body.pushtoken,req.body.userinfo.username)
  res.json({success:true, msg: "hihi"});
});
module.exports = router;