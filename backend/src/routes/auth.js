const { Router } = require("express");
const { logout } = require("../controllers/auth");
const { employeeRegister, employeeLogin } = require("../controllers/employeeAuth");
const { employeeRegisterValidation, employeeLoginValidation } = require("../validators/auth");
const { companyRegisterValidation, companyLoginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations-middleware");
const { employeeUserAuth } = require("../middlewares/employee-passport-middleware");
const { companyUserAuth } = require("../middlewares/company-passport-middleware");
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

const router = Router();

//--Employee Routes
//----Signin/Signup Routes
router.post("/employee/register", employeeRegisterValidation, validationMiddleware, employeeRegister);
router.post("/employee/login", employeeLoginValidation, validationMiddleware, employeeLogin);
//----Product Management Routes
//------Control 0 --> Read
router.post("/employee/getAllProducts", employeeUserAuth, getAllProducts);
router.post("/employee/getAllProductSKUs", employeeUserAuth, getAllProductSKUs);
router.post("/employee/getAllLatestProductCounts", employeeUserAuth, getAllLatestProductCounts);
router.post("/employee/getLatestProductCounts", employeeUserAuth, getLatestProductCounts);
router.post("/employee/getProductCountHistory", employeeUserAuth, getProductCountHistory);
//------Control 1 --> Read, Insert
router.post("/employee/recordProductCounts", employeeUserAuth, recordProductCounts);
//------Control 2 --> Read, Insert, Update
router.post("/employee/updateProductCounts", employeeUserAuth, updateProductCounts);
//------Control 3 --> Read, Insert, Update, Delete
router.delete("/employee/deleteProductCounts", employeeUserAuth, deleteProductCounts);
//----Cash Management Routes
//------Control 0 --> Read
router.post("/employee/getLatestDeposits", employeeUserAuth, getLatestDeposits);
router.post("/employee/getLatestSafeCounts", employeeUserAuth, getLatestSafeCounts);
//------Control 1 --> Read, Insert
router.post("/employee/recordDeposit", employeeUserAuth, recordDeposit);
router.post("/employee/recordSafeCount", employeeUserAuth, recordSafeCount);
//------Control 2 --> Read, Insert, Update
router.post("/employee/updateDeposit", employeeUserAuth, updateDeposit);
router.post("/employee/updateSafeCount", employeeUserAuth, updateSafeCount);
//------Control 3 --> Read, Insert, Update, Delete
router.delete("/employee/deleteDeposit", employeeUserAuth, deleteDeposit);
router.delete("/employee/deleteSafeCount", employeeUserAuth, deleteSafeCount);

//--Company Routes
//----Signin/Signup Routes
router.post("/company/register", companyRegisterValidation, validationMiddleware, companyRegister);
router.post("/company/login", companyLoginValidation, validationMiddleware, companyLogin);
//----Employee Invite Routes
router.post("/company/inviteEmployee", companyUserAuth, inviteEmployee);
router.post("/company/getAllInvites", companyUserAuth, getAllInvites);
router.delete("/company/deleteInvite", companyUserAuth, deleteInvite);
//----Employee Info Routes
router.post("/company/getAllEmployeeInfo", companyUserAuth, getAllEmployeeInfo);
router.post("/company/getEmployeeById", companyUserAuth, getEmployeeById);
router.post("/company/getEmployeeIdsAndNames", companyUserAuth, getEmployeeIdsAndNames);
//----Employee Access Control Routes
//------Inventory
router.post("/company/getAllInventoryAccessControl", companyUserAuth, getAllInventoryAccessControl);
router.post("/company/getInventoryAccessControlById", companyUserAuth, getInventoryAccessControlById);
router.post("/company/assignInventoryAccessControl", companyUserAuth, assignInventoryAccessControl);
//------Labor
router.post("/company/getAllLaborAccessControl", companyUserAuth, getAllLaborAccessControl);
router.post("/company/getLaborAccessControlById", companyUserAuth, getLaborAccessControlById);
router.post("/company/assignLaborAccessControl", companyUserAuth, assignLaborAccessControl);
//------Cash
router.post("/company/getAllCashAccessControl", companyUserAuth, getAllCashAccessControl);
router.post("/company/getCashAccessControlById", companyUserAuth, getCashAccessControlById);
router.post("/company/assignCashAccessControl", companyUserAuth, assignCashAccessControl);
//----Product Management Routes
//------Read
router.post("/company/getAllProducts", companyUserAuth, getAllProducts);
router.post("/company/getAllProductSKUs", companyUserAuth, getAllProductSKUs);
router.post("/company/getAllLatestProductCounts", companyUserAuth, getAllLatestProductCounts);
router.post("/company/getLatestProductCounts", companyUserAuth, getLatestProductCounts);
router.post("/company/getProductCountHistory", companyUserAuth, getProductCountHistory);
//------Read, Insert
router.post("/company/addProduct", companyUserAuth, addProduct);
router.post("/company/recordProductCounts", companyUserAuth, recordProductCounts);
//------Read, Insert, Update
router.post("/company/updateProduct", companyUserAuth, updateProduct);
router.post("/company/updateProductCounts", companyUserAuth, updateProductCounts);
//------Read, Insert, Delete
router.delete("/company/deleteProduct", companyUserAuth, deleteProduct);
router.delete("/company/deleteProductCounts", companyUserAuth, deleteProductCounts);
//----Cash Management Routes
//------Read
router.post("/company/getLatestDeposits", companyUserAuth, getLatestDeposits);
router.post("/company/getLatestSafeCounts", companyUserAuth, getLatestSafeCounts);
//------Read, Insert
router.post("/company/recordDeposit", companyUserAuth, recordDeposit);
router.post("/company/recordSafeCount", companyUserAuth, recordSafeCount);
//------Read, Insert, Update
router.post("/company/updateDeposit", companyUserAuth, updateDeposit);
router.post("/company/updateSafeCount", companyUserAuth, updateSafeCount);
//------Read, Insert, Update, Delete
router.delete("/company/deleteDeposit", companyUserAuth, deleteDeposit);
router.delete("/company/deleteSafeCount", companyUserAuth, deleteSafeCount);

router.post("/logout", logout);

module.exports = router;
