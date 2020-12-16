import React, {
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import Section from '../../../share/Section';
import { getTranslation } from '../../../share/translationContainer';
import { actions, selectors } from '../reducer';
import Slide from './Slide';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const useStyles = makeStyles({
    root: {
        // height: NEWS_HEIGHT,
        width: '100%',
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        right: '0.1em',
        bottom: '0.1em',
    },
});

const SECONDS = 10;
const TIMEOUT_DURATION = SECONDS * 1000;

export default function NewsCarousel(): React.ReactElement {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { i18n } = useTranslation();

    const news = useSelector(selectors.newsList);
    const currentSlide = useSelector(selectors.currentSlide);

    const timerRef = useRef<number>(0);

    const slides = useMemo(
        () => news.map((elem) => ({
            id: elem.id,
            img: elem.preview,
            title: getTranslation(elem.title, i18n.language),
            link: `/news/${elem.id}`,
        })),
        [i18n.language, news],
    );

    const handleResetChangeSlideTimeout = useCallback(
        () => {
            clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(
                () => {
                    dispatch(actions.carousel.nextSlide());
                },
                TIMEOUT_DURATION,
            );
        },
        [dispatch],
    );

    const handleChangeSlide = useCallback(
        (slide) => {
            dispatch(actions.carousel.changeSlide(slide));
            handleResetChangeSlideTimeout();
        },
        [dispatch, handleResetChangeSlideTimeout],
    );

    useEffect(
        () => {
            handleResetChangeSlideTimeout();
            return () => clearTimeout(timerRef.current);
        },
        [handleResetChangeSlideTimeout],
    );

    return (
        <Section className={classes.root}>
            <ResponsiveCarousel
                infiniteLoop
                showIndicators={false}
                showThumbs={false}
                selectedItem={currentSlide}
                onChange={handleChangeSlide}
            >
                {slides.map((slide) => (
                    <Slide
                        key={slide.link}
                        {...slide}
                    />
                ))}
            </ResponsiveCarousel>
        </Section>
    );
}
