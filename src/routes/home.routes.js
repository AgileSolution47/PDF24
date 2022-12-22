import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import HomeLayout from '../layouts/home';
// guards
// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: lazy(() => import('../views/LandingPage'))
    },
    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
