import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './features/Layout';
import './App.css';

function App(): React.ReactElement {
    return (
        <div className="App">
            <BrowserRouter>
                <Suspense fallback="loading...">
                    <Layout />
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
