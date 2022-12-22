// ----------------------------------------------------------------------

export const codes = {
  // Email
  emailAlreadyinUse: {
    code: 'auth/email-already-in-use',
    text: 'There already exists an account with the given email address.'
  },
  invalidEmail: {
    code: 'auth/invalid-email',
    text: 'The email address is not valid.'
  },
  businessEmail: {
    code: 'auth/business-email',
    text: 'Please enter a business email address, your email is not valid.'
  },
  userDisabled: {
    code: 'auth/user-disabled',
    text: 'The user corresponding to the given credential has been disabled.'
  },
  userNotFound: {
    code: 'auth/user-not-found',
    text: 'There is no user corresponding to the email address.'
  },

  // Password
  wrongPassword: {
    code: 'auth/wrong-password',
    text: 'Wrong password'
  },
  weakPassword: {
    code: 'auth/weak-password',
    text: 'Password should be at least 6 characters'
  }
};

const {
  emailAlreadyinUse,
  invalidEmail,
  businessEmail,
  userDisabled,
  userNotFound,
  wrongPassword,
  weakPassword
} = codes;

export function emailError(errors) {
  return {
    error:
      errors === emailAlreadyinUse.code ||
      errors === businessEmail.code ||
      errors === invalidEmail.code ||
      errors === userDisabled.code ||
      errors === userNotFound.code,
    helperText:
      (errors === emailAlreadyinUse.code && emailAlreadyinUse.text) ||
      (errors === businessEmail.code && businessEmail.text) ||
      (errors === invalidEmail.code && invalidEmail.text) ||
      (errors === userDisabled.code && userDisabled.text) ||
      (errors === userNotFound.code && userNotFound.text)
  };
}

export function passwordError(errors) {
  return {
    error: errors === wrongPassword.code || errors === weakPassword.code,
    helperText:
      (errors === wrongPassword.code && wrongPassword.text) ||
      (errors === weakPassword.code && weakPassword.text)
  };
}
