import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Engine from './components/Engine';
import EngineProvider from './components/Engine';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ScoreBoard from './components/ScoreBoard';

function App() {

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('')
  const [bestTime, setBestTime] = React.useState(0);




  return (
    <BrowserRouter>
      <StyledNav>
        <NavLink exact to="/" activeStyle={{ textDecoration: 'underline', color: 'white' }}>Home</NavLink>
        <NavLink exact to="/login" activeStyle={{ textDecoration: 'underline', color: 'white' }}>Login</NavLink>
        <NavLink exact to="/signup" activeStyle={{ textDecoration: 'underline', color: 'white' }}>Sign up</NavLink>
        <NavLink exact to="/scoreboard" activeStyle={{ textDecoration: 'underline', color: 'white' }}>ScoreBoard</NavLink>



      </StyledNav>
      <Route exact path='/Signup'>
        <Signup setName={setName}></Signup>
      </Route>
      <Route exact path='/login'>
        <Login bestTime={bestTime} setBestTime={setBestTime} setName={setName} setPassword={setPassword}></Login>
      </Route>
      <Route exact path="/">
        <Home name={name}>
        </Home>
      </Route>
      <Route exact path='/scoreboard'>
        <ScoreBoard></ScoreBoard>
      </Route>
      <Route exact path="/game">
        <EngineProvider password={password} name={name} bestTime={bestTime}></EngineProvider>
      </Route>

    </BrowserRouter>


  );
}

export default App;

const StyledNav = styled.nav`
background-color: black;
display: flex;
justify-content: space-evenly;
font-size: 1.5em;

padding: 0.5em;

a {
  color: white;
  text-decoration: none;
  padding: 5px;

  &:hover {
  transition: 5s black ease;
  background-color: green;
  border-radius: 25px;

}

}



`



