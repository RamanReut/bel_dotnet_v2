import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

const IMAGE_WIDTH = 240;
const ASPECT_RATIO = 1.6;

const useStyles = makeStyles(
    (theme) => ({
        root: {
            width: `${IMAGE_WIDTH}px`,
            '& a': {
                textDecoration: 'none',
                color: theme.palette.text.primary,
                '&:hover': {
                    textDecoration: 'underline',
                },
                '&:visited': {
                    color: theme.palette.text.primary,
                },
            },
        },
    }),
);

export interface NewsCardProps {
    id: number;
    title: string;
    image: string;
}

function NewsCard({
    id,
    title,
    image,
}: NewsCardProps): ReactElement {
    const classes = useStyles();

    return (
        <Card
            elevation={5}
            className={classes.root}
        >
            <Link to={`/news/${id}`}>
                <CardMedia>
                    <Image
                        responsive
                        publicId={image}
                        width="auto"
                        aspectRatio={ASPECT_RATIO}
                        crop="fill"
                    />
                </CardMedia>
                <CardHeader
                    title={title}
                />
            </Link>
        </Card>
    );
}

export default NewsCard;
