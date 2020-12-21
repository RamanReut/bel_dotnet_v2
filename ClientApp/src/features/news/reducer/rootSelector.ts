import { RootState, NewsState } from './types';

export default function rootSelector(state: RootState): NewsState {
    return state.news;
}
