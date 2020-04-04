const setToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

const getToken = () => {
  return localStorage.getItem('jwtToken');
};

// TODO - Nuke isAuthenticated and replace with this.
const loggedIn = () => {
  const isLoggedIn = getToken() != null;
  return isLoggedIn;
};
const logout = () => {
  localStorage.removeItem('jwtToken');
};

export const authUtils = {
  setToken,
  getToken,
  loggedIn,
  logout
};
