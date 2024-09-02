import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const SignOut: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;