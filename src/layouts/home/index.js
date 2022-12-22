import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// material
import { useTheme } from '@material-ui/core/styles';

//
// hooks
import HomeNavbar from './HomeNavbar';
import HomeTopbar from './HomeTopbar';
import LandingFooter from './LandingFooter';
import LandingTryBottom from './LandingTryBottom';

// material
// ----------------------------------------------------------------------

HomeLayout.propTypes = {
  children: PropTypes.node
};

export default function HomeLayout({ children }) {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ height: '100%' }}>
        <HomeNavbar />
        <Box
          sx={{
            marginTop: '64px',
            [theme.breakpoints.up('md')]: {
              marginTop: '96px'
            }
          }}
        >
          <HomeTopbar />
          {children}
        </Box>
        <LandingFooter />
        <LandingTryBottom />
      </Box>
    </>
  );
}
