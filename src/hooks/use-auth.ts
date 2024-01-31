import { useContext } from 'react';
import { AuthContext } from '@/contexts';

export function useAuth () {
  const context = useContext(AuthContext);

  const {
    isAuthenticated,
    user,
    signIn,
    logout,
    verifyToken,
    saveAccessToken,
    isSignUpOpen,
    setIsSignUpOpen,
    accessToken
  } = context;

  return {
    isAuthenticated,
    user,
    signIn,
    logout,
    verifyToken,
    saveAccessToken,
    isSignUpOpen,
    setIsSignUpOpen,
    accessToken
  };
};