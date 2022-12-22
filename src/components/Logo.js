// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/logo.svg"
      width={210}
      height={50}
      {...other}
    />
  );
}
