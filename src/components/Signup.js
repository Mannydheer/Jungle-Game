import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Signup = ({ setName }) => {
  const [userInfo, setuserInfo] = React.useState({
    userName: "",
    password: "",
  });

  const [signupPass, setsignupPass] = React.useState(false);
  const [minLength, setminLength] = React.useState(false);
  const [error, setError] = React.useState(" ");
  const [registerSuccess, setregisterSuccess] = React.useState(" ");

  console.log(registerSuccess);

  const handleUserData = (event) => {
    event.preventDefault();
    const data = {
      username: userInfo.userName,
      password: userInfo.password,
    };
    fetch("http://localhost:4000/handleSignup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((recieved) => {
        console.log(recieved);

        //error handling.
        if (recieved.status === 401) {
          let splitWord = recieved.message.message
            .split(" ")
            .slice(6, 15)
            .join(" ");
          setminLength(true);
          setError(splitWord);
        }
        // // username error
        else if (recieved.status === 404) {
          setError(
            `Username '${recieved.message.keyValue.username}' already exists!`
          );
          setminLength(true);
        } else if (recieved.status === 200) {
          setsignupPass(true);
          setminLength(false);
          setregisterSuccess(`Your player Id: ${recieved.id}`);
        }
      });
  };

  return (
    <React.Fragment>
      <StyledLogin>
        <form
          id="userInfo"
          class="content="
          name="userInfo"
          onSubmit={handleUserData}
        >
          <div class="form-content user">
            <StyledItem class="form-item">
              <label for="givenName">Create username:</label>
              <input
                id="givenName"
                type="text"
                value={userInfo.userName}
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    userName: e.target.value,
                  })
                }
                name="givenName"
                placeholder="username"
                required
              />
            </StyledItem>
            <StyledItem class="form-item">
              <label for="password">Create password</label>
              <input
                id="password"
                type="text"
                value={userInfo.password}
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    password: e.target.value,
                  })
                }
                name="surname"
                placeholder="password"
                required
              />
            </StyledItem>
            <Btn class="button confirm" id="confirm-button">
              Sign up
            </Btn>
          </div>
        </form>
      </StyledLogin>
      <StyledSuccess>
        {signupPass && (
          <div>
            {registerSuccess}
            <div>
              <Link to="/">
                <StartBtn>
                  Thanks for signing up!Click when you're ready to play!
                </StartBtn>
              </Link>
            </div>
          </div>
        )}
        {minLength && <div> {error}</div>}
      </StyledSuccess>
    </React.Fragment>
  );
};

export default Signup;

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1.5em;
`;

const StyledItem = styled.div`
  font-weight: bold;
  padding: 5px;
`;

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
`;

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
`;

const StyledSuccess = styled.div`
  text-align: center;
  margin-top: 5%;
`;

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
