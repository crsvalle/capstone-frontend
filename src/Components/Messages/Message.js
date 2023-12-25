import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from '../../api/fetch'

const Message = ({ message }) => {
  const currentUser = useUserInfo();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

  }, [message]);


  const formatTime = (timestamp) => {
    const sentTimestampInSeconds = timestamp.seconds;
    const sentDate = new Date(sentTimestampInSeconds * 1000);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - sentDate;

    if (diffInMilliseconds < 60000) {
      return "just now";
    }

    const hours = sentDate.getHours();
    const minutes = sentDate.getMinutes();

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
  };


  console.log(message.date.seconds)
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === `${currentUser.id}` && "owner"}`}
    >
      <div className="messageInfo">
        {/* <img
          src={
            message.senderId === currentUser.id
              ? currentUser.photoURL
              : ''
          }
          alt=""
        /> */}
        <span>
          {message.date
            ? formatTime(message.date)
            : "just now"}
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
