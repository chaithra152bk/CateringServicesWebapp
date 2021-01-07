import './assets/plugins/css/plugins.css'
import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'babel-polyfill';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import * as configureStore from "./redux/store/configureStore.js";
import Router from './router';

const common_en = require('./translations/en/common.json');
const common_nb = require('./translations/nb/common.json');

const store = configureStore.configureStore();

const render = Component => {
    const lang = (language) => {
        i18next.init({
            interpolation: { escapeValue: false },
            lng: language,
            resources: {
                en: {
                    common: common_en
                },
                nb: {
                    common: common_nb
                }
            }
        });
    };

    ReactDOM.render(
        <I18nextProvider i18n={i18next}>
            <AppContainer>
                <Provider store={store}>
                    <Component lang={(value) => lang(value)} />
                </Provider>
            </AppContainer>
        </I18nextProvider>,
        document.getElementById('root')
    );
};

render(Router);

if (module.hot) {
    module.hot.accept('./router', () => {
        const NextRouter = require('./router').default;
        render(NextRouter);
    });
}


