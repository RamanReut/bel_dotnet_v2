import React, {
    ReactElement,
    ReactChild,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 100,
        right: '1em',
        bottom: '1em',
    },
    hide: {
        display: 'none',
    },
});

export interface FloatingPanelProps {
    className?: string;
    isOpen?: boolean;
    children: ReactChild | ReactChild[];
}

function FloatingPanel({
    className,
    isOpen,
    children,
}: FloatingPanelProps): ReactElement {
    const classes = useStyles();

    return (
        <div
            className={classnames(
                classes.root,
                className,
                { [classes.hide]: !isOpen },
            )}
        >
            {children}
        </div>
    );
}

FloatingPanel.defaultProps = {
    className: undefined,
    isOpen: true,
};

export default FloatingPanel;
