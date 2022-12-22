import { useDispatch } from 'react-redux';
// redux
import {
  addOffice,
  deleteOffice,
  updateOfficeList,
  // team
  addTeam,
  deleteTeam,
  updateTeamList,
  // Organization
  updateOrganizations,
  addStatus,
  // Directory
  addMemberList,
  makeAdmin,
  deleteUser,
  // Payment
  createCheckoutSession,
  updatePaidStatus
} from '../redux/slices/adminSetting';
import { updateProfile } from '../redux/slices/user';

// ----------------------------------------------------------------------

export default function useUserManage() {
  // JWT Auth
  const dispatch = useDispatch();

  return {
    updateProfile: ({
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
    }) =>
      dispatch(
        updateProfile({
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
        })
      ),

    // -------------- Update list ---------------------
    updateOrganizations: ({ updatedOrg }) =>
      dispatch(updateOrganizations({ updatedOrg })),

    // -------------- Update list ---------------------
    updateOfficeList: ({ updatedOfficeList }) =>
      dispatch(updateOfficeList({ updatedOfficeList })),

    updateTeamList: ({ updatedTeamList }) =>
      dispatch(updateTeamList({ updatedTeamList })),
    // -------------- Deleting the data---------------------

    deleteOffice: ({ officeId }) => dispatch(deleteOffice({ officeId })),
    deleteTeam: ({ teamId }) => dispatch(deleteTeam({ teamId })),

    // -------------- Adding the data ---------------------

    addOffice: () => dispatch(addOffice()),
    addStatus: () => dispatch(addStatus()), // in Organization
    addTeam: () => dispatch(addTeam()),

    addMemberList: (memberList) => dispatch(addMemberList(memberList)), // in Directory by admin
    makeAdmin: (userId) => dispatch(makeAdmin(userId)), // in Directory by admin
    deleteUserList: (userId) => dispatch(deleteUser(userId)), // in Directory by admin

    createCheckoutSession: (payData) =>
      dispatch(createCheckoutSession(payData)), // in Directory by admin
    updatePaidStatus: (payData) => dispatch(updatePaidStatus(payData)) // in Directory by admin
  };
}
