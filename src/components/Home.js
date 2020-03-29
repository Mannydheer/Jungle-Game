import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = ({ name }) => {
    return (
        <StyledTitle>
            <StyledHeader>
                <h1> Welcome <strong>{name}</strong> to The Jungle!</h1>
                <h2>Collect as many bananas as possible! Be wary of the tigers guarding them 🐅 </h2>
                <StartButton><Link to='/game'>🌴 Start Game 🌴 </Link></StartButton>
                <h3>You can keep track of your score if you make an account!</h3>
            </StyledHeader>
        </StyledTitle>
    )

}
export default Home;
const StyledHeader = styled.header`
text-align: center;
font-size: 2em;

background-image: url(/jungle.jpg);
height: 100vh;
width: 100vw;
background-size: cover;
position: fixed;
background-repeat: no-repeat;

color: white;


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