//createRequestSaga -특정 액션이 디스패치 되었을때 정해진 로직에 따라 다른 액션으러 디스패치 시키는 규칙을 작성

import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

//TYPE re-factoring
export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [ type, SUCCESS, FAILURE];
};


export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type)); // 로딩 시작
        try{
            const response = yield call(request, action.payload);
           
            if(response.data.success ===true){
            yield put ({
                type: SUCCESS,
                payload: response.data,
                /*meta: response, */
            });
        }
            else{
                yield put ({
                type: FAILURE,
                payload: response.data,
                error: true,
            });
            }
        } catch (e) {
            yield put ({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); // 로딩 끝
    };
}