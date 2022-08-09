import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as selectDataAllAPI from '../lib/api/newsPosts';
import { takeLatest } from 'redux-saga/effects';

const [
    LIST_NEWSPOSTS,
    LIST_NEWSPOSTS_SUCCESS,
    LIST_NEWSPOSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_NEWSPOSTS');

export const listNewsPosts = createAction(
    LIST_NEWSPOSTS,
    ({ brand, username }) => ({ brand, username }),
);

const listNewsPostsSaga = createRequestSaga(LIST_NEWSPOSTS, selectDataAllAPI.listNewsPosts);

export function* newsPostsSaga() {
    yield takeLatest(LIST_NEWSPOSTS, listNewsPostsSaga);
}

const initialState = {
    newsPosts: null,
    error: null,
    /* lastPage: 1, */
};

const newsPosts = handleActions(
    {
        [LIST_NEWSPOSTS_SUCCESS]: (state, { payload: newsPosts, meta: response }) => ({
            ...state,
            newsPosts,
            /* lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자로 반환 */
        }),
        [LIST_NEWSPOSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default newsPosts;