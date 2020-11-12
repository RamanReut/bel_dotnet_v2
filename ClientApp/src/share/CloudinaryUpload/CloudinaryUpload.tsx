import React, {
    ReactElement,
    useCallback,
    useState,
} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ImageUploading from 'react-images-uploading';
import { useTranslation } from 'react-i18next';
import { Image } from 'cloudinary-react';
import { useSnackbar } from 'notistack';
import DragAccept from './DragAccept';
import LoadPlug from './LoadPlug';
import imageUpload from './imageUpload';
import {
    IMAGE_HEIGHT,
    DEFAULT_HEIGHT,
    SMALL_DEVICE_HEIGHT,
} from './constants';

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
    isImageLoaded: boolean;
}

function ControlButtonGroup({
    onUpload,
    onRemove,
    isImageLoaded,
}: ControlButtonGroupProps) {
    const { t } = useTranslation();

    return (
        <Grid
            container
            spacing={1}
            direction="column"
        >
            <Grid item>
                <ButtonWithIcon
                    icon={<UploadIcon />}
                    onClick={onUpload}
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
        height: DEFAULT_HEIGHT,
        [theme.breakpoints.only('xs')]: {
            height: SMALL_DEVICE_HEIGHT,
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
        height: IMAGE_HEIGHT,
    },
    closeIcon: {
        color: theme.palette.error.contrastText,
    },
}));

export interface CloudinaryUploadProps {
    image: string;
    onChange: (imageId: string) => void;
}

function CloudinaryUpload({
    image,
    onChange,
}: CloudinaryUploadProps): ReactElement {
    const { t } = useTranslation();
    const classes = useCloudinaryUploadStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLoadingError = useCallback(() => {
        enqueueSnackbar(t('imageUploadError'), {
            variant: 'error',
            action: (
                <IconButton
                    className={classes.closeIcon}
                    onClick={() => closeSnackbar()}
                >
                    <CloseIcon />
                </IconButton>
            ),
        });
    }, [enqueueSnackbar, t, classes.closeIcon, closeSnackbar]);

    const handleChange = useCallback(async (imageList) => {
        setIsLoading(true);
        if (imageList.length > 0) {
            imageUpload(imageList[0].file)
                .then((path) => onChange(path))
                .catch(handleLoadingError)
                .finally(() => setIsLoading(false));
        } else {
            onChange('');
            setIsLoading(false);
        }
    }, [handleLoadingError, onChange]);

    return (
        <ImageUploading
            value={[]}
            onChange={handleChange}
        >
            {({
                onImageUpload,
                onImageRemoveAll,
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
                            if (image) {
                                return (
                                    <Grid item>
                                        <Image
                                            className={classes.image}
                                            publicId={image}
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
                                isImageLoaded={!!image}
                            />
                        </Grid>
                    </Grid>
                    <DragAccept
                        isDragging={isDragging as boolean}
                        {...dragProps}
                    />
                    <LoadPlug isActive={isLoading} />
                </div>
            )}
        </ImageUploading>
    );
}

export default CloudinaryUpload;
