import React from "react";
import styled from "styled-components";

const Modal = () => {
  const handleYes = () => {
    window.location.reload();
  };

  return (
    <Wrapper>
      <div>You lost... Would you like to start over?</div>
      <button onClick={handleYes}>Restart?</button>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div`
  font-size: 24px;
  border-radius: 25px;
  padding: 5px;
  height: 200px;
  width: 200px;
  position: absolute;
  z-index: 1000;
  top: 40vh;
  left: 40vw;
  background-color: black;
  color: white;
  button {
    margin: 3px;
    &:hover {
      cursor: pointer;
    }
  }
`;
