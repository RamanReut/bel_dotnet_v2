import React from 'react';
import Fab from '@material-ui/core/Fab';
import ApplyIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';
import PreviewIcon from '@material-ui/icons/Subject';
import FabPanel from '../FabPanel';

export interface EditPageActionsProps {
    onApply: () => void;
    onCancel: () => void;
    onPreview: () => void;
}

export default function EditPageActions({
    onApply,
    onCancel,
    onPreview,
}: EditPageActionsProps): React.ReactElement {
    return (
        <FabPanel>
            <Fab
                color="primary"
                onClick={onPreview}
            >
                <PreviewIcon />
            </Fab>
            <Fab
                color="primary"
                onClick={onApply}
            >
                <ApplyIcon />
            </Fab>
            <Fab
                color="primary"
                onClick={onCancel}
            >
                <CancelIcon />
            </Fab>
        </FabPanel>
    );
}
