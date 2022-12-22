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
  allStatus: [],
  allUsers: [],
  // calendar
  calendar: [],
  calendarList: []
};

const slice = createSlice({
  name: 'general',
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

    // GET CALENDAR
    getCalendarSuccess(state, action) {
      state.isLoading = false;
      state.calendar = action.payload;
    },

    // GET CALENDAR List
    getCalendarListSuccess(state, action) {
      state.isLoading = false;
      state.calendarList = action.payload;
    },

    // GET ALL USER STATUS BY COMPANY ID
    getAllStatusByIdSuccess(state, action) {
      state.isLoading = false;
      state.allStatus = action.payload;
    },

    // GET ALL USER STATUS BY COMPANY ID
    getUsersByCompanySuccess(state, action) {
      state.isLoading = false;
      state.allUsers = action.payload;
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

export function getCalendar() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/general/calendars');
      dispatch(slice.actions.getCalendarSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCalendarList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/general/calendar-lists');
      dispatch(slice.actions.getCalendarListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllStatusById() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/general/allstatus');
      dispatch(slice.actions.getAllStatusByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUsersByCompany() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/general/allusers');
      dispatch(slice.actions.getUsersByCompanySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// Update
// ----------------------------------------------------------------------

export function updateSchedule({ updatedSchedule }) {
  const data = updatedSchedule;
  return async () => {
    await axios.post('/api/general/updateSchedule', data);
  };
}

export function sendingInviteEmail({ emails }) {
  const data = emails;
  return async () => {
    await axios.post('/api/general/invite-emails', data);
  };
}
