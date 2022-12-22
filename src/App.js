import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// routes
import routes, { renderRoutes } from './routes';
// redux
import { store, persistor } from './redux/store';
// theme
import ThemeConfig from './theme';
// components
// import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import NotistackProvider from './components/NotistackProvider';
// ----------------------------------------------------------------------
import JwtProvider from './components/authentication/JwtProvider';

const history = createBrowserHistory();

export default function App() {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemeConfig>
            <RtlLayout>
              <NotistackProvider>
                <Router history={history}>
                  <JwtProvider>
                    {/* <Settings /> */}
                    <ScrollToTop />
                    {renderRoutes(routes)}
                  </JwtProvider>
                </Router>
              </NotistackProvider>
            </RtlLayout>
          </ThemeConfig>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  );
}
