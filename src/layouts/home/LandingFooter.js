// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Box,
  Container,
  Typography,
  Link
} from '@material-ui/core';
// ----------------------------------------------------------------------
// routes
import { varFadeInDown, MotionInView } from '../../components/animate';

const COLUMN1_TOOLS = [
  {
    title: 'Merge PDF',
    href: '/'
  },
  {
    title: 'Split PDF',
    href: '/'
  },
  {
    title: 'Compress PDF',
    href: '/'
  },
  {
    title: 'Edit PDF',
    href: '/'
  },
  {
    title: 'Sign PDF',
    href: '/'
  },
  {
    title: 'PDF Converter',
    href: '/'
  },
  {
    title: 'Convert to PDF',
    href: '/'
  }
];

const COLUMN2_TOOLS = [
  {
    title: 'Images to PDF',
    href: '/'
  },
  {
    title: 'PDF to Images',
    href: '/'
  },
  {
    title: 'Extract PDF Images',
    href: '/'
  },
  {
    title: 'Protect PDF',
    href: '/'
  },
  {
    title: 'Unlock PDF',
    href: '/'
  },
  {
    title: 'Rotate PDF pages',
    href: '/'
  },
  {
    title: 'Remove PDF pages',
    href: '/'
  }
];

const COLUMN3_TOOLS = [
  {
    title: 'Extract PDF pages',
    href: '/'
  },
  {
    title: 'Sort PDF pages',
    href: '/'
  },
  {
    title: 'Webpage to PDF',
    href: '/'
  },
  {
    title: 'Create PDF job application',
    href: '/'
  },
  {
    title: 'Create PDF with camera',
    href: '/'
  },
  {
    title: 'PDF OCR',
    href: '/'
  },
  {
    title: 'Add watermark',
    href: '/'
  }
];

const COLUMN4_TOOLS = [
  {
    title: 'Add page numbers',
    href: '/'
  },
  {
    title: 'View as PDF',
    href: '/'
  },
  {
    title: 'PDF Overlay',
    href: '/'
  },
  {
    title: 'Compare PDFs',
    href: '/'
  },
  {
    title: 'Web optimize PDF',
    href: '/'
  },
  {
    title: 'Annotate PDF',
    href: '/'
  },
  {
    title: 'Redact PDF',
    href: '/'
  }
];

const COLUMN5_TOOLS = [
  {
    title: 'Create PDF',
    href: '/'
  },
  {
    title: 'PDF 24 Creator',
    href: '/'
  },
  {
    title: 'PDF Printer',
    href: '/'
  },
  {
    title: 'PDF Reader',
    href: '/'
  },
  {
    title: 'Create Invoice',
    href: '/'
  },
  {
    title: 'Remove PDF metadata',
    href: '/'
  },
  {
    title: 'Flatten PDF',
    href: '/'
  }
];

const COLUMN6_TOOLS = [
  {
    title: 'Crop PDF',
    href: '/'
  }
];

const LINKS_TOP = [
  {
    title: 'About us',
    href: '/'
  },
  {
    title: 'Help',
    href: '/'
  },
  {
    title: 'Contact',
    href: '/'
  }
];

const LINKS_BOTTOM = [
  {
    title: 'Legal Notice',
    href: '/'
  },
  {
    title: 'Terms of use',
    href: '/'
  },
  {
    title: 'Privacy Policy',
    href: '/'
  },
  {
    title: 'Privacy Settings',
    href: '/'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const Links = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  columnGap: theme.spacing(3),
  width: '100%'
}));

const PoppinsRegular = "'PoppinsRegular', sans-serif";
// ----------------------------------------------------------------------

