import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback, useEffect } from 'react';

import { Icon } from '@iconify/react';
import keyboardArrowDown from '@iconify/icons-ic/keyboard-arrow-down';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, Button, Divider, CircularProgress, FormHelperText } from '@material-ui/core';
// utils
import axios from '../../../utils/axios';

// config
import { PDF24Config } from '../../../config';

// ----------------------------------------------------------------------
const FILE_FORMATS = ['application/pdf'];
const PDF24_UPLOAD_URL = PDF24Config.uploadUrl;

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.primary.lighter,
  border: `1px dashed #327FDE`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    flexDirection: 'row'
  }
}));

const LoadingStyle = styled('div')(() => ({
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'center'
  // backgroundColor: alpha(theme.palette.grey[900], 0.72)
}));

const SelectButton = styled(Button)(({ theme }) => ({
  fontSize: '19px',
  fontWeight: 400,
  paddingLeft: '1rem',
  paddingRight: '1rem',
  textTransform: 'none',
  letterSpacing: '1px',
  color: '#232323',
  borderRadius: '5px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '1rem',
    fontSize: '13px',
    paddingRight: '1rem'
  }
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  sx: PropTypes.object
};

export default function UploadSingleFile({ error = false, value: file, onChange: setFile, sx, ...other }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleDrop = useCallback(
    // eslint-disable-next-line consistent-return
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const checkType = FILE_FORMATS.includes(file.type);

      if (!checkType) {
        setIsError('type-invalid');
      }

      if (checkType) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        await axios
          .post(PDF24_UPLOAD_URL, formData, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setFile({
                file: response.data[0],
                preview: {
                  name: file.name,
                  size: file.size,
                  path: URL.createObjectURL(file)
                }
              });
              setIsLoading(false);
              setIsError(null);
            }
          });

        // if (file) {
        //   setFile({
        //     ...file,
        //     preview: {
        //       name: file.name,
        //       size: file.size,
        //       path: URL.createObjectURL(file)
        //     }
        //   });
        // }
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: handleDrop,
    multiple: false
  });

  useEffect(
    () => () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    },
    [file]
  );

  return (
    <>
      <Box sx={{ width: '100%', ...sx }} {...other}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            }),
            ...(file && { padding: '12% 0' })
          }}
        >
          <input {...getInputProps()} />

          {isLoading && (
            <LoadingStyle>
              <CircularProgress size={32} thickness={2.4} />
            </LoadingStyle>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '8px'
            }}
          >
            <Box component="img" alt="select file" src="/static/home/page.svg" sx={{ width: '47px' }} />
            <SelectButton variant="contained" size="large" color="secondary">
              <Typography
                variant="caption"
                sx={{
                  fontSize: '19px',
                  fontWeight: 400,
                  color: '#232323'
                }}
              >
                Select files
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ background: '#232323', ml: 1, mr: 0.5 }} />
              <Icon icon={keyboardArrowDown} width={24} height={24} />
            </SelectButton>
            <Typography variant="body2" sx={{ color: '#585858', fontSize: '13px', fontWeight: 400 }}>
              or drag and drop file into this area&nbsp;
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '5px'
              }}
            >
              <Box component="img" alt="select file" src="/static/home/dropbox.png" sx={{ height: '10px' }} />
              <Box component="img" alt="select file" src="/static/home/google_drive.png" sx={{ height: '18px' }} />
            </Box>
          </Box>

          {file && (
            <Box
              component="img"
              alt="file preview"
              src={file.preview}
              sx={{
                top: 8,
                borderRadius: 1,
                objectFit: 'cover',
                position: 'absolute',
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)'
              }}
            />
          )}
        </DropZoneStyle>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isError === 'type-invalid' && <FormHelperText error>File type must be *.pdf</FormHelperText>}
      </Box>
    </>
  );
}
