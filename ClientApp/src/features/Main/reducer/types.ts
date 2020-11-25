import { TranslationContainer } from '../../../share/translationContainer';

export interface News {
    id: number;
    preview: string;
    title: TranslationContainer<string>;
}

export interface NewsState {
    newsList: Record<number, News>;
    listOrder: Array<number>;
}

export interface MainState {
    news: NewsState;
}

export interface RootState {
    main: MainState;
}
