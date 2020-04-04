import React, { useState, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { apiUtils } from '../utils/apiUtils';

const authContext = createContext();
const URL = 'http://localhost:8080/security_war_exploded';

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
// Returns the auth context..
export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [name, setName] = useState(null);

  const history = useHistory();

  const signIn = (username, password, from) => {
    const options = apiUtils.makeOptions('POST', true, {
      username: username,
      password: password
    });
    setisAuthenticated(true);
    // return fetch(`${URL}/api/login`, options)
    //   .then((res) => apiUtils.handleHttpErrors(res))
    //   .then((res) => {
    //     authUtils.setToken(res.token);
    //     authUtils.setRole(res.role);
    //     setisAuthenticated(true);
    //   })
    //   .catch((error) => {
    //     if (error.status) {
    //       error.fullError.then((e) => alert(e.message));
    //     } else {
    //       alert('Network error');
    //     }
    //   });
  };

  const signOut = () => {
    // authUtils.logout();
    setName(null);
    setJwtToken(null);
    setisAuthenticated(false);
    history.push('/');
  };

  const isLoggedIn = () => {
    return !!jwtToken;
  };

  // Return isAuthenticated object and auth methods
  return {
    user: {
      name,
      role,
      jwtToken,
      isLoggedIn
    },
    isAuthenticated,
    signIn,
    signOut
  };
};

// In order to use the context, we have to provide it...
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default ProvideAuth;
