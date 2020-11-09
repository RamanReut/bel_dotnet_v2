import React, {
    ReactElement,
    useState,
    useCallback,
} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useTranslation } from 'react-i18next';
import DragAccept from './DragAccept';

const HEIGHT = '6em';
const REPONSIVE_HEIGHT_CHANGE = '6em';

const useButtonStyle = makeStyles({
    root: {
        width: '10em',
        justifyContent: 'flex-start',
    },
});

interface ButtonWithIconProps {
    children: string;
    icon: React.ReactNode;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

function ButtonWithIcon({
    children,
    icon,
    onClick,
}: ButtonWithIconProps) {
    const classes = useButtonStyle();

    return (
        <Button
            classes={classes}
            startIcon={icon}
            variant="contained"
            color="primary"
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

interface ControlButtonGroupProps {
    onUpload: () => void;
    onRemove: () => void;
    onUpdate: (index: number) => void;
    isImageLoaded: boolean;
}

function ControlButtonGroup({
    onUpload,
    onRemove,
    onUpdate,
    isImageLoaded,
}: ControlButtonGroupProps) {
    const { t } = useTranslation();
    const handleUpdate = useCallback(
        () => {
            onUpdate(0);
        },
        [onUpdate],
    );

    return (
        <Grid
            container
            spacing={1}
            direction="column"
        >
            <Grid item>
                <ButtonWithIcon
                    icon={<UploadIcon />}
                    onClick={isImageLoaded ? () => handleUpdate : onUpload}
                >
                    {isImageLoaded ? t('update') : t('upload')}
                </ButtonWithIcon>
            </Grid>
            {isImageLoaded
                ? (
                    <Grid item>
                        <ButtonWithIcon
                            icon={<DeleteIcon />}
                            onClick={onRemove}
                        >
                            {t('remove')}
                        </ButtonWithIcon>
                    </Grid>
                ) : <div />}
        </Grid>
    );
}

const useCloudinaryUploadStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: HEIGHT,
        [theme.breakpoints.only('xs')]: {
            height: `calc(${HEIGHT} + ${REPONSIVE_HEIGHT_CHANGE})`,
        },
        position: 'relative',
    },
    dragging: {
        boxSizing: 'border-box',
        borderColor: theme.palette.secondary.light,
        borderStyle: 'dashed',
        borderWidth: '3px',
    },
    controlWrapper: {
        position: 'relative',
        zIndex: 1,
        background: 'white',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        margin: 0,
        '&>.MuiGrid-item': {
            paddingBottom: '0',
            paddingTop: '0',
        },
    },
    image: {
        height: HEIGHT,
    },
}));

function CloudinaryUpload(): ReactElement {
    const [images, setImages] = useState<ImageListType>([]);
    const { t } = useTranslation();
    const classes = useCloudinaryUploadStyles();

    const handleChange = useCallback((imageList) => {
        setImages(imageList);
    }, [setImages]);

    return (
        <ImageUploading
            value={images}
            onChange={handleChange}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                dragProps,
                isDragging,
            }) => (
                <div className={classes.root}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                        className={classes.controlWrapper}
                        onDragEnter={dragProps.onDragEnter}
                        onDragOver={dragProps.onDragOver}
                    >
                        {((): ReactElement => {
                            const image = imageList[0];

                            if (image) {
                                return (
                                    <Grid item>
                                        <img
                                            className={classes.image}
                                            src={image.dataURL}
                                            alt={t('previewImageAlt')}
                                        />
                                    </Grid>
                                );
                            }
                            return <div />;
                        })()}
                        <Grid item>
                            <ControlButtonGroup
                                onUpload={onImageUpload}
                                onRemove={onImageRemoveAll}
                                onUpdate={onImageUpdate}
                                isImageLoaded={!!images.length}
                            />
                        </Grid>
                    </Grid>
                    <DragAccept
                        isDragging={isDragging as boolean}
                        {...dragProps}
                    />
                </div>
            )}
        </ImageUploading>
    );
}

export default CloudinaryUpload;
