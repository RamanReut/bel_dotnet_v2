import React, { ReactElement } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import HeaderedSection from '../HeaderedSection';
import HeaderedListElement, {
    HeaderedListElementProps,
} from './HeaderedListElement';

interface LoadMoreButtonProps {
    onClick: (() => void) | undefined;
}

function LoadMoreButton({ onClick }: LoadMoreButtonProps): ReactElement {
    const { t } = useTranslation();

    if (onClick) {
        return (
            <Button
                fullWidth
                onClick={onClick}
            >
                {t('loadMore')}
            </Button>
        );
    }
    return <div />;
}

interface LoadMoreProps {
    onClick: (() => void) | undefined;
    isLoading: boolean;
}

function LoadMore({
    onClick,
    isLoading,
}: LoadMoreProps): ReactElement {
    if (isLoading) {
        return <CircularProgress />;
    }
    return <LoadMoreButton onClick={onClick} />;
}

export interface HeaderedListProps {
    addLink: string;
    title: string;
    titleLink?: string;
    elements: HeaderedListElementProps[];
    onLoadMoreRequest?: () => void | undefined;
    isLoading?: boolean;
}

function HeaderedList({
    title,
    titleLink,
    elements,
    addLink,
    onLoadMoreRequest,
    isLoading,
}: HeaderedListProps): ReactElement {
    return (
        <HeaderedSection
            title={title}
            addLink={addLink}
            titleLink={titleLink}
        >
            <List>
                {elements.map((elem) => (
                    <HeaderedListElement
                        key={elem.link}
                        {...elem}
                    />
                ))}
            </List>
            <LoadMore
                onClick={onLoadMoreRequest}
                isLoading={isLoading as boolean}
            />
        </HeaderedSection>
    );
}

HeaderedList.defaultProps = {
    onLoadMoreRequest: undefined,
    isLoading: false,
};

export default HeaderedList;
