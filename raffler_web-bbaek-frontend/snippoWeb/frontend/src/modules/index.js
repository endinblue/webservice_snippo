import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import writeNews, { writeNewsSaga } from './writeNews';
import writeRaffle, { writeRaffleSaga } from './writeRaffle';
import newsPost, { newsPostSaga } from './newsPost';
import newsPosts, { newsPostsSaga } from './newsPosts';
import rafflePost, { rafflePostSaga } from './rafflePost';
import rafflePosts, { rafflePostsSaga } from './rafflePosts';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    writeNews,
    newsPost,
    newsPosts,
    rafflePost,
    rafflePosts,
    writeRaffle,
});

export function* rootSaga() {
    yield all ([authSaga(), userSaga(), 
    writeNewsSaga(), writeRaffleSaga(),
    newsPostSaga(), newsPostsSaga(),
    rafflePostSaga(),rafflePostsSaga(),
]);   
}

export default rootReducer;