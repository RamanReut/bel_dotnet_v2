import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { CloudinaryContext } from 'cloudinary-react';
import { SnackbarProvider } from 'notistack';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import { basicTheme } from './features/theme';
import './features/internalization';
import store from './features/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={basicTheme}>
                <SnackbarProvider>
                    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
                        <App />
                    </CloudinaryContext>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
