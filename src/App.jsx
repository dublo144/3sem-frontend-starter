import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Routes from './config/Routes';
import NavBar from './components/nav/NavBar';
import ProvideAuth from './hooks/useAuth';

const App = () => {
  return (
    <>
      <HashRouter>
        <ProvideAuth>
          <NavBar />
          <Container>
            <Routes />
          </Container>
        </ProvideAuth>
      </HashRouter>
    </>
  );
};

export default App;
