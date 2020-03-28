

import React from 'react';
import { Link } from 'react-router-dom';








const Signup = ({ setName }) => {


    const [userInfo, setuserInfo] = React.useState({
        userName: '',
        password: '',
    });

    const [signupPass, setsignupPass] = React.useState(false);


    const handleUserData = (event) => {
        event.preventDefault();


        const data = {
            username: userInfo.userName,
            password: userInfo.password
        }


        fetch('http://localhost:4000/handleSignup', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                if (data.status === 200) {
                    setName(userInfo.userName)
                    setsignupPass(true)
                }
            })
    }

    return (
        <React.Fragment>

            <form id="userInfo" class="content=" name="userInfo" onSubmit={handleUserData}>
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
            {signupPass ? <div><Link to='/'>Thanks for signing up! Click when you're ready to play!</Link></div> : <></>}

        </React.Fragment>



    )
}

export default Signup;

// ask them for user and pass.
    //form
        // input ...
        //onsubmit of the form...
    // POST action... FUNCTION call that will do a FETCH...post..
        //body... take the Data... user and the password.

// backend
    // trigger an end point...
    //triger a functiom
        //check if the user and password dont already exist. 
            //if they dont... 
        //error already exists.. status... try again.
        //if passes... it will call a function that will put the data in an object. (normally in a database)
        // it will not override...

        // [
        //     {
        //         username: '',
        //         password: '',
        //         Score: ''
        //     }
        // ]
        //but in 

        //additional part... set up connection in the databas.e 




