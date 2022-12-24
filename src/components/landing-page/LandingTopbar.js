// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';

import { fNumber } from '../../utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  background: theme.palette.primary.dark,
  [theme.breakpoints.down('sm')]: {
    padding: '10px 0'
  }
}));

const RatingContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: '2px',
    justifyContent: 'center'
  }
}));

const RatingStarStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center'
  }
}));

const ServiceContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center'
  }
}));

const ServiceItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
  marginRight: '20px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '0px',
    columnGap: '5px'
  }
}));

const CheckIconStyle = styled('div')(({ theme }) => ({
  width: '17px',
  height: '17px',
  background: '#ffffff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '15px',
    height: '15px'
  }
}));

export default function HomeTopbar() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <RatingContentStyle>
          <RatingStarStyle>
            {[...Array(5)].map((_, index) => (
              <Box key={index} component="img" alt="moon" src="/static/home/star.svg" width={14} height={13} />
            ))}
          </RatingStarStyle>
          <Typography
            color="white"
            sx={{
              py: 2,
              px: 1,
              [theme.breakpoints.down('sm')]: {
                px: 0,
                py: 0,
                fontSize: '15px',
                lineHeight: '18px'
              }
            }}
          >
            4.9
            <Typography variant="caption">({fNumber(8381)} votes)</Typography>
          </Typography>
        </RatingContentStyle>
        <ServiceContentStyle>
          <ServiceItemStyle>
            <CheckIconStyle>
              <Box component="img" alt="check" src="/static/home/check.svg" height={7} />
            </CheckIconStyle>
            <Typography
              variant="caption"
              sx={{
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '17px',
                [theme.breakpoints.down('sm')]: {
                  lineHeight: '15px'
                }
              }}
            >
              Free
            </Typography>
          </ServiceItemStyle>
          <ServiceItemStyle>
            <CheckIconStyle>
              <Box component="img" alt="check" src="/static/home/check.svg" height={7} />
            </CheckIconStyle>
            <Typography
              variant="caption"
              sx={{
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '17px',
                [theme.breakpoints.down('sm')]: {
                  lineHeight: '15px'
                }
              }}
            >
              Online
            </Typography>
          </ServiceItemStyle>
          <ServiceItemStyle>
            <CheckIconStyle>
              <Box component="img" alt="check" src="/static/home/check.svg" height={7} />
            </CheckIconStyle>
            <Typography
              variant="caption"
              sx={{
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '17px',
                [theme.breakpoints.down('sm')]: {
                  lineHeight: '15px'
                }
              }}
            >
              No Limits
            </Typography>
          </ServiceItemStyle>
        </ServiceContentStyle>
      </Container>
    </RootStyle>
  );
}
