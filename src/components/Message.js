import React from "react";
import styled from "styled-components";

const Message = ({ timer }) => {
  const handleYes = () => {
    window.location.reload();
  };

  return (
    <Wrapper>
      <div>
        YOU WIN!!! Best time was {`${timer} seconds.`}
        <button onClick={handleYes}>Play again?</button>
      </div>
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div`
  font-size: 36px;
  border-radius: 25px;
  padding: 5px;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 500px;

  background-color: white;
  color: black;
  div button {
    font-size: 24px;
    margin: 3px;
    &:hover {
      cursor: pointer;
    }
  }
`;
