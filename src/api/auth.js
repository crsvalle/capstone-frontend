import axios from 'axios'
const API = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    `${API}/users/register`,
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post(`${API}/users/login`, loginData);
}

export async function onLogout() {
  return await axios.get(`${API}/users/logout`)
}

export async function fetchProtectedInfo() {
  return await axios.get(`${API}/users/protected`)
}