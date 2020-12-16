import React, {
    ReactElement,
    useMemo,
    useCallback,
    useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { getTranslation } from '../../../share/translationContainer';
import HeaderedList from '../../../share/HeaderedList';
import { selectors, actions } from '../reducer';
import RemoveDialog from './RemoveDialog';

function News(): ReactElement {
    const { t, i18n } = useTranslation(['common', 'main']);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const news = useSelector(selectors.newsList);
    const isLoading = useSelector(selectors.isLoading);

    const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState<boolean>(false);
    const [removeNewsId, setRemoveNewsId] = useState<number>(0);

    const handleLoadMoreReject = useCallback(
        () => {
            enqueueSnackbar(t('loadError'), { variant: 'error' });
        },
        [enqueueSnackbar, t],
    );

    const handleLoadMore = useCallback(
        () => {
            dispatch(actions.news.getNews(handleLoadMoreReject));
        },
        [dispatch, handleLoadMoreReject],
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
            img: elem.preview,
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
