import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check,setPushToken } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';




//mport admin from 'firebase-admin';
//import pushkey from './config/firebase_key'

//여기서부터 푸시메시지
// import firebase from 'firebase';
// // admin.initializeApp({
// //     credential: admin.credential.cert(pushkey),
// //     databaseURL: "https://fcmtest-74b28.firebaseio.com"
// // });
// var firebaseConfig = {
//     apiKey: "AIzaSyDhywoA63xrbVoKTGJYFauTM0GBIk5D18M",
//     authDomain: "fcmtest-74b28.firebaseapp.com",
//     databaseURL: "https://fcmtest-74b28.firebaseio.com",
//     projectId: "fcmtest-74b28",
//     storageBucket: "fcmtest-74b28.appspot.com",
//     messagingSenderId: "146013192443",
//     appId: "1:146013192443:web:c8901dfa8c2dd682b8b05e",
//     measurementId: "G-BKRW82LGDW"
// };
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();
//
// messaging.usePublicVapidKey('BGBt6y846CbnwwpaoUPQjFGV0fa2iBWiqoPYoFmo1XXHe9Kfe_uCYCUK7B4K_C5h1almjJqpRf8FKUnXcgI1UuE');
//
// messaging.getToken().then(pushtoken =>{
//
//     const user = localStorage.getItem('token');
//     if (!user) return; //로그인 상태가 아니라면 아무것도 안함.
//     const token = JSON.parse(user);
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     const decode = JSON.parse(jsonPayload);
//     const userinfo = {
//         username: decode.data.username
//     }
//     store.dispatch(setPushToken({pushtoken,userinfo}));
//
// });
// messaging.onMessage(function(payload){
//     console.log(payload.notification.title);
//     console.log(payload.notification.body);
// });

//==============================================================





const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
    try {
        const user = localStorage.getItem('token');
        if (!user) return; //로그인 상태가 아니라면 아무것도 안함.
        const token = JSON.parse(user);
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decode = JSON.parse(jsonPayload);
        const userinfo = {
            username: decode.data.username
        }

        console.log("loaduser 실행");
        //console.log(pushtoken);
        store.dispatch(setPushToken({token, userinfo}));
        store.dispatch(tempSetUser(userinfo));
        store.dispatch(check({ token }));
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();