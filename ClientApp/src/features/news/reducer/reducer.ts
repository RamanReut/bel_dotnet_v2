import { combineReducers } from '@reduxjs/toolkit';
import * as data from './dataReducer';
import * as edit from './editReducer';
import * as common from './commonReducer';
import * as list from './listReducer';

export const reducer = combineReducers({
    data: data.reducer,
    edit: edit.reducer,
    common: common.reducer,
    list: list.reducer,
});

export const actions = {
    data: data.actions,
    edit: edit.actions,
    common: common.actions,
    list: list.actions,
};

export const selectors = {
    data: data.selectors,
    edit: edit.selectors,
    common: common.selectors,
    list: list.selectors,
};
