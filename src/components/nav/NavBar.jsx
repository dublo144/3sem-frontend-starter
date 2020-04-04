import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const { isAuthenticated, signOut } = useAuth();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLoginLogOut = () => {
    return isAuthenticated ? (
      <Menu.Item position='right'>
        <Button
          content='My Page'
          icon='user'
          primary
          style={{ marginRight: '0.5em' }}
        />
        <Button onClick={signOut}>Log out</Button>
      </Menu.Item>
    ) : (
      <>
        <Menu.Item position='right'>
          <Button
            as={Link}
            to='/signup'
            primary
            style={{ marginRight: '0.5em' }}
          >
            Sign Up
          </Button>
          <Button as={Link} to='/login'>
            Log in
          </Button>
        </Menu.Item>
      </>
    );
  };

  return (
    <Menu>
      <Container>
        <Menu.Item as={NavLink} to='/' name='home'>
          Home
        </Menu.Item>

        <Menu.Item as={NavLink} to='/jokes' name='jokes'>
          Jokes
        </Menu.Item>
        {handleLoginLogOut()}
      </Container>
    </Menu>
  );
};

export default NavBar;
