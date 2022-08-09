/**
 * 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일(modules)에 다 정의되어있음
 */

import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as addNewsAPI from '../lib/api/newsPosts';
import { takeLatest, call, put } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key값 바꾸기

const [
    WRITE_NEWSPOST,
    WRITE_NEWSPOST_SUCCESS,
    WRITE_NEWSPOST_FAILURE,
] = createRequestActionTypes('write/WRITE_NEWSPOST'); //포스트 작성

const SET_ORIGINAL_NEWSPOST = 'write/SET_ORIGINAL_NEWSPOST';

const [
    UPDATE_NEWSPOST,
    UPDATE_NEWSPOST_SUCCESS,
    UPDATE_NEWSPOST_FAILURE,
] = createRequestActionTypes('write/UPDATE_NEWSPOST'); //포스트 수정

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

const [
    LOADING_BRAND_SUGGESTION,
    LOADING_BRAND_SUGGESTION_SUCCESS,
    LOADING_BRAND_SUGGESTION_FAILURE,
] = createRequestActionTypes('write/LOADING_BRAND_SUGGESTION');

const [
    LOADING_MODEL_SUGGESTION,
    LOADING_MODEL_SUGGESTION_SUCCESS,
    LOADING_MODEL_SUGGESTION_FAILURE,
] = createRequestActionTypes('write/LOADING_MODEL_SUGGESTION');

export const [
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
] = createRequestActionTypes('write/UPLOAD_IMAGES');

export const initialize = createAction(INITIALIZE);
export const loadingBrandSuggestion = createAction(LOADING_BRAND_SUGGESTION);
export const loadingModelSuggestion = createAction(LOADING_MODEL_SUGGESTION);

export const writeNewsPost = createAction(
    WRITE_NEWSPOST,
    ({ title, brand, model, releaseDate, content, source, image_urls, username }) => ({
        title,
        brand,
        model,
        releaseDate,
        content,
        source,
        image_urls,
        username,
    }));

export const setOriginalNewsPost = createAction(SET_ORIGINAL_NEWSPOST, newsPost => newsPost);

export const updateNewsPost = createAction(
    UPDATE_NEWSPOST,
    ({ _id, title, brand, model, releaseDate, content, source, image_urls }) => ({
        _id,
        title,
        brand,
        model,
        releaseDate,
        content,
        source,
        image_urls
    }),
);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}));

//사가 생성
const writeNewsPostSaga = createRequestSaga(WRITE_NEWSPOST, addNewsAPI.writeNewsPost);
const updateNewsPostSaga = createRequestSaga(UPDATE_NEWSPOST, addNewsAPI.updateNewsPost);
const loadingBrandSuggestionSaga = createRequestSaga(LOADING_BRAND_SUGGESTION, addNewsAPI.brandListSuggestion);
const loadingModelSuggestionSaga = createRequestSaga(LOADING_MODEL_SUGGESTION, addNewsAPI.modelListSuggestion);

export function* uploadImages(action) {
    try {
        const result = yield call(addNewsAPI.uploadImagesAPI, action.data);
        console.log("show result");
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            newsPostError: e,
        })
    }

}
export function* writeNewsSaga() {
    yield takeLatest(WRITE_NEWSPOST, writeNewsPostSaga);
    yield takeLatest(LOADING_BRAND_SUGGESTION, loadingBrandSuggestionSaga);
    yield takeLatest(LOADING_MODEL_SUGGESTION, loadingModelSuggestionSaga);
    yield takeLatest(UPDATE_NEWSPOST, updateNewsPostSaga);
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}


//들어가게될 field 정의
const initialState = {
    title: '',
    brand: [],
    brandSuggestion: [],
    model: [],
    modelSuggestion: [],
    releaseDate: Date,
    content: '',
    source: [],
    image_urls: [],
    newsPost: null,
    newsPostError: null,
    originalNewsPostId: null,
};

const writeNews = handleActions(
    {
        [INITIALIZE]: state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 key값을 없데이트
        }),
        [LOADING_BRAND_SUGGESTION_SUCCESS]: (state, { payload: brandSuggestion }) => ({
            ...state,
            brandSuggestion,
        }),
        [LOADING_BRAND_SUGGESTION_FAILURE]: (state, { payload: newsPostError }) => ({
            ...state,
            newsPostError,
        }),
        [LOADING_MODEL_SUGGESTION_SUCCESS]: (state, { payload: modelSuggestion }) => ({
            ...state,
            modelSuggestion,
        }),
        [LOADING_MODEL_SUGGESTION_FAILURE]: (state, { payload: newsPostError }) => ({
            ...state,
            newsPostError,
        }),
        [UPLOAD_IMAGES_REQUEST]: (state) => ({
            ...state,
        }),
        [UPLOAD_IMAGES_SUCCESS]: (state, action) => ({
            ...state,
            image_urls: [...state.image_urls, ...action.data],
        }),
        [UPLOAD_IMAGES_FAILURE]: (state, { payload: newsPostError }) => ({
            ...state,
            newsPostError,
        }),
        [REMOVE_IMAGE]: (state, action) => ({
            ...state,
            image_urls: state.image_urls.filter((v, i) => i !== action.index),
        }),
        [WRITE_NEWSPOST]: state => ({
            ...state,
            // post와 postError를 초기화
            newsPost: null,
            newsPostError: null,
        }),
        [WRITE_NEWSPOST_SUCCESS]: (state, { payload: newsPost }) => ({
            ...state,
            newsPost,
        }),
        [WRITE_NEWSPOST_FAILURE]: (state, { payload: newsPostError }) => ({
            ...state,
            newsPostError,
        }),
        [SET_ORIGINAL_NEWSPOST]: (state, { payload: newsPost }) => ({
            ...state,
            title: newsPost.data.title,
            brand: newsPost.data.brand,
            model: newsPost.data.model,
            releaseDate: newsPost.data.releaseDate,
            content: newsPost.data.content,
            source: newsPost.data.source,
            image_urls: newsPost.data.image_urls,
            originalNewsPostId: newsPost.data._id,
        }),
        [UPDATE_NEWSPOST_SUCCESS]: (state, { payload: newsPost }) => ({
            ...state,
            newsPost,
        }),
        [UPDATE_NEWSPOST_FAILURE]: (state, { payload: newsPostError }) => ({
            ...state,
            newsPostError,
        }),
    },
    initialState,
);

export default writeNews;