import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-dom';
import styled from 'styled-components';
import Engine from './components/Engine';

function App() {
  return (
    <StyledMainDiv>
      <StyledGameBoard>
        Intructions:

      </StyledGameBoard>
    </StyledMainDiv>

  );
}

export default App;

const StyledGameBoard = styled.div`

`

const StyledMainDiv = styled.div`
display: flex;
justify-content: flex-end;


`






