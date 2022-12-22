import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import roundAddAPhoto from '@iconify/icons-ic/round-add-a-photo';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  FormHelperText,
  CircularProgress
} from '@material-ui/core';
// utils
import { fData } from '../../utils/formatNumber';
import axios from '../../utils/axios';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
//
import { cloudinaryConfig } from '../../config';

// ----------------------------------------------------------------------

const CLOUDINARY_KEY = cloudinaryConfig.cloudinaryKey;
const CLOUDINARY_PRESET = cloudinaryConfig.cloudinaryPreset;
// const CLOUDINARY_URL = cloudinaryConfig.cloudinaryUrl;
const CLOUDINARY_URL = '/api/user/uploadAvatar';

const PHOTO_SIZE = 3145728; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const LoadingStyle = styled('div')(({ theme }) => ({
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.grey[900], 0.72)
}));

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    opacity: 0.72
  }
}));

// ----------------------------------------------------------------------

UploadAvatar.propTypes = {
  disabled: PropTypes.bool,
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default function UploadAvatar({
  disabled,
  caption,
  error = false,
  value: file,
  onChange: setFile,
  ...other
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const isMountedRef = useIsMountedRef();

  const handleDrop = useCallback(
    // eslint-disable-next-line consistent-return
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const checkSize = file.size < PHOTO_SIZE;
      const checkType = FILE_FORMATS.includes(file.type);

      if (!checkSize) {
        setIsError('size-invalid');
      }

      if (!checkType) {
        setIsError('type-invalid');
      }

      try {
        if (checkSize && checkType) {
          setIsLoading(true);
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folder', 'upload_minimal/avatar');
          formData.append('upload_preset', CLOUDINARY_PRESET);
          formData.append('api_key', CLOUDINARY_KEY);

          return await axios
            .post(CLOUDINARY_URL, formData, {
              headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
            .then((response) => {
              const { data } = response;
              const photoURL = `/static/uploads/${data.filename}`;
              if (isMountedRef.current) {
                setFile(photoURL);
                setIsLoading(false);
                setIsError(null);
              }
            });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isMountedRef, setFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    disabled
  });

  return (
    <>
      <RootStyle {...other}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            })
          }}
        >
          <input {...getInputProps()} />

          {isLoading && (
            <LoadingStyle>
              <CircularProgress size={32} thickness={2.4} />
            </LoadingStyle>
          )}

          {file && (
            <Box
              component="img"
              alt="avatar"
              src={file}
              sx={{ zIndex: 8, objectFit: 'cover' }}
            />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 }
              })
            }}
          >
            <Box
              component={Icon}
              icon={roundAddAPhoto}
              sx={{ width: 24, height: 24, mb: 1 }}
            />
            <Typography variant="caption">
              {file ? 'Update photo' : 'Upload photo'}
            </Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isError === 'size-invalid' && (
          <FormHelperText error>{`File is larger than ${fData(
            PHOTO_SIZE
          )}`}</FormHelperText>
        )}

        {isError === 'type-invalid' && (
          <FormHelperText error>
            File type must be *.jpeg, *.jpg, *.png, *.gif
          </FormHelperText>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 2,
          mb: 5,
          mx: 'auto',
          display: 'block',
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        {!caption ? (
          <>
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br /> Max size of {fData(PHOTO_SIZE)}
          </>
        ) : (
          caption
        )}
      </Typography>
    </>
  );
}
