import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer as news } from '../news/reducer';

const rootReducer = combineReducers({
    news,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware().prepend(thunk),
});

export default store;
