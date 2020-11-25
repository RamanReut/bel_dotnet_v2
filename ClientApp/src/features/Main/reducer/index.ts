import reducer from './reducer';
import { actions as news } from './newsReducer';
import * as selectors from './selectors';
import * as types from './types';

export default reducer;

export { selectors, types };

export const actions = {
    news,
};
