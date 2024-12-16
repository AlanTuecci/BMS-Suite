const { Router } = require("express");
const { logout, returnAllUserTypeAndPermissionLevels, timeSignEmployeeOut } = require("../controllers/auth");
const { employeeRegister, employeeLogin } = require("../controllers/employeeAuth");
const { employeeRegisterValidation, employeeLoginValidation } = require("../validators/auth");
const { companyRegisterValidation, companyLoginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations-middleware");
const { companyRegister, companyLogin } = require("../controllers/companyAuth");
const { getAllInvites } = require("../company_utilities/invite_data/getAllInvites");
const { inviteEmployee } = require("../company_utilities/invite_data/inviteEmployee");
const { getAllEmployeeInfo } = require("../company_utilities/employee_data/getAllEmployeeInfo");
const { deleteInvite } = require("../company_utilities/invite_data/deleteInvite");
const { getEmployeeById } = require("../company_utilities/employee_data/getEmployeeById");
const { assignLaborAccessControl } = require("../company_utilities/labor_data/assignLaborAccessControl");
const { assignCashAccessControl } = require("../company_utilities/cash_data/assignCashAccessControl");
const { assignInventoryAccessControl } = require("../company_utilities/inventory_data/assignInventoryAccessControl");
const { getEmployeeIdsAndNames } = require("../company_utilities/employee_data/getEmployeeIdsAndNames");
const { addProduct } = require("../company_utilities/inventory_data/addProduct");
const { getAllProductSKUs } = require("../shared_utilities/inventory_data/getAllProductSKUs");
const { getLatestProductCounts } = require("../shared_utilities/inventory_data/getLatestProductCounts");
const { recordProductCounts } = require("../shared_utilities/inventory_data/recordProductCounts");
const { updateProduct } = require("../company_utilities/inventory_data/updateProduct");
const { getProductCountHistory } = require("../shared_utilities/inventory_data/getProductCountHistory");
const { deleteProduct } = require("../company_utilities/inventory_data/deleteProduct");
const { getAllInventoryAccessControl } = require("../company_utilities/inventory_data/getAllInventoryAccessControl");
const { getAllLaborAccessControl } = require("../company_utilities/labor_data/getAllLaborAccessControl");
const { getAllCashAccessControl } = require("../company_utilities/cash_data/getAllCashAccessControl");
const { getAllProducts } = require("../shared_utilities/inventory_data/getAllProducts");
const { deleteProductCounts } = require("../shared_utilities/inventory_data/deleteProductCounts");
const { updateProductCounts } = require("../shared_utilities/inventory_data/updateProductCounts");
const { getAllLatestProductCounts } = require("../shared_utilities/inventory_data/getAllLatestProductCounts");
const { recordDeposit } = require("../shared_utilities/cash_deposits_data/recordDeposit");
const { updateDeposit } = require("../shared_utilities/cash_deposits_data/updateDeposit");
const { deleteDeposit } = require("../shared_utilities/cash_deposits_data/deleteDeposit");
const { getLatestDeposits } = require("../shared_utilities/cash_deposits_data/getLatestDeposits");
const { getLatestSafeCounts } = require("../shared_utilities/cash_safe_data/getLatestSafeCounts");
const { recordSafeCount } = require("../shared_utilities/cash_safe_data/recordSafeCount");
const { updateSafeCount } = require("../shared_utilities/cash_safe_data/updateSafeCount");
const { deleteSafeCount } = require("../shared_utilities/cash_safe_data/deleteSafeCount");
const { getInventoryAccessControlById } = require("../company_utilities/inventory_data/getInventoryAccessControlById");
const { getLaborAccessControlById } = require("../company_utilities/labor_data/getLaborAccessControlById");
const { getCashAccessControlById } = require("../company_utilities/cash_data/getCashAccessControlById");
const { timeLogin } = require("../controllers/timeAdminAuth");
const { timeUserAuth } = require("../middlewares/time-user-passport-middleware");
const { updatePin } = require("../employee_utilities/updatePin");
const { checkEmployeePin } = require("../time_utilities/checkEmployeePin");
const { clockIn } = require("../time_utilities/clockIn");
const { breakStart } = require("../time_utilities/breakStart");
const { breakEnd } = require("../time_utilities/breakEnd");
const { clockOut } = require("../time_utilities/clockOut");
const { userAuth } = require("../middlewares/auth-passport-middleware");
const { restrictAccess } = require("../controllers/restrictAccess");

const router = Router();

//--Auth Route
router.post("/auth", userAuth, returnAllUserTypeAndPermissionLevels);

//--Employee Routes
//----Signin/Signup Routes
router.post("/employee/register", employeeRegisterValidation, validationMiddleware, employeeRegister);
router.post("/employee/login", employeeLoginValidation, validationMiddleware, employeeLogin);
//----Time Management Routes
router.post("/employee/updatePin", userAuth, restrictAccess, updatePin);
//----Product Management Routes
//------Control 0 --> Read
router.post("/employee/getAllProducts", userAuth, restrictAccess, getAllProducts);
router.post("/employee/getAllProductSKUs", userAuth, restrictAccess, getAllProductSKUs);
router.post("/employee/getAllLatestProductCounts", userAuth, restrictAccess, getAllLatestProductCounts);
router.post("/employee/getLatestProductCounts", userAuth, restrictAccess, getLatestProductCounts);
router.post("/employee/getProductCountHistory", userAuth, restrictAccess, getProductCountHistory);
//------Control 1 --> Read, Insert
router.post("/employee/recordProductCounts", userAuth, restrictAccess, recordProductCounts);
//------Control 2 --> Read, Insert, Update
router.post("/employee/updateProductCounts", userAuth, restrictAccess, updateProductCounts);
//------Control 3 --> Read, Insert, Update, Delete
router.delete("/employee/deleteProductCounts", userAuth, restrictAccess, deleteProductCounts);
//----Cash Management Routes
//------Control 0 --> Read
router.post("/employee/getLatestDeposits", userAuth, restrictAccess, getLatestDeposits);
router.post("/employee/getLatestSafeCounts", userAuth, restrictAccess, getLatestSafeCounts);
//------Control 1 --> Read, Insert
router.post("/employee/recordDeposit", userAuth, restrictAccess, recordDeposit);
router.post("/employee/recordSafeCount", userAuth, restrictAccess, recordSafeCount);
//------Control 2 --> Read, Insert, Update
router.post("/employee/updateDeposit", userAuth, updateDeposit);
router.post("/employee/updateSafeCount", userAuth, updateSafeCount);
//------Control 3 --> Read, Insert, Update, Delete
router.delete("/employee/deleteDeposit", userAuth, deleteDeposit);
router.delete("/employee/deleteSafeCount", userAuth, deleteSafeCount);

//--Company Routes
//----Signin/Signup Routes
router.post("/company/register", companyRegisterValidation, validationMiddleware, companyRegister);
router.post("/company/login", companyLoginValidation, validationMiddleware, companyLogin);
//----Employee Invite Routes
router.post("/company/inviteEmployee", userAuth, restrictAccess, inviteEmployee);
router.post("/company/getAllInvites", userAuth, restrictAccess, getAllInvites);
router.delete("/company/deleteInvite", userAuth, restrictAccess, deleteInvite);
//----Employee Info Routes
router.post("/company/getAllEmployeeInfo", userAuth, restrictAccess, getAllEmployeeInfo);
router.post("/company/getEmployeeById", userAuth, restrictAccess, getEmployeeById);
router.post("/company/getEmployeeIdsAndNames", userAuth, restrictAccess, getEmployeeIdsAndNames);
//----Employee Access Control Routes
//------Inventory
router.post("/company/getAllInventoryAccessControl", userAuth, restrictAccess, getAllInventoryAccessControl);
router.post("/company/getInventoryAccessControlById", userAuth, restrictAccess, getInventoryAccessControlById);
router.post("/company/assignInventoryAccessControl", userAuth, restrictAccess, assignInventoryAccessControl);
//------Labor
router.post("/company/getAllLaborAccessControl", userAuth, restrictAccess, getAllLaborAccessControl);
router.post("/company/getLaborAccessControlById", userAuth, restrictAccess, getLaborAccessControlById);
router.post("/company/assignLaborAccessControl", userAuth, restrictAccess, assignLaborAccessControl);
//------Cash
router.post("/company/getAllCashAccessControl", userAuth, restrictAccess, getAllCashAccessControl);
router.post("/company/getCashAccessControlById", userAuth, restrictAccess, getCashAccessControlById);
router.post("/company/assignCashAccessControl", userAuth, restrictAccess, assignCashAccessControl);
//----Product Management Routes
//------Read
router.post("/company/getAllProducts", userAuth, restrictAccess, getAllProducts);
router.post("/company/getAllProductSKUs", userAuth, restrictAccess, getAllProductSKUs);
router.post("/company/getAllLatestProductCounts", userAuth, restrictAccess, getAllLatestProductCounts);
router.post("/company/getLatestProductCounts", userAuth, restrictAccess, getLatestProductCounts);
router.post("/company/getProductCountHistory", userAuth, restrictAccess, getProductCountHistory);
//------Read, Insert
router.post("/company/addProduct", userAuth, restrictAccess, addProduct);
router.post("/company/recordProductCounts", userAuth, restrictAccess, recordProductCounts);
//------Read, Insert, Update
router.post("/company/updateProduct", userAuth, restrictAccess, updateProduct);
router.post("/company/updateProductCounts", userAuth, restrictAccess, updateProductCounts);
//------Read, Insert, Delete
router.delete("/company/deleteProduct", userAuth, restrictAccess, deleteProduct);
router.delete("/company/deleteProductCounts", userAuth, restrictAccess, deleteProductCounts);
//----Cash Management Routes
//------Read
router.post("/company/getLatestDeposits", userAuth, restrictAccess, getLatestDeposits);
router.post("/company/getLatestSafeCounts", userAuth, restrictAccess, getLatestSafeCounts);
//------Read, Insert
router.post("/company/recordDeposit", userAuth, restrictAccess, recordDeposit);
router.post("/company/recordSafeCount", userAuth, restrictAccess, recordSafeCount);
//------Read, Insert, Update
router.post("/company/updateDeposit", userAuth, restrictAccess, updateDeposit);
router.post("/company/updateSafeCount", userAuth, restrictAccess, updateSafeCount);
//------Read, Insert, Update, Delete
router.delete("/company/deleteDeposit", userAuth, restrictAccess, deleteDeposit);
router.delete("/company/deleteSafeCount", userAuth, restrictAccess, deleteSafeCount);

//--Time Routes
router.post("/time/login", companyLoginValidation, validationMiddleware, timeLogin);
router.post("/time/checkEmployeePin", userAuth, checkEmployeePin);
router.post("/time/clockIn", userAuth, timeUserAuth, clockIn);
router.post("/time/breakStart", userAuth, timeUserAuth, breakStart);
router.post("/time/breakEnd", userAuth, timeUserAuth, breakEnd);
router.post("/time/clockOut", userAuth, timeUserAuth, clockOut);
router.post("/time/signEmployeeOut", timeSignEmployeeOut);
router.post("/time/getEmployeeIdsAndNames", userAuth, getEmployeeIdsAndNames);

router.post("/logout", logout);

module.exports = router;
