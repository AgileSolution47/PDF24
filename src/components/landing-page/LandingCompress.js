import React, { useState, useEffect } from 'react';
// material
import { makeStyles, experimentalStyled as styled } from '@material-ui/core/styles';
import { Stepper, Step, StepButton, Box, Grid, Container, Typography, CircularProgress } from '@material-ui/core';

// component
import { UploadSingleFile, CompressForm, DownloadForm } from './forms';

// utils
import axios from '../../utils/axios';

// config
import { PDF24Config } from '../../config';
// ----------------------------------------------------------------------

const steps = ['1. Upload your PDFs', '2. Choose compression', '3. Done'];
const PDF24_COMPRESS_URL = PDF24Config.compressUrl;
const PDF24_GET_STATUS_URL = PDF24Config.getStatusUrl;

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5)
  }
}));

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0)
}));

const LoadingStyle = styled('div')(() => ({
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  justifyContent: 'center'
  // backgroundColor: alpha(theme.palette.grey[900], 0.72)
}));

// ----------------------------------------------------------------------
export default function LandingCompress() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState('');
  const [jobId, setJobId] = useState('');
  const [success, setSuccess] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <UploadSingleFile value={null} onChange={(value) => handleSingleFile(value)} />;
      case 1:
        return (
          <CompressForm
            files={files}
            preview={preview}
            onDelete={() => handleDelete()}
            onCompress={(value) => handleCompress(value)}
          />
        );
      case 2:
        return <DownloadForm files={files} jobId={jobId} onRestart={() => handleRestart()} />;
      default:
        return <div>Not Found</div>;
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleSingleFile = (value) => {
    files.push(value.file);
    setPreview(value.preview);
    setActiveStep(1);
  };

  const handleDelete = () => {
    setFiles([]);
    setActiveStep(0);
  };

  const handleRestart = () => {
    setFiles([]);
    setActiveStep(0);
  };

  const handleCompress = async (value) => {
    setIsLoading(true);
    const formData = {
      files,
      dpi: value.dpi,
      imageQuality: value.imageQuality,
      mode: value.mode,
      colorModel: value.colorModel
    };

    await axios
      .post(PDF24_COMPRESS_URL, formData, {
        headers: { 'Content-Type': 'application/json', charset: 'UTF-8' }
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setJobId(response.data.jobId);
        }
      });
  };

  const stopHandler = () => {
    setIntervalID((interval) => {
      clearInterval(interval);
      setIsLoading(false);
      setActiveStep(2);
      return null;
    });
  };
  useEffect(() => {
    setIntervalID(
      setInterval(async () => {
        if (jobId) {
          await axios
            .get(`${PDF24_GET_STATUS_URL}&jobId=${jobId}`, {
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
              }
            })
            .then((response) => {
              console.log(response);
              setSuccess(true);
            });
        }
      }, 2000)
    );
  }, [jobId]);

  useEffect(() => {
    if (success && intervalID) {
      stopHandler();
    }
  }, [success, intervalID]);

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
                  color: '#000'
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
                PDF compressor to reduce the size of PDF files quickly and easily
              </Typography>
            </Box>
            <Box component="img" src="/static/home/pdf_tool.png" alt="pdf tool" />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                position: 'relative',
                ...(isLoading && {
                  pointerEvents: 'none',
                  opacity: '0.5'
                })
              }}
            >
              {isLoading && (
                <LoadingStyle>
                  <CircularProgress size={32} thickness={2.4} />
                </LoadingStyle>
              )}
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label, index) => (
                  <Step key={label} sx={{ padding: '6px 20px' }}>
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      sx={{
                        width: 'auto',
                        border: '1px solid #327FDE',
                        borderRadius: '30px',
                        padding: '8px 20px',
                        '& .MuiStepLabel-iconContainer': { display: 'none' },
                        '& .MuiStepLabel-label': {
                          color: '#327FDE !important',
                          fontSize: '13px !important',
                          fontWeight: '700 !important',
                          lineHeight: '15px !important'
                        },
                        '&.Mui-disabled': {
                          border: '1px solid #585858',
                          '& .MuiStepLabel-label': {
                            color: '#585858 !important'
                          }
                        }
                      }}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? <Box>Checkout Success</Box> : renderStepContent(activeStep)}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <Box component="img" src="/static/home/advertise.png" alt="pdf tool" />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
