const { Router } = require("express");
const { logout } = require("../controllers/auth");
const { employeeRegister, employeeLogin } = require("../controllers/employeeAuth");
const { employeeRegisterValidation, employeeLoginValidation } = require("../validators/auth");
const { companyRegisterValidation, companyLoginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations-middleware");
// const { employeeUserAuth } = require("../middlewares/employee-passport-middleware");
const { companyUserAuth } = require("../middlewares/company-passport-middleware");
const { companyRegister, companyLogin } = require("../controllers/companyAuth");
const { getAllInvites } = require("../company_utilities/invites/getAllInvites");
const { inviteEmployee } = require("../company_utilities/emailer/inviteEmployee");

const router = Router();

router.post("/employee/register", employeeRegisterValidation, validationMiddleware, employeeRegister);
router.post("/employee/login", employeeLoginValidation, validationMiddleware, employeeLogin);

router.post("/company/register", companyRegisterValidation, validationMiddleware, companyRegister);
router.post("/company/login", companyLoginValidation, validationMiddleware, companyLogin);
router.post("/company/inviteEmployee", companyUserAuth, inviteEmployee);
router.post("/company/getAllInvites", companyUserAuth, getAllInvites);

router.post("/logout", logout);

module.exports = router;
