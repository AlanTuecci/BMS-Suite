import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_DEV_API_URL
  : process.env.REACT_APP_API_URL_PROD;

axios.defaults.withCredentials = true;

export async function onLogin(loginData, userType) {
  console.log(API_URL)
  return await axios.post(`${API_URL}/${userType}/login`, loginData);
}

export async function onLogout() {
  return await axios.post(`${API_URL}/logout`);
}

export async function onRegistration(registrationData, userType) {
  return await axios.post(`${API_URL}/${userType}/register`, registrationData);
}

export async function onInviteEmployee(emailValue) {
  return await axios.post(`${API_URL}/company/inviteEmployee`, emailValue);
}

export async function onGetInvites() {
  return await axios.post(`${API_URL}/company/getAllInvites`);
}