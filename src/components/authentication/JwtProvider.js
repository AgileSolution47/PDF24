import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// redux
import { getInitialize } from '../../redux/slices/authJwt';

// ----------------------------------------------------------------------

JwtProvider.propTypes = {
  children: PropTypes.node
};

export default function JwtProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialize());
  }, [dispatch]);

  return <>{children}</>;
}
