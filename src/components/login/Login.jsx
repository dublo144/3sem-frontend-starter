import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = ({ message = 'Log-in to your account' }) => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const initialState = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(initialState);
  const { signIn, user } = useAuth();

  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(loginCredentials.username, loginCredentials.password);
    setLoginCredentials(initialState);
    history.replace(from);
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        {console.log(user)}
        <Header as='h2' color='blue' textAlign='center'>
          {message}
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              value={loginCredentials.username}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              id='password'
              onChange={handleChange}
              value={loginCredentials.password}
            />

            <Button onClick={handleLogin} color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New User? <Link to='/signup'>Sign up!</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
