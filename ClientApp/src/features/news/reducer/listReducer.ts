import {
    createSlice,
    createSelector,
    PayloadAction,
} from '@reduxjs/toolkit';
import rootSelector from './rootSelector';
import { ListState } from './types';
import { ROOT_REDUCER_NAME } from './constants';

const listSelector = createSelector(
    rootSelector,
    (root) => root.list,
);

const selectors = {
    page: createSelector(
        listSelector,
        (list) => list.page,
    ),
};

const initialState: ListState = {
    page: 1,
};

const slice = createSlice({
    name: `${ROOT_REDUCER_NAME}/list`,
    initialState,
    reducers: {
        setPage(state, { payload }: PayloadAction<number>) {
            state.page = payload;
        },
    },
});

export { selectors };
export const { reducer, actions } = slice;
