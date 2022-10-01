import React from "react";
import styled from "styled-components";
import Hello from "../assets/hello.gif";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Hello} alt="Hello" />
      <h1>
        Welcome <span>{currentUser.username} !</span>
      </h1>
      <h3>Select a contact to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  img {
    height: 15rem;
  }
  span {
    color: #7ec4e4;
  }
  @media (max-width: 450px) {
    img {
      height: 7rem;
    }
    h1,
    h3 {
      font-size: 80%;
    }
  }
`;
