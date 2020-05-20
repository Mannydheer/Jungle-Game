import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Login = ({ bestTime, setBestTime, setName, setPassword }) => {


    //change function names?
    const [userInfo, setuserInfo] = React.useState({
        userName: '',
        password: '',
    });

    const [login, setLogin] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    //fetch to get speific user
    const handleGetUserData = (event) => {
        event.preventDefault();
        let loginUser = userInfo.userName;
        fetch(`http://localhost:4000/all/${loginUser}`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
            .then(data => {
                return data.json();
            })
            .then(user => {

                console.log(user)
                if (user === null || user.redirected === false) {
                    setFailed(true)
                    setLogin(false)
                }
                //why inverse?
                else if (user.username === userInfo.userName && user.password === userInfo.password) {
                    setLogin(true)
                    setFailed(false)
                    setBestTime(user.time)
                    setName(userInfo.userName)
                    setPassword(userInfo.password)
                }
            })
    }
    return (
        <React.Fragment>
            <StyledLogin>
                <form id="userInfo" class="content=" name="userInfo" onSubmit={handleGetUserData}>
                    <div class="form-content user">
                        <StyledItem class='form-item'>
                            <label for="givenName">Username</label>
                            <input id="givenName" type="text" value={userInfo.userName}
                                onChange={e => setuserInfo({
                                    ...userInfo,
                                    userName: e.target.value
                                })}
                                name="givenName" placeholder="username" required />
                        </StyledItem>
                        <StyledItem class='form-item'>
                            <label for="password">Password</label>
                            <input id="password" type="text" value={userInfo.password}
                                onChange={e => setuserInfo({
                                    ...userInfo,
                                    password: e.target.value
                                })}
                                name="surname" placeholder="password" required />
                        </StyledItem>
                        <Btn class='button confirm' id='confirm-button'>
                            Confirm
                        </Btn>
                    </div>
                </form>

            </StyledLogin>
            <StyledSuccess>
                <div>
                    {login ? <div> Successful Login: <Link to='/game'><StartBtn>Start Game</StartBtn></Link>
                        <div>Your last score {bestTime}seconds</div></div> : <></>}
                </div>
                <div>
                    {failed ? <div><Link to='/Signup'> Failed Login! Make sure you are signed up</Link></div> : <></>}
                </div>
            </StyledSuccess>
        </React.Fragment>



    )
}

export default Login;

const StyledLogin = styled.div`
display: flex;
justify-content: center;
font-size: 1.5em;
`

const StyledItem = styled.div`
font-weight: bold;
padding: 5px;
`

const Btn = styled.button`
background-color: black;
color: white;
border-radius: 25px;
font-size: 1em;
outline: none;
transition: 0.2s all ease;
margin-left: 30%;

&:hover {
    background-color: white;
    color: black;
    cursor: pointer;
}
`

const StartBtn = styled.button`
background-color: black;
color: white;
border-radius: 25px;
font-size: 1em;
outline: none;
transition: 0.2s all ease;

&:hover {
    background-color: white;
    color: black;
    cursor: pointer;
}
`
const StyledSuccess = styled.div`
text-align: center;
margin-top: 5%;
`