/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ROOT_REDUCER_NAME } from './constants';
import { CarouselState } from './types';

const maxSlidesCount = 10;

const initialState: CarouselState = {
    currentSlide: 0,
};

const carouselSlice = createSlice({
    name: `${ROOT_REDUCER_NAME}/carousel`,
    initialState,
    reducers: {
        nextSlide(carousel: CarouselState) {
            carousel.currentSlide = (carousel.currentSlide + 1) % maxSlidesCount;
        },
        prevSlide(carousel: CarouselState) {
            carousel.currentSlide = (maxSlidesCount + carousel.currentSlide - 1) % maxSlidesCount;
        },
        changeSlide(carousel: CarouselState, { payload }: PayloadAction<number>) {
            carousel.currentSlide = payload;
        },
    },
});

export const { reducer, actions } = carouselSlice;
