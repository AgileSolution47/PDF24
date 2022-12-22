/* eslint-disable no-continue */
/* eslint-disable array-callback-return */
// import { useSelector } from 'react-redux';
import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  officeList: [],
  users: [],
  userList: [],
  managerList: [],
  followers: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(
        state.userList,
        (user) => user.id !== action.payload
      );
      state.userList = deleteUser;
    },

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;
// ----------------------------------------------------------------------

export function getProfile() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/profile');
      dispatch(slice.actions.getProfileSuccess(response.data.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/manage-users');
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/all');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Update
// ----------------------------------------------------------------------

export function updateProfile({
  prefferedname,
  jobtitle,
  departmentname,
  email,
  firstname,
  lastname,
  photoURL,
  roles,
  officeId,
  teamId
}) {
  const data = {
    prefferedname,
    jobtitle,
    departmentname,
    firstname,
    lastname,
    email,
    photoURL,
    roles,
    officeId,
    teamId
  };
  return async () => {
    await axios.post('/api/user/updateProfile', data);
  };
}
