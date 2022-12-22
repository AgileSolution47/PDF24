import { useDispatch } from 'react-redux';
// redux
import { updateSchedule, sendingInviteEmail } from '../redux/slices/general';

// ----------------------------------------------------------------------

export default function useUserManage() {
  // JWT Auth
  const dispatch = useDispatch();

  return {
    // -------------- Send invite email ---------------------
    sendingInviteEmail: ({ emails }) =>
      dispatch(sendingInviteEmail({ emails })),
    // -------------- Update list ---------------------
    updateSchedule: ({ updatedSchedule }) =>
      dispatch(updateSchedule({ updatedSchedule }))
  };
}
