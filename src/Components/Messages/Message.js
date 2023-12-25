import React, { useEffect, useRef } from "react";
import { useUserInfo } from '../../api/fetch'

const Message = ({ message }) => {
  const currentUser = useUserInfo();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

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
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
