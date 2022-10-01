import React, { useState, useEffect } from "react";
import { BigHead } from "@bigheads/core";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    setCurrentUserImage(currentUser.avatarImage);
    setCurrentUserName(currentUser.username);
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  let avatarCurrentElements = currentUser.avatarImage.split(",");
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo"></img>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              let avatarElements = contact.avatarImage.split(",");
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
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
                    <h4>{contact.username}</h4>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="line"></div>
          <div className="current-user">
            <div className="avatar">
              <BigHead
                className="bigHead"
                skinTone={avatarCurrentElements[0]}
                eyes={avatarCurrentElements[1]}
                eyebrows={avatarCurrentElements[2]}
                mouth={avatarCurrentElements[3]}
                hair={avatarCurrentElements[4]}
                facialHair={avatarCurrentElements[5]}
                clothing={avatarCurrentElements[6]}
                accessory={avatarCurrentElements[7]}
                graphic={avatarCurrentElements[8]}
                hat={avatarCurrentElements[9]}
                body={avatarCurrentElements[10]}
                hairColor={avatarCurrentElements[11]}
                clothingColor={avatarCurrentElements[12]}
                circleColor={avatarCurrentElements[13]}
                lipColor={avatarCurrentElements[14]}
                hatColor={avatarCurrentElements[15]}
                faceMaskColor={avatarCurrentElements[16]}
                mask="blue"
                faceMask={false}
                lashes={avatarCurrentElements[19]}
              />
            </div>
            <div className="username">
              <h4>{currentUserName}</h4>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 65% 15%;
  overflow: hidden;
  background-color: rgb(20, 30, 60);
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  justify-content: center;
  max-width: 200px;
  min-width: 100px;
  .line {
    width: 90%;
    height: 3px;
    background-color: #9900e6;
    border-radius: 30px;
    margin-top: 10px;
  }
  .bigHead {
    height: 150px;
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    gap: 1rem;
    img {
      height: 5rem;
      margin: 10px;
    }
  }
  .contacts {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.1rem;
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
    .contact {
      background-color: rgb(75, 88, 129);
      cursor: pointer;
      border-radius: 5px;
      padding: 0.2rem;
      gap: 0.2rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      flex-direction: column;
      margin-top: 5px;
      justify-content: center;
      .bigHead {
        height: 95px;
      }
      .username {
        h4 {
          font-size: small;
        }
      }
    }
    .selected {
      background-color: #9c21b4;
    }
  }
  .current-user {
    margin-top: -80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bigHead {
      height: 100px;
      max-inline-size: 100%;
    }
  }
  @media (min-width: 380px) and (max-width: 640px) {
    max-width: 100px;
    .brand {
      img {
        margin: -5px;
        margin-bottom: 5px;
      }
    }
    .contacts {
      .contact {
        .bigHead {
          height: 65px;
        }
        .username {
          h4 {
            font-size: small;
          }
        }
      }
    }
    .line {
      width: 60%;
      margin-left: 25px;
    }
    .current-user {
      margin-top: -50px;

      .bigHead {
        height: 65px;
      }
      .username {
        h4 {
          font-size: smaller;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .line {
      margin-top: 40px;
    }
    .current-user {
      margin-top: -20px;
    }
  }
  @media (max-width: 380px) {
    max-width: 60px;
    .brand {
      img {
        height: 3rem;
        margin: -5px;
      }
    }
    .contacts {
      .contact {
        .bigHead {
          height: 45px;
        }
        .username {
          h4 {
            font-size: 50%;
          }
        }
      }
    }
    .current-user {
      margin-top: -50px;
      .bigHead {
        height: 55px;
      }
      .username {
        h4 {
          font-size: 50%;
        }
      }
    }
  }
`;
