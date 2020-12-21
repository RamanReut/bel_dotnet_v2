import React, { ReactChild, ReactElement } from 'react';
import Loading from './Loading';
import NotLoad from './NotLoad';

export interface LoadControlProps {
    children: ReactChild;
    isLoading?: boolean;
    isLoadSuccess?: boolean;
    onRefresh: () => void | undefined;
}

function LoadControl({
    children,
    isLoading = false,
    isLoadSuccess = true,
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

export default LoadControl;
