

import React from 'react';
import { Link } from 'react-router-dom';








const Login = ({ setName, setPassword }) => {


    //change function names?
    const [userInfo, setuserInfo] = React.useState({
        userName: '',
        password: '',
    });

    const [login, setLogin] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [bestTime, setBestTime] = React.useState(0);

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

            <form id="userInfo" class="content=" name="userInfo" onSubmit={handleGetUserData}>
                <div class="form-content user">
                    <div class='form-item'>
                        <label for="givenName">username</label>
                        <input id="givenName" type="text" value={userInfo.userName}
                            onChange={e => setuserInfo({
                                ...userInfo,
                                userName: e.target.value
                            })}
                            name="givenName" placeholder="username" required />
                    </div>
                    <div class='form-item'>
                        <label for="password">password</label>
                        <input id="password" type="text" value={userInfo.password}
                            onChange={e => setuserInfo({
                                ...userInfo,
                                password: e.target.value
                            })}
                            name="surname" placeholder="password" required />
                    </div>
                    <button class='button confirm' id='confirm-button'>
                        <div class="lds-dual-ring"></div>
                Confirm<span id="seat-number"></span>
                    </button>
                </div>
            </form>
            {login ? <div><Link to='/game'> Successful Login: Start Game :)
            </Link><div> Your last score {bestTime}seconds </div></div> : <></>}
            {failed ? <div><Link to='/Signup'> Failed Login! Make sure you are signed up :) </Link></div> : <></>}


        </React.Fragment>



    )
}

export default Login;