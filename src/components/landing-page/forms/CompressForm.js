import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, Grid, Button, IconButton, Link } from '@material-ui/core';
import { Icon } from '@iconify/react';
import keyboardArrowUp from '@iconify/icons-ic/keyboard-arrow-up';
// ----------------------------------------------------------------------
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CARDS = [
  {
    title: 'Low',
    description: 'High quality, low compression',
    estimation: 'Estimated 100KB (-40%)'
  },
  {
    title: 'Recommended',
    description: 'Good quality, good compression',
    estimation: 'Estimated 80KB (-70%)'
  },
  {
    title: 'Extreme high',
    description: 'Less quality, low compression',
    estimation: 'Estimated 40KB (-90%)'
  }
];

const COMPRESSION_LEVEL = [
  {
    dpi: 144,
    imageQuality: 75,
    mode: 'low',
    colorModel: ''
  },
  {
    dpi: 144,
    imageQuality: 75,
    mode: 'normal',
    colorModel: ''
  },
  {
    dpi: 144,
    imageQuality: 75,
    mode: 'high',
    colorModel: ''
  }
];

const PreviewAreaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.primary.lighter,
  minHeight: '242px'
  // border: `1px dashed #327FDE`
}));

const PDFItemStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const CompressionAreaStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: theme.spacing(2)
}));

const CardStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #327FDE',
  borderRadius: '5px',
  overflow: 'hidden',
  background: '#ffffff',
  height: '100%',
  cursor: 'pointer',
  '&.active-card': {
    '& .card-header': {
      background: '#327fde',
      color: '#fff',
      '& .card-title': {
        color: '#ffffff'
      }
    },
    '& .card-content': {
      '& .card-estimation': {
        color: '#327fde'
      }
    }
  }
}));

const CardHeaderStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: theme.spacing(1),
  background: theme.palette.primary.lighter
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

const ArrowUpIconStyle = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30px',
  height: '30px',
  background: '#327fde',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff'
}));

const CardContentStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2, 3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
}));

const CompressButton = styled(Button)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  paddingLeft: '1rem',
  paddingRight: '1rem',
  textTransform: 'none',
  letterSpacing: '1px',
  color: '#EBF4F8',
  borderRadius: '5px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '1rem',
    fontSize: '13px',
    paddingRight: '1rem'
  }
}));

// const ColorSwitch = styled(Switch)(({ theme }) => ({
//   width: '42px',
//   height: '26px',
//   padding: 0,
//   margin: '8px'
// }));

CompressForm.propTypes = {
  files: PropTypes.array,
  preview: PropTypes.object,
  onDelete: PropTypes.func,
  onCompress: PropTypes.func
};

// ----------------------------------------------------------------------
export default function CompressForm({ files, preview, onDelete: submitDelete, onCompress: submitCompress }) {
  console.log('files', files);
  console.log('preview', preview);
  const theme = useTheme();
  const { name, size, path } = preview;
  const [activeId, setActiveId] = useState(1);

  const handleActiveItem = (id) => {
    setActiveId(id);
  };

  const handleDelete = () => {
    submitDelete();
  };
  const handleCompress = () => {
    const compressionLevel = COMPRESSION_LEVEL[activeId];
    submitCompress(compressionLevel);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <PreviewAreaStyle>
        <PDFItemStyle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link target="_blank" href={preview.path}>
              <IconButton color="primary" component="label">
                <Box component="img" src="/static/home/zoom.svg" alt="zoom" width={14} />
              </IconButton>
            </Link>

            <IconButton color="error" component="label" onClick={handleDelete}>
              <Box component="img" src="/static/home/delete.svg" alt="delete" width={14} />
            </IconButton>
          </Box>
          <Box sx={{ px: theme.spacing(4) }}>
            <Document file={path} className="d-flex justify-content-center">
              <Page pageNumber={1} width={200} />
            </Document>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ fontSize: '13px', fontWeight: 400, color: '#232323' }}>
              {name} ({size}KB)
            </Typography>
          </Box>
        </PDFItemStyle>
      </PreviewAreaStyle>
      <CompressionAreaStyle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm="auto" sx={{ width: '20%', [theme.breakpoints.down('sm')]: { display: 'none' } }}>
            <Box
              sx={{
                width: '100%',
                height: '55%',
                mt: '5%',
                borderLeft: '1px dashed #327FDE',
                borderBottom: '1px dashed #327FDE',
                borderBottomLeftRadius: '10px'
              }}
            />
          </Grid>
          <Grid item xs={12} sm="auto" sx={{ width: '60%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    variant="paragraph"
                    paragraph
                    sx={{
                      mb: 0,
                      fontSize: '16px',
                      fontWeight: 700,
                      lineHeight: '30px',
                      color: '#232323',
                      textAlign: 'left',
                      [theme.breakpoints.down('md')]: {
                        fontSize: '14px'
                      }
                    }}
                  >
                    Level of compression
                  </Typography>
                  <ArrowUpIconStyle>
                    <Icon icon={keyboardArrowUp} width={24} height={24} />
                  </ArrowUpIconStyle>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {CARDS.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <CardStyle
                        onClick={() => handleActiveItem(index)}
                        className={activeId === index ? 'active-card' : ''}
                      >
                        <CardHeaderStyle className="card-header">
                          {activeId === index ? (
                            <CheckIconStyle>
                              <Box component="img" alt="check" src="/static/home/check.svg" height={7} />
                            </CheckIconStyle>
                          ) : (
                            ''
                          )}

                          <Typography
                            variant="caption"
                            display="block"
                            className="card-title"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              color: '#232323'
                            }}
                          >
                            {card.title}
                          </Typography>
                        </CardHeaderStyle>
                        <CardContentStyle className="card-content">
                          <Typography
                            variant="body2"
                            display="block"
                            className="card-description"
                            sx={{
                              fontSize: '13px',
                              fontWeight: 400,
                              color: '#232323'
                            }}
                          >
                            {card.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            display="block"
                            className="card-estimation"
                            sx={{
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#585858'
                            }}
                          >
                            {card.estimation}
                          </Typography>
                        </CardContentStyle>
                      </CardStyle>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm="auto" sx={{ width: '20%', [theme.breakpoints.down('sm')]: { display: 'none' } }}>
            <Box
              sx={{
                width: '100%',
                height: '55%',
                mt: '5%',
                borderRight: '1px dashed #327FDE',
                borderBottom: '1px dashed #327FDE',
                borderBottomRightRadius: '10px'
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '60%', textAlign: 'center' }}>
              <CompressButton variant="contained" size="small" color="secondary" onClick={handleCompress}>
                Compress
              </CompressButton>
            </Box>
          </Grid>
        </Grid>
      </CompressionAreaStyle>
    </Box>
  );
}
