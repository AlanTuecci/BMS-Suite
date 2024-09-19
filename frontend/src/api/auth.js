import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post("http://localhost:80/api/register", registrationData);
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:80/api/login", loginData);
}

export async function onLogout() {
  return await axios.post("http://localhost:80/api/logout");
}
