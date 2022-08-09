/**
 * 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일(modules)에 다 정의되어있음
 */
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';

const SET_PUSH_TOKEN = 'user/SET_PUSH_TOKEN';
const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'user/LOGIN',
);
export const setPushToken = createAction(SET_PUSH_TOKEN, ({ pushtoken, userinfo })=>({
    pushtoken,
    userinfo,

}));
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK, token => token);
export const logout = createAction(LOGOUT);
export const login = createAction(LOGIN, ({ email, password }) => ({
    email,
    password,
}));
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const SetPushTokenSaga = createRequestSaga(SET_PUSH_TOKEN, authAPI.SetPushToken);
function checkFailureSaga() {
    try {
        console.log("실패당");
        //console.log(user);
        // localStorage.removeItem('user'); // localStorage에서 user를 제거
    } catch (e) {
        console.log('localStorage is not working');
    }
}

function* logoutSaga() {
    try {
        yield call(authAPI.logout); // logout API 호출
        localStorage.removeItem('token'); // localStorage에서 user를 제거
    } catch (e) {
        console.log(e);
    }
}
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* userSaga() {
    yield takeLatest(SET_PUSH_TOKEN, SetPushTokenSaga);
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(LOGIN, loginSaga);
}



const initialState = {
    user: null,
    checkError: null,
    loginError: null
};

export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        }),
        [LOGIN_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            loginError: null,
            user,
        }),
        //로그인 실패
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            loginError: error,
        }),
        [SET_PUSH_TOKEN]: (state, { payload: error }) => ({
            ...state,
        }),
    },
    initialState,
);