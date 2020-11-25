import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import Slide, { SlideProps } from './Slide';

export interface NewsCarouselProps {
    slides: SlideProps[];
}

export default function Carousel({
    slides,
}: NewsCarouselProps): React.ReactElement {
    return (
        <ResponsiveCarousel
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
        >
            {slides.map((slide) => (
                <Slide
                    key={slide.link}
                    {...slide}
                />
            ))}
        </ResponsiveCarousel>
    );
}
