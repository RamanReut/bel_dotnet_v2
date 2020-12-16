import React, { ReactElement, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { getTranslation } from '../../../share/translationContainer';
import { selectors, actions } from '../reducer';

export interface RemoveDialogProps {
    isOpen: boolean;
    id: number;
    onClose: () => void;
}

function RemoveDialog({
    isOpen,
    id,
    onClose,
}: RemoveDialogProps): ReactElement {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(['main', 'common']);
    const news = useSelector(selectors.news(id));
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteFulfilled = useCallback(
        () => enqueueSnackbar(t('removeDialog.success', { variant: 'success' })),
        [enqueueSnackbar, t],
    );

    const handleDeleteRejected = useCallback(
        () => enqueueSnackbar(t('removeDialog.fail'), { variant: 'error' }),
        [enqueueSnackbar, t],
    );

    const handleApply = useCallback(
        () => {
            dispatch(actions.news.deleteNews({
                id,
                onFulfilled: handleDeleteFulfilled,
                onRejected: handleDeleteRejected,
            }));
            onClose();
        },
        [dispatch, handleDeleteFulfilled, handleDeleteRejected, id, onClose],
    );

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogContent>
                {
                    news
                        ? t(
                            'removeDialog.message',
                            {
                                title: getTranslation(news.title, i18n.language),
                            },
                        )
                        : <div />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>
                    {t('removeDialog.remove')}
                </Button>
                <Button onClick={onClose}>
                    {t('common:cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveDialog;
