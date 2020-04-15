import React, { useState, useContext, useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { apiUtils } from '../utils/apiUtils';

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
// Returns the auth context..
export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [roles, setRoles] = useState(null);
  const [jwtToken, setJwtToken] = useState();
  const [name, setName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsAuthenticated(!!jwtToken);
  }, [jwtToken]);

  const signIn = async (username, password, from) => {
    const options = apiUtils.makeOptions('POST', {
      username: username,
      password: password
    });

    try {
      setIsLoading(true);
      const res = await apiUtils.fetchData('/login', options);
      setName(res.username);
      setJwtToken(res.token);
      setRoles(res.roles);
    } catch (error) {
      if (error.status) {
        error.fullError.then((e) => alert(e.message));
      } else {
        console.log('Network error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setName(null);
    setJwtToken(null);
    history.push('/');
  };

  const authenticateRole = (role) => {
    return isAuthenticated && roles.includes(role);
  };

  // Return isAuthenticated object and auth methods
  return {
    user: {
      name,
      authenticateRole,
      jwtToken,
      isAuthenticated
    },
    signIn,
    signOut,
    isLoading
  };
};

// In order to use the context, we have to provide it...
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default ProvideAuth;
