import { combineReducers } from '@reduxjs/toolkit';
import { reducer as news } from './newsReducer';
import { reducer as carousel } from './carouselReducer';

const reducer = combineReducers({
    news,
    carousel,
});

export default reducer;
