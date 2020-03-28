import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Engine from './components/Engine';
import EngineProvider from './components/Engine';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('')



  return (
    <BrowserRouter>
      <nav>
        <Link to='/login'>
          Login
        </Link>
        <Link to='/signup'>
          SignUp
        </Link>
      </nav>
      <Route exact path='/Signup'>
        <Signup setName={setName}></Signup>
      </Route>
      <Route exact path='/login'>
        <Login setName={setName} setPassword={setPassword}></Login>
      </Route>
      <Route exact path="/">
        <Home name={name}>
        </Home>
      </Route>
      <Route exact path="/game">
        <EngineProvider password={password} name={name}></EngineProvider>
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







