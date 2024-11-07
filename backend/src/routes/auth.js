const { Router } = require("express");
const { logout } = require("../controllers/auth");
const { employeeRegister, employeeLogin } = require("../controllers/employeeAuth");
const { employeeRegisterValidation, employeeLoginValidation } = require("../validators/auth");
const { companyRegisterValidation, companyLoginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations-middleware");
// const { employeeUserAuth } = require("../middlewares/employee-passport-middleware");
const { companyUserAuth } = require("../middlewares/company-passport-middleware");
const { companyRegister, companyLogin } = require("../controllers/companyAuth");
const { getAllInvites } = require("../company_utilities/invite_data/getAllInvites");
const { inviteEmployee } = require("../company_utilities/invite_data/inviteEmployee");
const { getAllEmployeeInfo } = require("../company_utilities/employee_data/getAllEmployeeInfo");
const { deleteInvite } = require("../company_utilities/invite_data/deleteInvite");
const { getEmployeeById } = require("../company_utilities/employee_data/getEmployeeById");
const { setMinLaborAccessControl } = require("../company_utilities/labor_data/setMinLaborAccessControl");
const { setMinCashAccessControl } = require("../company_utilities/cash_data/setMinCashAccessControl");
const { setMinInventoryAccessControl } = require("../company_utilities/inventory_data/setMinInventoryAccessControl");
const { assignLaborAccessControl } = require("../company_utilities/labor_data/assignLaborAccessControl");
const { assignCashAccessControl } = require("../company_utilities/cash_data/assignCashAccessControl");
const { assignInventoryAccessControl } = require("../company_utilities/inventory_data/assignInventoryAccessControl");
const { getEmployeeIdsAndNames } = require("../company_utilities/employee_data/getEmployeeIdsAndNames");
const { addProduct } = require("../company_utilities/inventory_data/addProduct");

const router = Router();

//--Employee Routes
//----Signin/Signup Routes
router.post("/employee/register", employeeRegisterValidation, validationMiddleware, employeeRegister);
router.post("/employee/login", employeeLoginValidation, validationMiddleware, employeeLogin);

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
//----Min Access Control Routes
router.post("/company/setMinInventoryAccessControl", companyUserAuth, setMinInventoryAccessControl);
router.post("/company/setMinLaborAccessControl", companyUserAuth, setMinLaborAccessControl);
router.post("/company/setMinCashAccessControl", companyUserAuth, setMinCashAccessControl);
//----Employee Access Control Routes
router.post("/company/assignInventoryAccessControl", companyUserAuth, assignInventoryAccessControl);
router.post("/company/assignLaborAccessControl", companyUserAuth, assignLaborAccessControl);
router.post("/company/assignCashAccessControl", companyUserAuth, assignCashAccessControl);
//----Product Routes
router.post("/company/addProduct", companyUserAuth, addProduct);

router.post("/logout", logout);

module.exports = router;
