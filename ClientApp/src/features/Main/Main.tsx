import React from 'react';
import Carousel from './Carousel/Carousel';
import News from './News';

export default function Main(): React.ReactElement {
    return (
        <div>
            <Carousel />
            <News />
        </div>
    );
}
