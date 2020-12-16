import React, { Suspense, useRef, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Layout from './features/Layout';
import Router from './features/Router';
import './App.css';

const useStyles = makeStyles((theme) => ({
    snackbarCloseButton: {
        color: theme.palette.common.white,
    },
}));

function App(): React.ReactElement {
    const classes = useStyles();
    const snackbarProviderRef = useRef<SnackbarProvider>(null);

    const generateHandleClose = useCallback(
        (key) => () => snackbarProviderRef.current?.closeSnackbar(key),
        [],
    );

    return (
        <div className="App">
            <SnackbarProvider
                ref={snackbarProviderRef}
                action={
                    (key) => (
                        <IconButton
                            className={classes.snackbarCloseButton}
                            onClick={generateHandleClose(key)}
                        >
                            <CloseIcon />
                        </IconButton>
                    )
                }
            >
                <BrowserRouter>
                    <Suspense fallback="loading...">
                        <Layout>
                            <Router />
                        </Layout>
                    </Suspense>
                </BrowserRouter>
            </SnackbarProvider>
        </div>
    );
}

export default App;
