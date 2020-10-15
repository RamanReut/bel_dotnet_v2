import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Main = React.lazy(() => import('../Main'));
const EditNews = React.lazy(() => import('../EditNews'));

export default function Router(): React.ReactElement {
    return (
        <Switch>
            <Route path="/editNews/:id">
                <EditNews />
            </Route>
            <Route path="/" exact>
                <Main />
            </Route>
        </Switch>
    );
}
