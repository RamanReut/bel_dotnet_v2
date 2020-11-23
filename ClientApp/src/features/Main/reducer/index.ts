import reducer from './reducer';
import { actions as news } from './newsReducer';
import * as selectors from './selectors';

export default reducer;

export { selectors };

export const actions = {
    news,
};
