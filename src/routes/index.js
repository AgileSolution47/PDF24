import NProgress from 'nprogress';
import { Switch, Route } from 'react-router-dom';
import { Suspense, Fragment, lazy, useEffect, useMemo } from 'react';
// material
import { makeStyles } from '@material-ui/core/styles';
// components
import LoadingScreen from '../components/LoadingScreen';
// import Scrollbar from '../components/Scrollbar';
//
import HomeRoutes from './home.routes';

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles((theme) => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: '#2E2836'
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px #2E2836, 0 0 5px #2E2836`
      }
    }
  }
}));

function RouteProgress(props) {
  nprogressStyle();

  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return <Route {...props} />;
}

export function renderRoutes(routes = []) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;

          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  {/* <Scrollbar> */}
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                  {/* </Scrollbar> */}
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [
  // Others Routes
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('../views/Page404'))
  },

  // Home Routes
  HomeRoutes
];

export default routes;
