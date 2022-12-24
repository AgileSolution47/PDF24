import { Outlet } from 'react-router-dom';
// material
import { Box } from '@material-ui/core';

// material
import { useTheme } from '@material-ui/core/styles';

//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import MainBottombar from './MainBottombar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const theme = useTheme();
  return (
    <>
      <MainNavbar />
      <Box
        sx={{
          marginTop: '64px',
          [theme.breakpoints.up('md')]: {
            marginTop: '96px'
          }
        }}
      >
        <Outlet />
      </Box>
      <MainFooter />
      <MainBottombar />
    </>
  );
}
