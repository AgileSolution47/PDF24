/* eslint-disable no-continue */
/* eslint-disable array-callback-return */
// import { useSelector } from 'react-redux';
import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  // get all user status by companyId
  companies: [],
  userList: [],
  insights: []
};

const slice = createSlice({
  name: 'superAdmin',
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

    // GET COMPANYLIST
    getCompanyListSuccess(state, action) {
      state.isLoading = false;
      state.companies = action.payload;
    },

    // GET USERLIST
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET USERLIST
    getInsightsListSuccess(state, action) {
      state.isLoading = false;
      state.insights = action.payload;
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
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow } = slice.actions;

// ----------------------------------------------------------------------
// Getting the Data
// ----------------------------------------------------------------------

export function getCompanyList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/superadmin/companies');
      dispatch(slice.actions.getCompanyListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/superadmin/allusers');
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getInsightsList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/superadmin/insights');
      dispatch(slice.actions.getInsightsListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
// Update
// ----------------------------------------------------------------------

export function updatePlan({ data }) {
  return async () => {
    await axios.post('/api/superadmin/updatePlan', data);
  };
}

export function updateIsManual({ manualData }) {
  const data = manualData;
  return async () => {
    await axios.post('/api/superadmin/updateIsManual', data);
  };
}
