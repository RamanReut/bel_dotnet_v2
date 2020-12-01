import React, { ReactElement } from 'react';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const useActionButtonStyles = makeStyles({
    root: {
        display: 'block',
    },
});

interface ActionButtonProps {
    icon: ReactElement;
    link: string;
}

function ActionButton({
    icon,
    link,
}: ActionButtonProps) {
    const classes = useActionButtonStyles();

    return (
        <IconButton
            className={classes.root}
            component={Link}
            to={link}
        >
            {icon}
        </IconButton>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
        '&:hover $title': {
            textDecoration: 'underline',
        },
    },
    link: {
        textDecoration: 'none',
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1,
        '&:visited': {
            color: theme.palette.text.primary,
        },
    },
    image: {
        marginTop: '0.2em',
        marginBottom: '0.2em',
        marginRight: '0.7em',
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexGrow: 1,
        flexShrink: 1,
    },
}));

export interface HeaderedListElementProps {
    img: string;
    title: string;
    link: string;
    editLink: string;
}

function HeaderedListElement({
    img,
    title,
    link,
    editLink,
}: HeaderedListElementProps): ReactElement {
    const classes = useStyles();

    return (
        <ListItem
            className={classes.root}
            button
            component="li"
        >
            <Grid
                container
                className={classes.link}
                wrap="nowrap"
                alignItems="center"
                component={Link}
                to={link}
            >
                <Grid item>
                    <Image
                        className={classes.image}
                        publicId={img}
                        height={90}
                        width={160}
                        crop="fill"
                    />
                </Grid>
                <Grid
                    className={classes.title}
                    item
                >
                    {title}
                </Grid>
            </Grid>
            <div>
                <ActionButton
                    icon={<EditIcon />}
                    link={editLink}
                />
                <ActionButton
                    icon={<DeleteIcon />}
                    link="/"
                />
            </div>
        </ListItem>
    );
}

export default HeaderedListElement;
