import React, { ReactElement } from 'react';

interface MainProps {
    children?: ReactElement | ReactElement[];
}

function Main({ children }: MainProps): ReactElement {
    return <main>{children}</main>;
}

Main.defaultProps = {
    children: <div />,
};

export default Main;
