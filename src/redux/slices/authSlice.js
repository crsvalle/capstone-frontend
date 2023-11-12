import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth');
  const id = localStorage.getItem('userId'); // Change 'userId' to the actual key
  const email = localStorage.getItem('email'); // Change 'email' to the actual key

  if (isAuth && JSON.parse(isAuth) === true) {
    return {
      isAuth: true,
      id,
      email,
    };
  }

  return {
    isAuth: false,
    id: null,
    email: null,
  };
}

const initialState = userAuthFromLocalStorage()

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      authenticateUser: (state) => {
        state.isAuth = true;
      },
      unauthenticateUser: (state) => {
        state.isAuth = false;
        state.id = null;
        state.email = null;
      },
      updateUserInfo: (state, action) => {
        const { id, email } = action.payload;
        state.id = id;
        state.email = email;
      },
    },
  });
  


export const { authenticateUser, unauthenticateUser, updateUserInfo } = authSlice.actions

export default authSlice.reducer