// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';

import { fNumber } from '../../utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  background: '#327FDE'
}));

const RatingContentStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px'
}));

const RatingStarStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px'
}));

const ServiceContentStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px'
}));

const ServiceItemStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
  marginRight: '20px'
}));

const CheckIconStyle = styled('div')(() => ({
  width: '17px',
  height: '17px',
  background: '#ffffff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default function HomeTopbar() {
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
              <Box
                key={index}
                component="img"
                alt="moon"
                src="/static/home/star.svg"
                width={14}
                height={13}
              />
            ))}
          </RatingStarStyle>
          <Typography color="white" sx={{ py: 2, px: 1 }}>
            4.9
            <Typography variant="caption">({fNumber(8381)} votes)</Typography>
          </Typography>
        </RatingContentStyle>
        <ServiceContentStyle>
          <ServiceItemStyle>
            <CheckIconStyle>
              <Box
                component="img"
                alt="check"
                src="/static/home/check.svg"
                height={7}
              />
            </CheckIconStyle>
            <Typography
              variant="caption"
              sx={{
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '17px'
              }}
            >
              Free
            </Typography>
          </ServiceItemStyle>
          <ServiceItemStyle>
            <CheckIconStyle>
              <Box
                component="img"
                alt="check"
                src="/static/home/check.svg"
                height={7}
              />
            </CheckIconStyle>
            <Typography
              variant="caption"
              sx={{
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '17px'
              }}
            >
              Online
            </Typography>
          </ServiceItemStyle>
          <ServiceItemStyle>
            <CheckIconStyle>
              <Box
                component="img"
                alt="check"
                src="/static/home/check.svg"
                height={7}
              />
            </CheckIconStyle>
            <Typography
              variant="caption"
              sx={{
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '17px'
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
