import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as selectDataAllAPI from '../lib/api/newsPosts';
import { takeLatest } from 'redux-saga/effects';

const [
    READ_NEWSPOST,
    READ_NEWSPOST_SUCCESS,
    READ_NEWSPOST_FAILURE,
] = createRequestActionTypes('post/READ_NEWSPOST');
const UNLOAD_NEWSPOST = 'post/UNLOAD_NEWSPOST'; // 포스트 페이지에서 벗어날 때 데이터 비우기


export const readNewsPost = createAction(READ_NEWSPOST, _id => _id);
export const unloadNewsPost = createAction(UNLOAD_NEWSPOST);


const readNewsPostSaga = createRequestSaga(READ_NEWSPOST, selectDataAllAPI.readNewsPost);

export function* newsPostSaga() {
    yield takeLatest(READ_NEWSPOST, readNewsPostSaga);
}

const initialState = {
    newsPost: null,
    error: null,
};

const newsPost = handleActions(
    {
        [READ_NEWSPOST_SUCCESS]: (state, { payload: newsPost, user }) => ({
            ...state,
            newsPost,
            user,
        }),
        [READ_NEWSPOST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [UNLOAD_NEWSPOST]: () => initialState,
    },
    initialState,
);

export default newsPost;