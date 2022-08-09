/**
 * 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일(modules)에 다 정의되어있음
 */

import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as addRaffleAPI from '../lib/api/rafflePosts';

import { takeLatest, call, put } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key값 바꾸기

const [
    WRITE_RAFFLEPOST,
    WRITE_RAFFLEPOST_SUCCESS,
    WRITE_RAFFLEPOST_FAILURE,
] = createRequestActionTypes('write/WRITE_RAFFLEPOST'); //포스트 작성

const SET_ORIGINAL_RAFFLEPOST = 'write/SET_ORIGINAL_RAFFLEPOST';

const [
    UPDATE_RAFFLEPOST,
    UPDATE_RAFFLEPOST_SUCCESS,
    UPDATE_RAFFLEPOST_FAILURE,
] = createRequestActionTypes('write/UPDATE_RAFFLEPOST'); //포스트 수정

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

const [
    LOADING_MODEL_SUGGESTION,
    LOADING_MODEL_SUGGESTION_SUCCESS,
    LOADING_MODEL_SUGGESTION_FAILURE,
] = createRequestActionTypes('write/LOADING_MODEL_SUGGESTION');

const [
    LOADING_STORE_SUGGESTION,
    LOADING_STORE_SUGGESTION_SUCCESS,
    LOADING_STORE_SUGGESTION_FAILURE,
] = createRequestActionTypes('write/LOADING_STORE_SUGGESTION');

export const [
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
] = createRequestActionTypes('write/UPLOAD_IMAGES');

export const initialize = createAction(INITIALIZE);
export const loadingStoreSuggestion = createAction(LOADING_STORE_SUGGESTION);
export const loadingModelSuggestion = createAction(LOADING_MODEL_SUGGESTION);

export const writeRafflePost = createAction(
    WRITE_RAFFLEPOST,
    ({ model, store, raffleClose, country, link, webApp, pickUp, image_urls, }) => ({
        model,
        store,
        raffleClose,
        country,
        link,
        webApp,
        pickUp,
        image_urls,
    }));

export const setOriginalRafflePost = createAction(SET_ORIGINAL_RAFFLEPOST, rafflePost => rafflePost);

export const updateRafflePost = createAction(
    UPDATE_RAFFLEPOST,
    ({ id, model, store, raffleClose, country, link, webApp, pickUp, image_urls, }) => ({
        id,
        model,
        store,
        raffleClose,
        country,
        link,
        webApp,
        pickUp,
        image_urls
    }),
);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}));

//사가 생성
const writeRafflePostSaga = createRequestSaga(WRITE_RAFFLEPOST, addRaffleAPI.writeRafflePost);
const updateRafflePostSaga = createRequestSaga(UPDATE_RAFFLEPOST, addRaffleAPI.updateRafflePost);
const loadingModelSuggestionSaga = createRequestSaga(LOADING_MODEL_SUGGESTION, addRaffleAPI.modelListSuggestion);
const loadingStoreSuggestionSaga = createRequestSaga(LOADING_STORE_SUGGESTION, addRaffleAPI.storeListSuggestion);


export function* uploadImages(action) {
    try {
        const result = yield call(addRaffleAPI.uploadImagesAPI, action.data);
        console.log("show result");
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            rafflePostError: e,
        })
    }

}
export function* writeRaffleSaga() {
    yield takeLatest(WRITE_RAFFLEPOST, writeRafflePostSaga);
    yield takeLatest(LOADING_MODEL_SUGGESTION, loadingModelSuggestionSaga);
    yield takeLatest(LOADING_MODEL_SUGGESTION, loadingStoreSuggestionSaga);
    yield takeLatest(UPDATE_RAFFLEPOST, updateRafflePostSaga);
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}


//들어가게될 field 정의
const initialState = {
    model: [],
    modelSuggestion: [],
    store: [],
    storeSuggestion: [],
    raffleClose: Date,
    country: [],
    link: '',
    webApp: [],
    pickUp: [],
    image_urls: [],
    rafflePost: null,
    rafflePostError: null,
    originalRafflePostId: null,
};

const writeRaffle = handleActions(
    {
        [INITIALIZE]: state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 key값을 없데이트
        }),
        [LOADING_MODEL_SUGGESTION_SUCCESS]: (state, { payload: modelSuggestion }) => ({
            ...state,
            modelSuggestion,
        }),
        [LOADING_MODEL_SUGGESTION_FAILURE]: (state, { payload: rafflePostError }) => ({
            ...state,
            rafflePostError,
        }),
        [LOADING_STORE_SUGGESTION_SUCCESS]: (state, { payload: storeSuggestion }) => ({
            ...state,
            storeSuggestion,
        }),
        [LOADING_STORE_SUGGESTION_FAILURE]: (state, { payload: rafflePostError }) => ({
            ...state,
            rafflePostError,
        }),
        [UPLOAD_IMAGES_REQUEST]: (state) => ({
            ...state,
        }),
        [UPLOAD_IMAGES_SUCCESS]: (state, action) => ({
            ...state,
            image_urls: [...state.image_urls, ...action.data],
        }),
        [UPLOAD_IMAGES_FAILURE]: (state, { payload: rafflePostError }) => ({
            ...state,
            rafflePostError,
        }),
        [REMOVE_IMAGE]: (state, action) => ({
            ...state,
            image_urls: state.image_urls.filter((v, i) => i !== action.index),
        }),

        [WRITE_RAFFLEPOST]: state => ({
            ...state,
            // post와 postError를 초기화
            rafflePost: null,
            rafflePostError: null,
        }),
        [WRITE_RAFFLEPOST_SUCCESS]: (state, { payload: rafflePost }) => ({
            ...state,
            rafflePost,
        }),
        [WRITE_RAFFLEPOST_FAILURE]: (state, { payload: rafflePostError }) => ({
            ...state,
            rafflePostError,
        }),
        [SET_ORIGINAL_RAFFLEPOST]: (state, { payload: rafflePost }) => ({
            ...state,
            model: rafflePost.data.model,
            store: rafflePost.data.store,
            raffleClose: rafflePost.data.raffleClose,
            country: rafflePost.data.country,
            link: rafflePost.data.link,
            webApp: rafflePost.data.webApp,
            pickUp: rafflePost.data.pickUp,
            image_urls: rafflePost.data.image_urls,
            originalRafflePostId: rafflePost.data._id,
        }),
        [UPDATE_RAFFLEPOST_SUCCESS]: (state, { payload: rafflePost }) => ({
            ...state,
            rafflePost,
        }),
        [UPDATE_RAFFLEPOST_FAILURE]: (state, { payload: rafflePostError }) => ({
            ...state,
            rafflePostError,
        }),
    },
    initialState,
);

export default writeRaffle;