import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import Engine from './components/Engine';
import EngineProvider from './components/Engine';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home>
        </Home>
      </Route>
      <Route exact path="/game">
        <EngineProvider></EngineProvider>
      </Route>

    </BrowserRouter>


  );
}

export default App;

const StyledGameBoard = styled.div`

`

const StyledMainDiv = styled.div`
display: flex;
justify-content: flex-end;


`//     <BrowserRouter>

// <Route exact path='/'>
// <Home></Home>
// </Route>
// <Route exact path='/game'>
// <EngineProvider></EngineProvider>
// </Route>
// </BrowserRouter>







