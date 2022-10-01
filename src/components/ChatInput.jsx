import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "emoji-picker-element";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  let message = msg;

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded) {
      document
        .querySelector("emoji-picker")
        .addEventListener("emoji-click", (event) => {
          message += event.detail.unicode;
          setMsg(message);
        });
    }
  }, [isLoaded, message]);

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <emoji-picker className="dark" />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Write here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #a48cc273;
  padding: 0.5rem;
  padding-bottom: 0.3rem;
  border-radius: 10px;
  margin-right: 15px;
  margin-left: 5px;
  margin-top: -5px;
  .button-container {
    display: flex;
    align-items: center;
    color: whitesmoke;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #f0cd0a;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #e9fa02;
        }
      }
      emoji-picker {
        width: 400px;
        height: 300px;
        position: absolute;
        top: -350px;
        .picker {
          .tabpanel {
            ::-webkit-scrollbar {
              width: 10px;
              &-thumb {
                background-color: rgb(104, 104, 145);
                border-radius: 20px;
              }
              &-track {
                background: transparent;
              }
            }
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    input {
      width: 100%;
      background-color: transparent;
      color: whitesmoke;
      border: none;
      border-radius: 10px;
      padding-left: 0.5rem;
      font-size: 1.1rem;
      background-color: #257ac0;
      &::placeholder {
        color: #dac2c2;
      }
      &::selection {
        background-color: #55a0b3;
      }
      &focus {
        outline: none;
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #6600ff;
      box-shadow: 2px 6px 6px rgb(19, 16, 16);
      cursor: pointer;
      border: none;
      transition: 0.3s ease-in-out;
      svg {
        color: white;
        font-size: 120%;
      }
      &:hover {
        background-color: #b380ff;
      }
    }
  }
  @media (min-width: 480px) and (max-width: 1080px) {
    input {
      margin-left: 10px;
    }
  }
  @media (max-width: 610px) {
    .emoji {
      emoji-picker {
        width: 18rem !important;
        height: 50px;
        margin-left: -70px !important;
      }
    }
  }
  @media (max-width: 480px) {
    input {
      margin-left: 20px;
    }
  }
`;
