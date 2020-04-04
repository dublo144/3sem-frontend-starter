import React from 'react';
import Login from '../login/Login';

const Unauthorized = () => {
  return (
    <>
      <Login message='Access denied - Please log in below' />
    </>
  );
};

export default Unauthorized;
