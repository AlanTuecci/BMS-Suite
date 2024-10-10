import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL;

export async function onRegistration(registrationData) {
  return await axios.post(`${API_URL}/company/register`, registrationData);
}

export async function onLogin(loginData) {
  return await axios.post(`${API_URL}/company/login`, loginData);
}

export async function onLogout() {
  return await axios.post(`${API_URL}/logout`);
}