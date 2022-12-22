import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
// import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import { emailError } from '../../../utils/helpError';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  // const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: 'test@thimble.com'
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        // await resetPassword(values.email);
        if (isMountedRef.current) {
          onSent();
          onGetEmail(formik.values.email);
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          {...getFieldProps('email')}
          type="email"
          label="Email address"
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit).helperText
          }
          sx={{ mb: 3 }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          pending={isSubmitting}
        >
          Reset Password
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
