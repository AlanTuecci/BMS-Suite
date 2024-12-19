import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL_PROD;

axios.defaults.withCredentials = true;

export async function onAuth() {
  return await axios.post(`${API_URL}/auth`);
}

export async function onLogin(loginData, userType) {
  console.log(API_URL);
  return await axios.post(`${API_URL}/${userType}/login`, loginData);
}

export async function onTimeLogin(loginData) {
  return await axios.post(`${API_URL}/time/login`, loginData);
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

export async function onGetAllProductSKUs(userType) {
  return await axios.post(`${API_URL}/${userType}/getAllProductSKUs`);
}

export async function onAddProduct(productData) {
  return await axios.post(`${API_URL}/company/addProduct`, productData);
}

export async function onGetAllLatestProductCounts(userType) {
  return await axios.post(`${API_URL}/${userType}/getAllLatestProductCounts`);
}

export async function onGetProductCountHistory(userType, productSKU) {
  return await axios.post(`${API_URL}/${userType}/getProductCountHistory`, productSKU);
}

export async function onUpdateProductCounts(userType, updatedData) {
  return await axios.post(`${API_URL}/${userType}/updateProductCounts`, updatedData);
}

export async function onRecordProductCounts(userType, recordedData) {
  return await axios.post(`${API_URL}/${userType}/recordProductCounts`, recordedData);
}

export async function onDeleteProductCounts(userType, deleteData) {
  return await axios.delete(`${API_URL}/${userType}/deleteProductCounts`, { data: deleteData });
}

export async function onGetEmployeeIdsAndNames() {
  return await axios.post(`${API_URL}/time/getEmployeeIdsAndNames`);
}

export async function onCheckEmployeePin(employee_id, pin) {
  return await axios.post(`${API_URL}/time/checkEmployeePin`, employee_id, pin);
}

export async function onClockIn() {
  return await axios.post(`${API_URL}/time/clockIn`);
}

export async function onBreakStart() {
  return await axios.post(`${API_URL}/time/breakStart`);
}

export async function onBreakEnd() {
  return await axios.post(`${API_URL}/time/breakEnd`);
}

export async function onClockOut() {
  return await axios.post(`${API_URL}/time/clockOut`);
}

export async function onSignEmployeeOut() {
  return await axios.post(`${API_URL}/time/signEmployeeOut`);
}

export async function onUpdatePin(pin) {
  return await axios.post(`${API_URL}/employee/updatePin`, pin);
}

export async function getPastShifts() {
  return await axios.post(`${API_URL}/employee/getPastShifts`);
}

export async function onGetAllPastShifts(monthNum) {
  return await axios.post(`${API_URL}/company/getPastShifts`, { month_num: monthNum });
}

export async function onGetAllActiveShifts() {
  return await axios.post(`${API_URL}/company/getActiveShifts`);
}