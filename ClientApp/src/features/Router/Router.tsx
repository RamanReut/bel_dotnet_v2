import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Main = React.lazy(() => import('../Main'));

export default function Router(): React.ReactElement {
    return (
        <Switch>
            <Route path="/" exact>
                <Main />
            </Route>
        </Switch>
    );
}
