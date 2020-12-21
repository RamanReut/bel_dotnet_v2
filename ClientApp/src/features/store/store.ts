import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer as news } from '../news/reducer';
import main from '../Main/reducer';

const rootReducer = combineReducers({
    news,
    main,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDM) => getDM().concat(thunk),
});

export default store;
