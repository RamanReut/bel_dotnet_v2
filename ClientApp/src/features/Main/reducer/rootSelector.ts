import {
    RootState,
    MainState,
} from './types';

export default function rootSelector(state: RootState): MainState {
    return state.main;
}
