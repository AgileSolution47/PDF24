import { useDispatch } from 'react-redux';
// redux
import { updatePlan, updateIsManual } from '../redux/slices/superAdmin';

// ----------------------------------------------------------------------

export default function useSuperAdmin() {
  // JWT Auth
  const dispatch = useDispatch();

  return {
    // -------------- Update list ---------------------
    updatePlan: ({ data }) => dispatch(updatePlan({ data })),
    updateIsManual: ({ manualData }) => dispatch(updateIsManual({ manualData }))
  };
}
