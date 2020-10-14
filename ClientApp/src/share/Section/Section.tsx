import React from 'react';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles({
    root: {
        margin: '0.75em 0',
    },
});

export type SectionProps = Omit<PaperProps, 'component'>;

function Section({
    className,
    classes,
    elevation,
    square,
    ...restProps
}: SectionProps): React.ReactElement {
    const extClasses = useStyles();

    return (
        <Paper
            component="section"
            classes={{
                ...classes,
                root: classnames(
                    extClasses.root,
                    className,
                    classes?.root,
                ),
            }}
            elevation={elevation || 6}
            square={square === undefined ? true : square}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
        />
    );
}

export default Section;
