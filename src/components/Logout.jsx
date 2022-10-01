import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #6600ff;
  color: white;
  cursor: pointer;
  border: none;
  transition: 0.3s ease-in-out;
  box-shadow: 2px 6px 6px rgb(19, 16, 16);
  font-size: 120%;
  &:hover {
    background-color: #b380ff;
  }
`;
