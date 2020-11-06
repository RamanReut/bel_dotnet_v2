/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import UploadIcon from '@material-ui/icons/CloudUpload';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        zIndex: 0,
        width: '100%',
        height: '100%',
        borderWidth: '3px',
        borderStyle: 'dashed',
        borderColor: theme.palette.secondary.light,
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        zIndex: 2,
    },
    iconWrapper: {
        marginRight: '0.25em',
    },
}));

export interface DragAcceptProps {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
    isDragging: boolean;
}

export default function DragAccept({
    onDrop,
    onDragEnter,
    onDragLeave,
    onDragOver,
    isDragging,
}: DragAcceptProps): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div
            className={
                classnames(
                    classes.root,
                    { [classes.active]: isDragging },
                )
            }
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
        >
            <Icon className={classes.iconWrapper}>
                <UploadIcon />
            </Icon>
            {t('previewDnD')}
        </div>
    );
}
