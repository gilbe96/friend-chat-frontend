import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsersRoute, host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${getAllUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        setIsLoaded(true);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  if (isLoaded) {
    return (
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    );
  } else {
    return <></>;
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: rgb(41, 46, 61);
  color: whitesmoke;
  .container {
    border-radius: 20px;
    height: 85vh;
    width: 75vw;
    display: grid;
    grid-template-columns: 25% 75%;
    background-color: #1e1e2f;
    box-shadow: 2px 2px 25px black;
  }
  @media (max-width: 500px) {
    background-color: rgb(20, 30, 60);
    .container {
      height: 100vh;
      width: 100vw;
      gap: 0.5rem;
      box-shadow: 0px 0px 0px;
    }
  }
`;

export default Chat;
