import { auth } from './firebase'
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

export const signIn = () => {
  return signInWithPopup(auth, provider)
}

export const signOut = () => {
  return firebaseSignOut(auth)
}