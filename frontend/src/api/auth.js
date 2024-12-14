import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL_PROD;

axios.defaults.withCredentials = true;

export async function onLogin(loginData, userType) {
  console.log(API_URL);
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

export async function onGetEmployees() {
  return await axios.post(`${API_URL}/company/getAllEmployeeInfo`);
}

export async function onGetInventoryAccessControl(data) {
  return await axios.post(`${API_URL}/company/getAllInventoryAccessControl`, data);
}

export async function onGetLaborAccessControl(data) {
  return await axios.post(`${API_URL}/company/getAllLaborAccessControl`, data);
}

export async function onGetCashAccessControl(data) {
  return await axios.post(`${API_URL}/company/getAllCashAccessControl`, data);
}

export async function onAssignInventoryAccessControl(data) {
  return await axios.post(`${API_URL}/company/assignInventoryAccessControl`, data);
}

export async function onAssignLaborAccessControl(data) {
  return await axios.post(`${API_URL}/company/assignLaborAccessControl`, data);
}

export async function onAssignCashAccessControl(data) {
  return await axios.post(`${API_URL}/company/assignCashAccessControl`, data);
}

export async function onGetAllProductSKUs() {
  return await axios.post(`${API_URL}/company/getAllProductSKUs`);
}

export async function onAddProduct(productData) {
  return await axios.post(`${API_URL}/company/addProduct`, productData);
}