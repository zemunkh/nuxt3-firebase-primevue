import {
  Timestamp
} from 'firebase/firestore';

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

import firebaseApp from './firebaseInit';
import { useFirestore } from './useFirestore';
export const useAuth = () => {
  const auth = getAuth(firebaseApp);
  const { db, set, get } = useFirestore();

  const fbAuthStateListener = async (callback) => {
    onAuthStateChanged(auth, async () => {
      const user = auth.currentUser;
      console.log('Auth state user: ', auth.currentUser);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // return user
        callback(user);
      } else {
        // User is signed out
        callback(null);
      }
    });
  };

  const fbCreateAccount = async (
    email,
    password,
    firstname,
    lastname,
    phone
  ) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response.user.uid) {
      console.log('Ok 🚀: ', response);
      await fbSetUserProfile(email, firstname, lastname, phone );
      const profile = await get('users', response.user.uid);
      return {
        user: response.user,
        profile,
      };
    } else {
      return {
        user: null,
        profile: null,
      };
    }
  };

  const fbSignIn = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  };
  
  const fbSignOut = async () => {
    await signOut(auth);
    return true;
  };

  const fbSetUserProfile = async (email, firstname, lastname, phone) => {
    const user = auth.currentUser;
    console.log('USER 🖖🏼: ', user.uid);
    const payload = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      userId: user.uid,
      createdOn: Timestamp.fromDate(new Date()),
    }
    await set('users', user.uid, payload)    
    return true;
  };

  const fbResetPassword = async (email) => {
    const response = await sendPasswordResetEmail(auth, email);
    return response
  }

  return {
    fbSignIn,
    fbSignOut,
    fbCreateAccount,
    fbAuthStateListener,
    fbResetPassword,
  }
}