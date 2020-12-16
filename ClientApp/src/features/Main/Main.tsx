import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from './Carousel/Carousel';
import News from './News';
import { actions } from './reducer';

export default function Main(): React.ReactElement {
    const dispatch = useDispatch();

    useEffect(
        () => { dispatch(actions.news.initNews()); },
        [dispatch],
    );

    return (
        <div>
            <Carousel />
            <News />
        </div>
    );
}
