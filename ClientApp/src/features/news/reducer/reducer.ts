import { combineReducers } from '@reduxjs/toolkit';
import * as data from './dataReducer';
import * as edit from './editReducer';
import * as common from './commonReducer';

export const reducer = combineReducers({
    data: data.reducer,
    edit: edit.reducer,
    common: common.reducer,
});

export const actions = {
    data: data.actions,
    edit: edit.actions,
    common: common.actions,
};

export const selectors = {
    data: data.selectors,
    edit: edit.selectors,
    common: common.selectors,
};
