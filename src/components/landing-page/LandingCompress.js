// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0)
}));

const DropzoneAreaStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '250px',
  borderRadius: '7px',
  border: '1px dashed #327FDE',
  background: '#EFF6FF',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column'
}));

// ----------------------------------------------------------------------

export default function LandingCompress() {
  const theme = useTheme();
  const PoppinsRegular = "'PoppinsRegular', sans-serif";
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 5 }}>
              <Typography
                align="left"
                sx={{
                  fontSize: '1.7rem',
                  fontWeight: '800',
                  lineHeight: 1.2,
                  color: '#000',
                  fontFamily: PoppinsRegular
                }}
              >
                Compress PDF
              </Typography>
              <Typography
                align="left"
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: '#585858'
                }}
              >
                PDF compressor to reduce the size of PDF files quickly and
                easily
              </Typography>
            </Box>
            <Box
              component="img"
              src="/static/home/pdf_tool.png"
              alt="pdf tool"
            />
          </Grid>
          <Grid item xs={12}>
            <DropzoneAreaStyle>
              <Box
                sx={{ px: 2, display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography
                  sx={{
                    border: '1px solid #327FDE',
                    borderRadius: '30px',
                    padding: theme.spacing(1, 3),
                    fontSize: '13px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    color: '#327FDE'
                  }}
                >
                  1. Upload your PDFs
                </Typography>
                <Typography
                  sx={{
                    border: '1px solid #C1C1C1',
                    borderRadius: '30px',
                    padding: theme.spacing(1, 3),
                    fontSize: '13px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    color: '#C1C1C1'
                  }}
                >
                  2. Choose compression
                </Typography>
                <Typography
                  sx={{
                    border: '1px solid #C1C1C1',
                    borderRadius: '30px',
                    padding: theme.spacing(1, 3),
                    fontSize: '13px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    color: '#C1C1C1'
                  }}
                >
                  3. Done
                </Typography>
              </Box>
            </DropzoneAreaStyle>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
          >
            <Box
              component="img"
              src="/static/home/advertise.png"
              alt="pdf tool"
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
