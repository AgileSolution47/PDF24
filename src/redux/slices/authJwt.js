import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

const slice = createSlice({
  name: 'authJwts',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/signin', {
      email,
      password
    });
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch(slice.actions.loginSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function register({ email, password, firstname, lastname }) {
  const data = {
    firstname,
    lastname,
    email,
    password
  };
  return async (dispatch) => {
    const response = await axios.post('/api/auth/signup', data);
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch(slice.actions.registerSuccess({ user }));
  };
}

export function resetPassword({ password, newPassword, newConfirmPassword }) {
  const data = {
    newPassword,
    newConfirmPassword,
    password
  };
  return async () => {
    await axios.post('/api/auth/resetPasword', data);
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/user/profile');
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: response.data.user
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
