import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as selectDataAllAPI from '../lib/api/rafflePosts';
import { takeLatest } from 'redux-saga/effects';

const[
    READ_RAFFLEPOST,
    READ_RAFFLEPOST_SUCCESS,
    READ_RAFFLEPOST_FAILURE,
] = createRequestActionTypes('post/READ_RAFFLEPOST');
const UNLOAD_RAFFLEPOST = 'post/UNLOAD_RAFFLEPOST'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readRafflePost = createAction(READ_RAFFLEPOST, _id => _id);
export const unloadRafflePost = createAction(UNLOAD_RAFFLEPOST);


const readRafflePostSaga = createRequestSaga(READ_RAFFLEPOST, selectDataAllAPI.readRafflePost);

export function* rafflePostSaga() {
    yield takeLatest(READ_RAFFLEPOST, readRafflePostSaga);
}

const initialState = {
    rafflePost: null,
    error: null,
};

const rafflePost = handleActions(
    {
        [READ_RAFFLEPOST_SUCCESS]: (state, { payload: rafflePost }) => ({
            ...state,
            rafflePost,
        }),
        [READ_RAFFLEPOST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [UNLOAD_RAFFLEPOST]: () => initialState,
    },
    initialState,
);

export default rafflePost;