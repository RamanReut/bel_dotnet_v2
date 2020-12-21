import { EntityState } from '@reduxjs/toolkit';
import { TranslationContainer } from '../../../share/translationContainer';

export interface RootState {
    news: NewsState;
}

export interface NewsState {
    edit: EditState;
    data: DataState;
    common: CommonState;
}

export interface DataState {
    news: EntityState<News>;
    descentOrder: EntityState<NewsOrder>;
    maxCount: number;
}

export interface NewsOrder {
    id: number;
    newsId: number;
}

export interface EditState {
    language: string;
    isContentLoadSuccess: boolean;
    isContentLoading: boolean;
    id: number | 'new';
    title: TranslationContainer<string>;
    content: TranslationContainer<string>;
    previewImage: string;
}

export interface News {
    id: number;
    type: 'short' | 'full';
    content?: TranslationContainer<string>;
    title: TranslationContainer<string>;
    previewImage: string;
}

export interface CommonState {
    isPreview: boolean;
}
