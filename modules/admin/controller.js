const { runQuery } = require("../../config/db");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const { validationResult } = require("express-validator");
const { cognitoHelper } = require("../../helpers");
const { commonUtil } = require("../../utils/index");
const emailTemplate = require("../../helpers/emailTemplate");
const { commonHelper } = require("../../helpers");
const { use } = require("./routes");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const createAdmin = async (req, res) => {
  try {
    const newGuid = uuidv4();
    console.log("New GUID:", newGuid);
    let { email, password, firstName, lastName, age, gender } = req.body;
    if (!password) {
      return res.status(400).json({
        msg: "Password is required",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      return res.status(500).json({
        msg: "Error generating salt",
        success: false,
      });
    }
    // Hash the password
    let passwordHash = await bcrypt.hash(password, salt);
    // Check if password hash is generated
    if (!passwordHash) {
      return res.status(500).json({
        msg: "Error hashing password",
        success: false,
      });
    }

    let { recordsets } = await runQuery(
      `SELECT * FROM users WHERE email=\'${email}\'`
    );

    if (recordsets[0].length)
      return res.status(404).json({
        msg: "User already exists against email: " + email,
        success: false,
      });
    await runQuery(
      `INSERT INTO users (Id, Email, Password, firstName, lastName, age, gender) 
       OUTPUT INSERTED.Id 
       VALUES ('${newGuid}', '${email}', '${passwordHash}', '${firstName}', '${lastName}', ${age}, '${gender}');`
    );

    const isUserCreated = await cognitoHelper.signUp(email, password);
    if (isUserCreated) {
      return res.status(200).json({
        msg: "Sign Up successfully",
        success: true,
        data: {
          email,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    let { recordset } = await runQuery(
      `SELECT * FROM Users WHERE email=\'${email}\'`
    );
    if (!recordset.length) {
      return res.status(404).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    /*
    const isMatch = await bcrypt.compare(password, recordset[0].Password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
      */
    const authTokens = await cognitoHelper.login(email, password);
    if (authTokens) {
      return res.status(200).json({
        message: "Login successfully",
        success: true,
        access_token: authTokens.AccessToken,
        refresh_token: authTokens.RefreshToken,
        data: {
          id: recordset[0].Id,
          firstName: recordset[0].firstName,
          lastName: recordset[0].lastName,
          email: recordset[0].Email,
          gender: recordset[0].gender,
        },
      });
    } else {
      return res
        .status(500)
        .json({
          message: "Login failed incorrect username or password",
          success: false,
        });
    }
  } catch (err) {
    commonHelper.logEvent(
      null,
      "Login",
      "Login failed",
      err.name,
      err.message,
      "Dashboard"
    );
    console.log(err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

const getScentawareDataFromDashboard = async (req, res) => {
  try {
    // const dashboardEndpoint = "http://localhost:4000/api/scentaware/scentawareDataToOculix";
    const dashboardEndpoint =
      "https://gokepiqof3.execute-api.us-east-1.amazonaws.com/prod/api/scentaware/scentawareDataToOculix";
    const { testTube, userId, pageIndex, pageSize } = req.query;
    const response = await axios.get(dashboardEndpoint, {
      params: {
        testTube,
        userId,
        pageIndex,
        pageSize,
      },
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error", status: false });
  }
};

function generateRandomPassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const requestConfirmPassword = async (req, res) => {
  try {
    let { otp, emailId, newPassword } = req.body;
    const passwordUpdated = await cognitoHelper.requestConfirmPassword(
      emailId,
      otp,
      newPassword
    );
    if (passwordUpdated) {
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(newPassword, salt);
      let { recordsets } = await runQuery(
        `UPDATE Users SET password='${password}' WHERE email='${emailId}'`
      );

      return res.status(200).json({
        message: "Password Updated Successfully",
        success: true,
      });
    } else {
      return res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const requestForgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let { recordset } = await runQuery(
      `SELECT * FROM Users WHERE email='${email}'`
    );

    if (!recordset.length) {
      return res.status(404).json({
        message: "Account does not exist against an email: " + email,
        success: false,
      });
    } else {
      const emailSent = await cognitoHelper.requestForgotPassword(email);
      if (emailSent) {
        return res.status(200).json({
          message: "Reset Password Code sent to an email",
          success: true,
        });
      } else {
        return res.status(500).json({ message: "Server Error" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const verifyForgotPassword = async (req, res) => {
  try {
    let { email, password, confirmationCode } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let { recordset } = await runQuery(
      `SELECT * FROM Users WHERE email='${email}'`
    );

    if (!recordset.length) {
      return res.status(404).json({
        message: "Account does not exist against an email: " + email,
        success: false,
      });
    }

    const passwordVerified = await cognitoHelper.verifyForgotPassword(
      req.body.confirmationCode,
      req.body.email,
      req.body.password
    );

    if (passwordVerified === "CodeMismatchException")
      return res
        .status(400)
        .json({ msg: "confirmation code is incorrect", success: false });
    if (passwordVerified === "ExpiredCodeException")
      return res
        .status(400)
        .json({ msg: "confirmation code is expired", success: false });
    if (passwordVerified === "LimitExceededException")
      return res.status(400).json({
        msg: "attempt limit exceeded. please try after some time",
        success: false,
      });
    if (passwordVerified) {
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.password, salt);
      db.query(
        `UPDATE employees SET password='${password}' WHERE email='${req.body.email}'`,
        async (error, result) => {
          return res.status(200).json({
            msg: "password has been changed successfully",
            success: true,
          });
        }
      );
    } else {
      return res.status(500).json({ msg: "Server Error" });
    }

    // db.query(
    //   `SELECT * FROM employees WHERE email='${req.body.email}'`,
    //   async (error, result) => {
    //     if (result.length === 0)
    //       return res
    //         .status(404)
    //         .json({ msg: "account does not exist", success: false });

    //     const passwordVerified = await cognitoHelper.verifyForgotPassword(
    //       req.body.confirmationCode,
    //       req.body.email,
    //       req.body.password
    //     );

    //     if (passwordVerified === "CodeMismatchException")
    //       return res
    //         .status(400)
    //         .json({ msg: "confirmation code is incorrect", success: false });
    //     if (passwordVerified === "ExpiredCodeException")
    //       return res
    //         .status(400)
    //         .json({ msg: "confirmation code is expired", success: false });
    //     if (passwordVerified === "LimitExceededException")
    //       return res.status(400).json({
    //         msg: "attempt limit exceeded. please try after some time",
    //         success: false,
    //       });
    //     if (passwordVerified) {
    //       const salt = await bcrypt.genSalt(10);
    //       let password = await bcrypt.hash(req.body.password, salt);
    //       db.query(
    //         `UPDATE employees SET password='${password}' WHERE email='${req.body.email}'`,
    //         async (error, result) => {
    //           return res.status(200).json({
    //             msg: "password has been changed successfully",
    //             success: true,
    //           });
    //         }
    //       );
    //     } else {
    //       return res.status(500).json({ msg: "Server Error" });
    //     }
    //   }
    // );
  } catch (err) {
    console.log("ERROR: ", err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const changePassword = async (req, res) => {
  console.log("Hello ");
  try {
    let { oldPassword, password, confirmpassword } = req.body;
    const v = new Validator(req.body, {
      oldPassword: "required",
      password: "required",
      confirmpassword: "required|same:password ",
    });
    const userId = req.body.userId;
    const errors = await v.check();

    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const errors = validationResult(req);
    /* if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() }); */
    let currentUser = req.user;
    if (bcrypt.compareSync(oldPassword, currentUser.password)) {
      const salt = await bcrypt.genSalt(10);
      let hasPassword = bcrypt.hashSync(password, salt);
      db.query(
        `UPDATE Users SET password='${hasPassword}' WHERE email='${currentUser.email}'`,
        async (error, result) => {
          return res.status(200).json({
            msg: "password has been changed successfully",
            success: true,
          });
        }
      );
    } else {
      return res.status(404).json({
        message: "Old password does not match in your current password: ",
        success: false,
      });
    }

    /* let { recordset } = await runQuery(
          `SELECT * FROM UserData WHERE email='${email}'`
        );
     
        if (!recordset.length) {
          return res.status(404).json({
            message: "Old password does not match in your current password: " ,
            success: false,
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          let password = await bcrypt.hash(req.body.password, salt);
          db.query(
            `UPDATE Users SET password='${password}' WHERE email='${req.body.email}'`,
            async (error, result) => {
              return res.status(200).json({
                msg: "password has been changed successfully",
                success: true,
              });
            }
          );
        } */
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getLogs = async (req, res) => {
  try {
    const pageIndex = req.query?.pageIndex;
    const pageSize = req.query?.pageSize;
    if (pageIndex && pageSize) {
      const page = parseInt(pageIndex);
      const size = parseInt(pageSize);
      const offset = (page - 1) * size;

      const logQuery = `SELECT * FROM (
            SELECT *, ROW_NUMBER() OVER (ORDER BY [Date] DESC) AS RowNumber
            FROM Logs
          ) AS Logs
          WHERE RowNumber BETWEEN ${offset + 1} AND ${offset + size};`;

      const totalCountQuery = `SELECT COUNT(*) AS TotalCount FROM Logs `;

      const [data, totalCountResult] = await Promise.all([
        runQuery(logQuery),
        runQuery(totalCountQuery),
      ]);
      const totalRecords = totalCountResult.recordsets[0][0].TotalCount;
      return res.status(200).json({
        success: true,
        data: data.recordsets[0],
        totalRecords: totalRecords,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createAdmin,
  login,
  getScentawareDataFromDashboard,
  requestForgotPassword,
  verifyForgotPassword,
  changePassword,
  requestConfirmPassword,
  getLogs,
};
