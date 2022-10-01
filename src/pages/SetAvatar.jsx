import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";
import RandomAvatar from "../components/RandomAvatar";

export default function SetAvatar() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    }
  }, []);

  const getOther = () => {
    navigate("/setAvatar");
  };

  const setProfilePicture = async () => {
    const properties = document.getElementById("properties").value;
    const user = await JSON.parse(localStorage.getItem("chat-user"));
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: properties,
    });
    user.isAvatarImageSet = true;
    user.avatarImage = properties;
    console.log(properties);
    localStorage.setItem("chat-user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
          <div className="avatars">
            <RandomAvatar />
          </div>
          <button onClick={getOther}> Other </button>
          <button onClick={setProfilePicture}>Confirm</button>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  background-color: rgb(41, 46, 61);
  height: 100vh;
  width: 100vw;
  .title-container {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    h1 {
      margin-top: 2rem;
      color: whitesmoke;
    }
    .avatars {
      width: 100%;
      display: flex;
      margin: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      svg {
        height: 250px;
        &:hover {
          cursor: pointer;
        }
      }
      .selected {
        border-style: dotted;
        border-color: #cc00cc;
      }
    }
    button {
      background-color: #6600ff;
      color: whitesmoke;
      padding: 1rem 2rem;
      margin: 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 10px;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #b380ff;
      }
    }
  }
`;
