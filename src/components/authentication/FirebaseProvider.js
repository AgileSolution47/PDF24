import 'firebase/auth';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// redux
import { store } from '../../redux/store';
// hooks
import useAuth from '../../hooks/useAuth';
//
import { firebaseConfig } from '../../config';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

const ADMIN_EMAILS = ['test@thimble.com'];

// ----------------------------------------------------------------------

FirebaseProvider.propTypes = {
  children: PropTypes.node
};

export default function FirebaseProvider({ children }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getInitialize = async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user && isAuthenticated) {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set(
                {
                  role: ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user'
                },
                { merge: true }
              );
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    getInitialize();
  }, [isAuthenticated]);

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  );
}
