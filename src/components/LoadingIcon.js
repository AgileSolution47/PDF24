// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function LoadingIcon({ ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/loading.svg"
      height={40}
      {...other}
    />
  );
}
