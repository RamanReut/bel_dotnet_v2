import React, {
    ReactElement,
    useMemo,
    useCallback,
    useState,
} from 'react';
import {
    useSelector,
} from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { getTranslation } from '../../../share/translationContainer';
import HeaderedList from '../../../share/HeaderedList';
import { useAppDispatch } from '../../store';
import {
    selectors,
    actions,
} from '../reducer';
import RemoveDialog from './RemoveDialog';

function News(): ReactElement {
    const { t, i18n } = useTranslation(['common', 'main']);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const news = useSelector(selectors.news.newsList);
    const isLoading = useSelector(selectors.news.isLoading);

    const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState<boolean>(false);
    const [removeNewsId, setRemoveNewsId] = useState<number>(0);

    const handleLoadMore = useCallback(
        () => {
            dispatch(actions.news.loadNewsMore())
                .then(unwrapResult)
                .catch(() => {
                    enqueueSnackbar(t('loadError'), { variant: 'error' });
                });
        },
        [dispatch, enqueueSnackbar, t],
    );

    const handleRemoveDialogClose = useCallback(
        () => setRemoveDialogIsOpen(false),
        [],
    );

    const handleOpenRemoveDialog = useCallback(
        (id) => {
            setRemoveNewsId(id);
            setRemoveDialogIsOpen(true);
        },
        [],
    );

    const newsListElements = useMemo(
        () => news.map((elem) => ({
            img: elem.previewImage,
            title: getTranslation<string>(elem.title, i18n.language),
            link: `/news/${elem.id}`,
            edit: `/editNews/${elem.id}`,
            remove: () => handleOpenRemoveDialog(elem.id),
        })),
        [handleOpenRemoveDialog, i18n.language, news],
    );

    return (
        <>
            <HeaderedList
                title={t('main:newsTitle')}
                elements={newsListElements}
                addLink="/editNews/new"
                isLoading={isLoading}
                onLoadMoreRequest={handleLoadMore}
            />
            <RemoveDialog
                isOpen={removeDialogIsOpen}
                id={removeNewsId}
                onClose={handleRemoveDialogClose}
            />
        </>
    );
}

export default News;
