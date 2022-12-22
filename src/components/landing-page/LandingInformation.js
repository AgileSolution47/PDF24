// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography } from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/home/compress.svg',
    title: 'How to compress PDF files',
    description:
      'Select your PDF files which you would like to compress or drop them into the file box and start the compression. A few seconds later you can download your compressed PDF files.'
  },
  {
    icon: '/static/home/adjust.svg',
    title: 'Adjustable quality',
    description:
      'You can adjust the compression quality so that you can tune the compression algorithm in order to get a perfect result. PDF files with images can be compressed better than PDF files with text only.'
  },
  {
    icon: '/static/home/star_blue.svg',
    title: 'Easy to use',
    description:
      "PDF24 makes it as easy and fast as possible for you to compress your files. You don't need to install any software, you only have to select your files and start the compression."
  },
  {
    icon: '/static/home/computer.svg',
    title: 'Runs on your system',
    description:
      'The compression tool does not need any special system in order to compress your PDF files. The app is browser based and works under all operating systems.'
  },
  {
    icon: '/static/home/cloud.svg',
    title: 'No installation required',
    description:
      'You do not need to download and install any software. PDF files are compressed in the cloud on our servers. The app does not consume your system resources.'
  },
  {
    icon: '/static/home/lock.svg',
    title: 'Secure online compression',
    description:
      'The compression tool does not keep your files longer than necessary on our server. Your files and results will be deleted from our server after a short period of time.'
  }
];

const PLATFORMS = ['Windows', 'Linux', 'MAC', 'iPhone', 'Android'];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  },
  backgroundColor: '#EFF6FF'
}));

const CardStyle = styled(Card)(() => ({
  maxWidth: 315,
  minHeight: 175,
  margin: 'auto',
  padding: '1rem',
  textAlign: 'center',
  boxShadow: 'none',
  background: 'transparent',
  border: '1px solid #73B2FF',
  borderRadius: '5px'
}));

const CardContentStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: '5px'
}));

const CardHeaderStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: '5px'
}));

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  filter: shadowIcon(theme.palette.primary.main)
}));

const PlatformListStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '40px',
  display: 'flex',
  alignItems: 'center',
  columnGap: '20px',
  padding: theme.spacing(2, 4)
}));

const PlatformItemStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px'
}));

const CheckIconStyle = styled('div')(() => ({
  width: '17px',
  height: '17px',
  background: '#ffffff',
  borderRadius: '50%',
  border: '1px solid #327FDE',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const PoppinsRegular = "'PoppinsRegular', sans-serif";

// ----------------------------------------------------------------------

export default function LandingInformation() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: '10px', mt: '30px' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography
              align="center"
              sx={{
                fontSize: '1.7rem',
                fontWeight: '800',
                lineHeight: 1.2,
                color: '#000',
                fontFamily: PoppinsRegular
              }}
            >
              Information
            </Typography>
          </MotionInView>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '50px' }}>
          <PlatformListStyle>
            {PLATFORMS.map((item, index) => (
              <PlatformItemStyle key={index}>
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
                    color: '#585858',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '17px'
                  }}
                >
                  {item}
                </Typography>
              </PlatformItemStyle>
            ))}
          </PlatformListStyle>
        </Box>
        <Box
          sx={{
            pl: { lg: '100px', md: '50px', sm: '25px', xs: 0 },
            pr: { lg: '100px', md: '50px', sm: '25px', xs: 0 }
          }}
        >
          <Grid container spacing={4}>
            {CARDS.map((card) => (
              <Grid key={card.title} item xs={12} md={4}>
                <MotionInView variants={varFadeInUp}>
                  <CardStyle>
                    <CardContentStyle>
                      <CardHeaderStyle>
                        <Typography
                          variant="paragraph"
                          paragraph
                          sx={{
                            mb: 0,
                            fontSize: '16px',
                            fontWeight: 700,
                            lineHeight: '20px',
                            color: '#232323',
                            textAlign: 'left'
                          }}
                        >
                          {card.title}
                        </Typography>
                        <CardIconStyle src={card.icon} alt={card.title} />
                      </CardHeaderStyle>
                      <Typography
                        sx={{
                          color: '#69829E',
                          textAlign: 'left',
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: '19px'
                        }}
                      >
                        {card.description}
                      </Typography>
                    </CardContentStyle>
                    {/* <CardIconStyle src={card.icon} alt={card.title} />
                  <CardIconSubStyle
                    src="/static/home/accent.webp"
                    alt="small icon"
                  />
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{ color: 'text.primary', fontFamily: PoppinsLight }}
                  >
                    {card.description}
                  </Typography> */}
                  </CardStyle>
                </MotionInView>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
