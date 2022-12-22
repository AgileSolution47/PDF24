// material
import { Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function LandingTryBottom() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: '#EFF6FF',
        width: '100%',
        py: '10px'
      }}
    >
      <Typography
        variant="paragraph"
        align="center"
        sx={{
          color: '#69829E',
          fontSize: '13px',
          lineHeight: '19px',
          fontWeight: 400,
          mb: 0
        }}
      >
        © 2022 Geek Software GmbH — WE love PDF
      </Typography>
    </Container>
  );
}
