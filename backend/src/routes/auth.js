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
const { getAllProductSKUs } = require("../employee_utilities/inventory_data/getAllProductSKUs");
const { getLatestProductCounts } = require("../employee_utilities/inventory_data/getLatestProductCounts");
const { recordProductCounts } = require("../employee_utilities/inventory_data/recordProductCounts");
const { updateProductDescription } = require("../company_utilities/inventory_data/updateProductDescription");
const { getProductCountHistory } = require("../company_utilities/inventory_data/getProductCountHistory");
const { deleteProduct } = require("../company_utilities/inventory_data/deleteProduct");
const { getAllInventoryAccessControl } = require("../company_utilities/inventory_data/getAllInventoryAccessControl");
const { getAllLaborAccessControl } = require("../company_utilities/labor_data/getAllLaborAccessControl");
const { getAllCashAccessControl } = require("../company_utilities/cash_data/getAllCashAccessControl");
const { getAllProducts } = require("../company_utilities/inventory_data/getAllProducts");
const { deleteProductCounts } = require("../employee_utilities/inventory_data/deleteProductCounts");
const { updateProductCounts } = require("../employee_utilities/inventory_data/updateProductCounts");
const { getAllLatestProductCounts } = require("../employee_utilities/inventory_data/getAllLatestProductCounts");
const { modifyProductCounts } = require("../company_utilities/inventory_data/modifyProductCounts");
const { removeProductCounts } = require("../company_utilities/inventory_data/removeProductCounts");
const { addProductCounts } = require("../company_utilities/inventory_data/addProductCounts");

const router = Router();

//--Employee Routes
//----Signin/Signup Routes
router.post("/employee/register", employeeRegisterValidation, validationMiddleware, employeeRegister);
router.post("/employee/login", employeeLoginValidation, validationMiddleware, employeeLogin);
//----Product Management Routes
//------Control 0 --> Read
router.post("/employee/getAllProductSKUs", employeeUserAuth, getAllProductSKUs);
router.post("/employee/getAllLatestProductCounts", employeeUserAuth, getAllLatestProductCounts);
router.post("/employee/getLatestProductCounts", employeeUserAuth, getLatestProductCounts);
//------Control 1 --> Read, Insert
router.post("/employee/recordProductCounts", employeeUserAuth, recordProductCounts);
//------Control 2 --> Read, Insert, Update
router.post("/employee/updateProductCounts", employeeUserAuth, updateProductCounts);
//------Control 3 --> Read, Insert, Update, Delete
router.delete("/employee/deleteProductCounts", employeeUserAuth, deleteProductCounts);

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
router.post("/company/assignInventoryAccessControl", companyUserAuth, assignInventoryAccessControl);
router.post("/company/assignLaborAccessControl", companyUserAuth, assignLaborAccessControl);
router.post("/company/assignCashAccessControl", companyUserAuth, assignCashAccessControl);
router.post("/company/getAllInventoryAccessControl", companyUserAuth, getAllInventoryAccessControl);
router.post("/company/getAllLaborAccessControl", companyUserAuth, getAllLaborAccessControl);
router.post("/company/getAllCashAccessControl", companyUserAuth, getAllCashAccessControl);
//----Product Management Routes
router.post("/company/addProduct", companyUserAuth, addProduct);
router.post("/company/addProductCounts", companyUserAuth, addProductCounts);
router.post("/company/updateProductDescription", companyUserAuth, updateProductDescription);
router.post("/company/updateProductCounts", companyUserAuth, modifyProductCounts);
router.post("/company/getAllProducts", companyUserAuth, getAllProducts);
router.post("/company/getAllLatestProductCounts", companyUserAuth, getAllLatestProductCounts);
router.post("/company/getProductCountHistory", companyUserAuth, getProductCountHistory);
router.delete("/company/deleteProduct", companyUserAuth, deleteProduct);
router.delete("/company/deleteProductCounts", companyUserAuth, removeProductCounts);

router.post("/logout", logout);

module.exports = router;
