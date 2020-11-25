import { TranslationContainer } from '../../../share/translationContainer';

export interface News {
    id: number;
    preview: string;
    title: TranslationContainer<string>;
}

export type NewsState = Array<News>;

export interface MainState {
    news: NewsState;
}

export interface RootState {
    main: MainState;
}
