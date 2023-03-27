import { useState } from 'react';
import { canAutoLogIn, logIn, logOut } from '../lib/users';

/**
 * Provides boolean indicating whether the current credentials
 * are valid and functions to login and logout.
 * @returns {[boolean, (username: string, password: string)=>void, ()=>void]}
 */
const useCredentials = () => {
  const [areCredentialsValid, setAreValidCredentials] = useState(canAutoLogIn());

  const setLogIn = (username, password) => {
    setAreValidCredentials(logIn(username, password));
  };

  const setLogOut = () => {
    logOut();
    setAreValidCredentials(false);
  };

  return [areCredentialsValid, setLogIn, setLogOut];
};

export default useCredentials;
