import React from 'react';
import { Image } from 'cloudinary-react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const ASPECT_RATIO = 2;

const useSlideStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        position: 'relative',
        '&:hover $title': {
            height: '60%',
        },
    },
    title: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(rgba(0,0,0,0.01), rgba(0,0,0,1))',
        margin: 0,
        color: theme.palette.common.white,
        transitionDuration: `${theme.transitions.duration.standard}ms`,
        boxSizing: 'border-box',
        paddingTop: '1.5em',
    },
    image: {
        objectFit: 'cover',
    },
}));

export interface SlideProps {
    img: string;
    title: string;
    link: string;
}

function Slide({
    img,
    title,
    link,
}: SlideProps): React.ReactElement {
    const classes = useSlideStyles();

    return (
        <Link
            className={classes.root}
            to={link}
        >
            <Image
                aspectRatio={ASPECT_RATIO}
                width="auto"
                crop="fill"
                className={classes.image}
                publicId={img}
            />
            <Typography
                className={classes.title}
                variant="h5"
            >
                {title}
            </Typography>
        </Link>
    );
}

export default Slide;