export default function LandingFooter() {
  const theme = useTheme();
  return (
    <RootStyle sx={{ position: 'relative' }}>
      <Container maxWidth="lg" sx={{ borderTop: '1px solid #327FDE' }}>
        <Box sx={{ mb: '10px', mt: '30px' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography
              align="left"
              sx={{
                fontSize: '1.7rem',
                fontWeight: '800',
                lineHeight: 1.2,
                color: '#000',
                fontFamily: PoppinsRegular,
                [theme.breakpoints.down('sm')]: {
                  textAlign: 'center'
                }
              }}
            >
              All tools
            </Typography>
          </MotionInView>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2} sx={{ pr: 0 }}>
            <Box
              sx={{
                borderRight: '1px solid #C1C1C1',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '8px',
                [theme.breakpoints.down('sm')]: {
                  borderRight: 'none'
                }
              }}
            >
              {COLUMN1_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  underline="hover"
                  sx={{
                    textAlign: 'left',
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    align="left"
                    sx={{
                      color: '#585858',
                      fontSize: '13px',
                      lineHeight: '19px',
                      fontWeight: 400,
                      mb: 1
                    }}
                  >
                    {tool.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ pr: 0 }}>
            <Box
              sx={{
                borderRight: '1px solid #C1C1C1',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '8px',
                [theme.breakpoints.down('sm')]: {
                  borderRight: 'none'
                }
              }}
            >
              {COLUMN2_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  underline="hover"
                  sx={{
                    textAlign: 'left',
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    align="left"
                    sx={{
                      color: '#585858',
                      fontSize: '13px',
                      lineHeight: '19px',
                      fontWeight: 400,
                      mb: 1
                    }}
                  >
                    {tool.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ pr: 0 }}>
            <Box
              sx={{
                borderRight: '1px solid #C1C1C1',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '8px',
                [theme.breakpoints.down('md')]: {
                  borderRight: 'none'
                }
              }}
            >
              {COLUMN3_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  underline="hover"
                  sx={{
                    textAlign: 'left',
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    align="left"
                    sx={{
                      color: '#585858',
                      fontSize: '13px',
                      lineHeight: '19px',
                      fontWeight: 400,
                      mb: 1
                    }}
                  >
                    {tool.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ pr: 0 }}>
            <Box
              sx={{
                borderRight: '1px solid #C1C1C1',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '8px',
                [theme.breakpoints.down('sm')]: {
                  borderRight: 'none'
                }
              }}
            >
              {COLUMN4_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  underline="hover"
                  sx={{
                    textAlign: 'left',
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    align="left"
                    sx={{
                      color: '#585858',
                      fontSize: '13px',
                      lineHeight: '19px',
                      fontWeight: 400,
                      mb: 1
                    }}
                  >
                    {tool.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ pr: 0 }}>
            <Box
              sx={{
                borderRight: '1px solid #C1C1C1',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '8px',
                [theme.breakpoints.down('sm')]: {
                  borderRight: 'none'
                }
              }}
            >
              {COLUMN5_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  underline="hover"
                  sx={{
                    textAlign: 'left',
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    align="left"
                    sx={{
                      color: '#585858',
                      fontSize: '13px',
                      lineHeight: '19px',
                      fontWeight: 400,
                      mb: 1
                    }}
                  >
                    {tool.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ pr: 0 }}>
            <Box
              sx={{
                borderRight: 'none',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '8px'
              }}
            >
              {COLUMN6_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  underline="hover"
                  sx={{
                    textAlign: 'left',
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    align="left"
                    sx={{
                      color: '#585858',
                      fontSize: '13px',
                      lineHeight: '19px',
                      fontWeight: 400,
                      mb: 1
                    }}
                  >
                    {tool.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Links sx={{}}>
              {LINKS_TOP.map((link) => (
                <Button
                  size="medium"
                  key={link.title}
                  href={link.href}
                  sx={{
                    color: '#C1C1C1',
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '19px'
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Links>
          </Grid>
          <Grid item xs={12}>
            <Links sx={{}}>
              {LINKS_BOTTOM.map((link) => (
                <Button
                  size="medium"
                  key={link.title}
                  href={link.href}
                  sx={{
                    color: '#C1C1C1',
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '19px'
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Links>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
