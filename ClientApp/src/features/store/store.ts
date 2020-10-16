import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as news } from '../news/reducer';

const rootReducer = combineReducers({
    news,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
