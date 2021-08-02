import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import Flex from './containers/Flex';

function App() {
  return (
    <Flex>
      <>
        <Router>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </Router>
      </>
    </Flex>
  );
}

export default App;
