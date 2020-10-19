import { TranslationContainer } from '../../../share/translationContainer';

export interface RootState {
    news: NewsState;
}

export interface NewsState {
    content: TranslationContainer<string>;
    title: TranslationContainer<string>;
    editLanguage: string;
}
