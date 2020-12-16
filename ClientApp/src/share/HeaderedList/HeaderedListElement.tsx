import React, { ReactElement, ComponentType } from 'react';
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
    action: string | (() => void);
}

interface ButtonProps {
    component?: ComponentType<any>;
    to?: string;
    onClick?: () => void;
}

function ActionButton({
    icon,
    action,
}: ActionButtonProps) {
    const classes = useActionButtonStyles();
    const buttonProps: ButtonProps = {};

    if (typeof action === 'string') {
        buttonProps.component = Link;
        buttonProps.to = action;
    } else {
        buttonProps.onClick = action;
    }

    return (
        <IconButton
            className={classes.root}
            {...buttonProps}
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
    edit: string | (() => void);
    remove: string | (() => void);
}

function HeaderedListElement({
    img,
    title,
    link,
    edit,
    remove,
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
                    action={edit}
                />
                <ActionButton
                    icon={<DeleteIcon />}
                    action={remove}
                />
            </div>
        </ListItem>
    );
}

export default HeaderedListElement;
