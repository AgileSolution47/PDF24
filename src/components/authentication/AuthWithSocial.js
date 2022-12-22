import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Grid, Button, Divider, Typography } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleLoginGoogle}
          >
            <Icon icon={googleFill} color="#DF3E30" height={24} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleLoginFaceBook}
          >
            <Icon icon={facebookFill} color="#1877F2" height={24} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleLoginTwitter}
          >
            <Icon icon={twitterFill} color="#1C9CEA" height={24} />
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
