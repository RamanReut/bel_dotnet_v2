import React, {
    ReactElement,
    useState,
    useCallback,
} from 'react';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useTranslation } from 'react-i18next';
import DragAccept from './DragAccept';

const HEIGHT = '5rem';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: HEIGHT,
        position: 'relative',
    },
    dragging: {
        boxSizing: 'border-box',
        borderColor: theme.palette.secondary.light,
        borderStyle: 'dashed',
        borderWidth: '3px',
    },
    buttonWrapper: {
        position: 'relative',
        zIndex: 1,
        background: 'white',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&>*': {
            margin: '0.25em',
        },
    },
    image: {
        height: '100%',
    },
}));

function CloudinaryUpload(): ReactElement {
    const [images, setImages] = useState<ImageListType>([]);
    const { t } = useTranslation();
    const classes = useStyles();

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
                dragProps,
                isDragging,
            }) => (
                <div className={classes.root}>
                    <div
                        className={classes.buttonWrapper}
                        onDragEnter={dragProps.onDragEnter}
                        onDragOver={dragProps.onDragOver}
                    >
                        {((): ReactElement => {
                            const image = imageList[0];

                            if (image) {
                                return (
                                    <img
                                        className={classes.image}
                                        src={image.dataURL}
                                        alt={t('previewImageAlt')}
                                    />
                                );
                            }
                            return <div />;
                        })()}
                        <Button
                            startIcon={<UploadIcon />}
                            variant="contained"
                            color="primary"
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            {t('upload')}
                        </Button>
                    </div>
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
