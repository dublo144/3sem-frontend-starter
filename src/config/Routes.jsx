import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import Jokes from '../components/jokes/Jokes';
import Login from '../components/login/Login';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import Unauthorized from '../components/unauthorized/Unauthorized';
import SignUp from '../components/signUp/SignUp';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <ProtectedRoute path='/jokes'>
        <Jokes />
      </ProtectedRoute>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/signup'>
        <SignUp />
      </Route>
      <Route path='/unauthorized'>
        <Unauthorized />
      </Route>
    </Switch>
  );
};

export default Routes;
