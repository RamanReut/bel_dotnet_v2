import React, { ReactElement, useCallback, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { DialogActions } from '@material-ui/core';
import CloudinaryUpload from '../CloudinaryUpload';

interface Translation {
    title: string;
    saveButton: string;
    cancelButton: string;
}

export interface ImageUploadProps {
    isOpen: boolean;
    onClose: () => void;
    saveChange: (image: string) => void;
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

    const handleApply = useCallback(
        () => {
            saveChange(imageName);
            onClose();
        },
        [imageName, onClose, saveChange],
    );

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{translation.title}</DialogTitle>
            <DialogContent>
                <CloudinaryUpload
                    image={imageName}
                    onChange={setImageName}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>
                    {translation.saveButton}
                </Button>
                <Button onClick={onClose}>
                    {translation.cancelButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
