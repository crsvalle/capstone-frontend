import React, { createContext, useReducer } from "react";
import { useUserInfo } from "../api/fetch"; // Import your custom authentication hook

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const currentUser = useUserInfo(); // Retrieve user information using your custom hook
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.id > action.payload.id
              ? currentUser.id + action.payload.id
              : action.payload.id + currentUser.id,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
