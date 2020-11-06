import React, { ReactElement, ReactChild } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export interface LabeledContainerProps {
    title: string;
    children: ReactChild;
}

function LabeledContainer({
    title,
    children,
}: LabeledContainerProps): ReactElement {
    return (
        <Grid container>
            <Grid
                item
                sm={2}
                xs={12}
            >
                <Typography
                    variant="h6"
                    align="left"
                >
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                sm={10}
                xs={12}
            >
                {children}
            </Grid>
        </Grid>
    );
}

export default LabeledContainer;
