import React, {
    ChangeEvent,
    ReactElement,
    useCallback,
    useState,
} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { DialogActions } from '@material-ui/core';
import CloudinaryUpload from '../CloudinaryUpload';
import { ImageData } from './imageInsertCommand';

interface Translation {
    title: string;
    saveButton: string;
    cancelButton: string;
}

interface MeasurementInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

function MeasurementInput({
    label,
    value,
    onChange,
}: MeasurementInputProps): ReactElement {
    const wrapChange = useCallback(
        (inpValue: number) => {
            if (inpValue >= 0) {
                onChange(inpValue);
            }
        },
        [onChange],
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const parseValue = parseInt(event.target.value || '0', 10);

            if (!Number.isNaN(parseValue)) {
                wrapChange(parseValue);
            }
        },
        [wrapChange],
    );

    return (
        <Grid
            item
            sm={6}
            xs={12}
        >
            <TextField
                type="number"
                label={label}
                value={`${value}`}
                onChange={handleChange}
            />
        </Grid>
    );
}

function cloudinaryImage() {
    const tester = /^!\[([\w ]*)\]\(([\w/]+)\|([\d]{0,4})x([\d]{0,4})\)$/g;
    console.log(tester.exec('![](bel_v2/hzhvrnkkzsoxmkia3gkj|400x500)'));
}

export interface ImageUploadProps {
    isOpen: boolean;
    onClose: () => void;
    saveChange: (image: ImageData) => void;
}

export default function ImageUpload({
    isOpen,
    onClose,
    saveChange,
}: ImageUploadProps): ReactElement {
    const { t } = useTranslation('markdownEditor');
    const translation: Translation = t('uploadImage', {
        returnObjects: true,
    });

    const [imageName, setImageName] = useState<string>('');
    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);

    const handleClose = useCallback(
        () => {
            setImageName('');
            setHeight(0);
            setWidth(0);
            onClose();
        },
        [onClose],
    );
    const handleApply = useCallback(
        () => {
            saveChange({
                image: imageName,
                height,
                width,
            });
            handleClose();
        },
        [height, imageName, saveChange, width, handleClose],
    );

    cloudinaryImage();

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{translation.title}</DialogTitle>
            <DialogContent>
                <CloudinaryUpload
                    image={imageName}
                    onChange={setImageName}
                />
                <Grid
                    container
                    spacing={2}
                >
                    <MeasurementInput
                        label="width"
                        value={width}
                        onChange={setWidth}
                    />
                    <MeasurementInput
                        label="height"
                        value={height}
                        onChange={setHeight}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>
                    {translation.saveButton}
                </Button>
                <Button onClick={handleClose}>
                    {translation.cancelButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
