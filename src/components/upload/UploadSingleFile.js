import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

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
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    flexDirection: 'row'
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

export default function UploadSingleFile({
  caption,
  error = false,
  value: file,
  onChange: setFile,
  sx,
  ...other
}) {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setFile({
          ...file,
          size: file.size,
          type: file.type,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
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

        <Box
          component="img"
          alt="select file"
          src="/static/illustrations/illustration_upload.svg"
          sx={{ height: 160 }}
        />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          {caption ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {caption}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Drop files here or click&nbsp;
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'primary.main' }}
              >
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          )}
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
  );
}
