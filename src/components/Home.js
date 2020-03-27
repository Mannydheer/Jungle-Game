import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
    return (
        <StyledTitle>
            <StyledHeader>
                <h1> Welcome to The Jungle!</h1>
                <h2>The goal is to collect as many bananas as possible! Be wary of the tigers guarding them 🐅 </h2>
                <StartButton><Link to='/game'>🌴 Start Game 🌴 </Link></StartButton>
            </StyledHeader>
        </StyledTitle>
    )

}
export default Home;
const StyledHeader = styled.header`
text-align: center;
font-size: 1em;
`
const StyledTitle = styled.div`
display: flex;
justify-content: center;
`

const StartButton = styled.button`
  font-size: 48px;
  outline: none;
  border-radius: 25px;
a {
    text-decoration: none;
    color: black;
}

&:hover {
    background-color: green;
    cursor: pointer;
    border-radius: 25px;
}

`