import { TranslationContainer } from '../../../share/translationContainer';

export interface News {
    id: number;
    previewImage: string;
    title: TranslationContainer<string>;
}

export interface NewsState {
    showCount: number;
    isLoading: boolean;
}

export interface CarouselState {
    currentSlide: number;
}

export interface MainState {
    news: NewsState;
    carousel: CarouselState;
}

export interface RootState {
    main: MainState;
}
