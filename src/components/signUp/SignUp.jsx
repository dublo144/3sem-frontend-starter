import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SignUp = () => {
  const initialState = { username: '', password: '', confirmPassword: '' };
  const [signUpCredentials, setsignUpCredentials] = useState(initialState);

  const history = useHistory();

  const { signUp } = useAuth();

  const handleChange = (e) => {
    setsignUpCredentials({
      ...signUpCredentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(signUpCredentials.username, signUpCredentials.password);
    setsignUpCredentials(initialState);
    history.push('/');
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Join the party! Sign up below.
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
              value={signUpCredentials.username}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              id='password'
              onChange={handleChange}
              value={signUpCredentials.password}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              id='passwordConfirm'
              onChange={handleChange}
              value={signUpCredentials.confirmPassword}
            />

            <Button onClick={handleSignUp} color='blue' fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a User? <Link to='/login'>Log in!</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
