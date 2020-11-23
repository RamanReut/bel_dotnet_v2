import { combineReducers } from '@reduxjs/toolkit';
import { reducer as news } from './newsReducer';

const reducer = combineReducers({
    news,
});

export default reducer;
