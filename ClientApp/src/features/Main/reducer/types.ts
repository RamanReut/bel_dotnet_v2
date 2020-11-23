import { TranslationContainer } from '../../../share/translationContainer';

export interface News {
    id: number;
    preview: string;
    title: TranslationContainer<string>;
}

export interface NewsState {
    [index: number]: News;
}

export interface MainState {
    news: NewsState;
}

export interface RootState {
    main: MainState;
}
