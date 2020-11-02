import React, { ReactChild, ReactElement } from 'react';
import Loading from './Loading';
import NotLoad from './NotLoad';

interface LoadControlProps {
    children: ReactChild;
    isLoading?: boolean;
    isLoadSuccess?: boolean;
    onRefresh: () => void | undefined;
}

function LoadControl({
    children,
    isLoading,
    isLoadSuccess,
    onRefresh,
}: LoadControlProps): ReactElement {
    let res: ReactChild;

    if (isLoading) {
        res = <Loading />;
    } else if (!isLoading && isLoadSuccess) {
        res = children;
    } else {
        res = <NotLoad onRefresh={onRefresh} />;
    }

    return (
        <>
            {res}
        </>
    );
}

LoadControl.defaultProps = {
    isLoading: false,
    isLoadSuccess: true,
    onRefresh: undefined,
};

export default LoadControl;
