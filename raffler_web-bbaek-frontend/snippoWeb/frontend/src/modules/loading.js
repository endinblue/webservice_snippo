/**
 * 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일(modules)에 다 정의되어있음
 */

import { createAction, handleActions } from 'redux-actions';

/*
요청을 위한 액션 타입을 payload로 설정합니다. (예. "sample/GET_POST")
*/

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/* 액션 생성 */

export const startLoading= createAction(
    START_LOADING,
    requestType => requestType,
);

export const finishLoading= createAction(
    FINISH_LOADING,
    requestType => requestType,
);

/* 리듀서 */
const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]:false,
        }),
    },
    initialState,
)

export default loading;