import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import { getMode } from 'util/mode';
import { routes } from "pages/router";
import { getResourcesJson, getCurrentLocale } from "util/i18n";
import {Provider} from "react-redux";
import Loader from "components/loader";
import Toast from "components/toast";
import store from "util/store";

import './App.scss';
const theme = createTheme({
    palette: {
        mode: getMode(),
    },
});

i18next.init({
    interpolation: { escapeValue: false },
    lng: getCurrentLocale(),
    resources: getResourcesJson()
});

function App() {
    return (
        <I18nextProvider i18n={i18next}>
            <div className="QrMan">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Provider store={store}>
                        <Loader />
                        <Toast />
                        <BrowserRouter>
                            <Routes>
                                { routes }
                            </Routes>
                        </BrowserRouter>
                    </Provider>
                </ThemeProvider>
            </div>
        </I18nextProvider>
    );
}

export default App;
