import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import fileFill from '@iconify/icons-eva/file-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { motion, AnimatePresence } from 'framer-motion';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  Button,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
// utils
import { fData } from '../../utils/formatNumber';
//
import { MIconButton } from '../@material-extend';
import { varFadeInRight } from '../animate';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
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

UploadMultiFile.propTypes = {
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
  sx: PropTypes.object
};

export default function UploadMultiFile({
  caption,
  error = false,
  value: files,
  onChange: setFiles,
  sx,
  ...other
}) {
  const hasFile = files.length > 0;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemoveFile = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop: handleDrop
  });

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
          })
        }}
      >
        <input {...getInputProps()} />

        <Box
          component="img"
          alt="select file"
          src="/static/illustrations/illustration_upload.svg"
          sx={{ height: 160 }}
        />

        <Box
          sx={{
            p: 3,
            ml: { md: 2 }
          }}
        >
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
              <Link underline="always">browse</Link>&nbsp;thorough your machine
            </Typography>
          )}
        </Box>
      </DropZoneStyle>

      <List disablePadding sx={{ ...(hasFile && { my: 5 }) }}>
        <AnimatePresence>
          {files.map((file) => (
            <ListItem
              key={file.name}
              component={motion.div}
              {...varFadeInRight}
              sx={{
                my: 1,
                py: 0.5,
                px: 2,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
                bgcolor: 'background.paper'
              }}
            >
              <ListItemIcon>
                <Icon icon={fileFill} width={32} height={32} />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={fData(file.size)}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
              <ListItemSecondaryAction>
                <MIconButton
                  edge="end"
                  size="small"
                  onClick={() => handleRemoveFile(file)}
                >
                  <Icon icon={closeFill} />
                </MIconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </AnimatePresence>
      </List>

      {hasFile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            '& > *': { ml: 1.5 }
          }}
        >
          <Button onClick={handleRemoveAll} sx={{ mr: 1.5 }}>
            Remove all
          </Button>
          <Button variant="contained">Upload files</Button>
        </Box>
      )}
    </Box>
  );
}
