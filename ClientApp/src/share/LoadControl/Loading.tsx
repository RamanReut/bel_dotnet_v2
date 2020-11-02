import React from 'react';
import Progress from '@material-ui/core/CircularProgress';
import CenteredContainer from './CenteredContainer';

export default function Loading(): React.ReactElement {
    return (
        <CenteredContainer>
            <Progress />
        </CenteredContainer>
    );
}
