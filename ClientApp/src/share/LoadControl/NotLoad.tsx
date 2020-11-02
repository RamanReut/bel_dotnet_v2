import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

interface NotLoadProps {
    onRefresh?: () => void | undefined;
}

function NotLoad({
    onRefresh,
}: NotLoadProps): React.ReactElement {
    const { t } = useTranslation();
    const history = useHistory();

    const handleRefresh = useCallback(() => {
        history.go(0);
    }, [history]);

    return (
        <CenteredContainer>
            <div>
                {t('errorContentLoad') as string}
            </div>
            <IconButton onClick={onRefresh || handleRefresh}>
                <RefreshIcon />
            </IconButton>
        </CenteredContainer>
    );
}

NotLoad.defaultProps = {
    onRefresh: undefined,
};

export default NotLoad;
