import axios from "axios";
import { BigHead } from "@bigheads/core";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { getAllMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  let avatarElements = currentChat.avatarImage.split(",");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(async () => {
    if (currentChat) {
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <BigHead
              className="bigHead"
              skinTone={avatarElements[0]}
              eyes={avatarElements[1]}
              eyebrows={avatarElements[2]}
              mouth={avatarElements[3]}
              hair={avatarElements[4]}
              facialHair={avatarElements[5]}
              clothing={avatarElements[6]}
              accessory={avatarElements[7]}
              graphic={avatarElements[8]}
              hat={avatarElements[9]}
              body={avatarElements[10]}
              hairColor={avatarElements[11]}
              clothingColor={avatarElements[12]}
              circleColor={avatarElements[13]}
              lipColor={avatarElements[14]}
              hatColor={avatarElements[15]}
              faceMaskColor={avatarElements[16]}
              mask="blue"
              faceMask={false}
              lashes={avatarElements[19]}
            />
          </div>
          <div className="username">
            <h4>{currentChat.username}</h4>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 0.5rem;
  margin-right: 5px;
  .chat-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;
    .user-details {
      flex-direction: column;
      display: flex;
      align-items: center;
      .bigHead {
        height: 85px;
      }
    }
  }
  .chat-messages {
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    height: 60vh;
    &::-webkit-scrollbar {
      width: 10px;
      &-thumb {
        background-color: rgb(104, 104, 145);
        border-radius: 20px;
      }
      &-track {
        background: transparent;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 80%;
        color: whitesmoke;
        overflow-wrap: break-word;
        padding: 0.5rem;
        font-size: 1.1rem;
        border-radius: 1rem;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #0d7e4f;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #2d1f7c;
      }
    }
  }

  @media (max-width: 500px) {
    .chat-messages {
      height: 76vh;
    }
  }

  @media (min-width: 0px) and (max-width: 380px) {
    flex-direction: column;
    gap: 0.5rem;
    .user-details {
      font-size: 70%;
      .bigHead {
        height: 55px;
      }
    }
    p {
      font-size: 80% !important;
    }
  }
`;
