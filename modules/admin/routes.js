const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const adminController = require("./controller");
const axios = require("axios");
router
  .route("/")
  .post(
    check("email", "Please enter email").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
    adminController.createAdmin
  );

router
  .route("/login")
  .post(
    check("email", "Please enter email").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
    adminController.login
  );
  router.route("/getDataFromDashboard").get(adminController.getScentawareDataFromDashboard);

router
  .route("/forgot-password")
  .post(
    check("email", "Please enter email").not().isEmpty(),
    adminController.requestForgotPassword
  );

router
  .route("/confirm-password")
  .post(
    adminController.requestConfirmPassword
  );

router
  .route("/change-password")
  .post(
    check("oldPassword", "Please enter email").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
    check("confirmpassword", "Please enter confirm password").not().isEmpty(),
    adminController.changePassword
  );

router
  .route("/logs")
  .get(adminController.getLogs);

module.exports = router;

