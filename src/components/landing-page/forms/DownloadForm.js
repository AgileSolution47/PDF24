import React from 'react';
import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';

// config
import { PDF24Config } from '../../../config';
// ----------------------------------------------------------------------
const PDF24_DOWNLOAD_URL = PDF24Config.downloadUrl;
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center'
}));

const DownloadAreaStyle = styled('div')(({ theme }) => ({
  width: '50%',
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
  minHeight: '242px',
  [theme.breakpoints.down('md')]: {
    width: '80%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

DownloadForm.propTypes = {
  files: PropTypes.array,
  jobId: PropTypes.string,
  onRestart: PropTypes.func
};
// ----------------------------------------------------------------------
export default function DownloadForm({ files, jobId, onRestart: submitRestart }) {
  const download = () => {
    const url = `${PDF24_DOWNLOAD_URL}&jobId=${jobId}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download.pdf';
    a.click();
  };

  const preview = () => {
    const url = `${PDF24_DOWNLOAD_URL}&jobId=${jobId}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
  };

  const handleDelete = () => {
    submitRestart();
  };

  const handleRestart = () => {
    submitRestart();
  };

  return (
    <RootStyle>
      <DownloadAreaStyle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '5px',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Box component="img" src="/static/home/download.svg" alt="download" width={28} height={35} />
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
            Your files are ready for download
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {files.map((file, index) => (
              <Typography key={index} variant="caption" sx={{ color: '#232323', fontSize: '13px' }}>
                {file.name}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '10px',
              py: '10px',
              borderBottom: '1px solid #c1c1c1'
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => download()}
              sx={{ px: 4, borderRadius: '5px', color: '#232323' }}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => preview()}
              sx={{ px: 4, borderRadius: '5px' }}
            >
              Preview
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '10px'
            }}
          >
            <Button
              variant="text"
              size="small"
              onClick={() => handleDelete()}
              sx={{ color: '#FF7272', display: 'flex', alignItems: 'center' }}
            >
              <Box component="img" src="/static/home/delete.svg" alt="delete" height={15} />
              <Typography variant="caption" sx={{ ml: '3px' }}>
                delete
              </Typography>
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => handleRestart()}
              sx={{ color: '#232323', display: 'flex', alignItems: 'center' }}
            >
              <Box component="img" src="/static/home/restart.svg" alt="restart" height={15} />
              <Typography variant="caption" sx={{ ml: '3px' }}>
                restart
              </Typography>
            </Button>
          </Box>
        </Box>
      </DownloadAreaStyle>
    </RootStyle>
  );
}
