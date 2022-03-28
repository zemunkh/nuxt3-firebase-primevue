import {
  doc,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore/lite';

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
  const { db } = useFirestore();

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
    console.log(response);
    if (response) {
      await fbSetUserProfile({email, firstname, lastname, phone });
      const profile = await fbGetUserProfile();
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

  const fbGetUserProfile = async () => {
    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);
    const docSnap = await getDoc(ref);
  
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        uid: user.uid,
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!", user.uid);
      return null;
    }
  };
  const fbSetUserProfile = async ({email, firstname, lastname, phone}) => {
    const user = auth.currentUser;
    console.log(user);
  
    const ref = doc(db, "users", user.uid);
    await setDoc(
      ref,
      {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        userId: user.uid,
        createdOn: Timestamp.fromDate(new Date())
      },
      { merge: true }
    );
    return true;
  };

  const fbResetPassword = async (email) => {
    const response = await sendPasswordResetEmail(auth, email);
    return response
  }

  return {
    fbSignIn,
    fbSignOut,
    fbGetUserProfile,
    fbCreateAccount,
    fbAuthStateListener,
    fbResetPassword,
  }
}