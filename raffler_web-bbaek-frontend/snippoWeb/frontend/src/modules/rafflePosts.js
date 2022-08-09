import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as selectDataAllAPI from '../lib/api/rafflePosts';
import { takeLatest } from 'redux-saga/effects';

const [
    LIST_RAFFLEPOSTS,
    LIST_RAFFLEPOSTS_SUCCESS,
    LIST_RAFFLEPOSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_RAFFLEPOSTS');

export const listRafflePosts = createAction(
    LIST_RAFFLEPOSTS,
    ({ store, username, /*page*/ }) => ({ store, username, /*page*/ }),
);

const listRafflePostsSaga = createRequestSaga(LIST_RAFFLEPOSTS, selectDataAllAPI.listRafflePosts);

export function* rafflePostsSaga() {
    yield takeLatest(LIST_RAFFLEPOSTS, listRafflePostsSaga);
}

const initialState = {
    rafflePosts: null,
    error: null,
    /* lastPage: 1, */
};

const rafflePosts = handleActions(
    {
        [LIST_RAFFLEPOSTS_SUCCESS]: (state, { payload: rafflePosts, meta: response }) => ({
            ...state,
            rafflePosts,
            /* lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 반환 */
        }),
        [LIST_RAFFLEPOSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default rafflePosts;