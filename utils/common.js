const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");
const nodemailer = require("nodemailer");

module.exports = {
  checkPathParams: (event, path, params, context) => {
    if (event.path === path) {
      if (params) {
        for (var item in params) {
          if (event.pathParameters && event.pathParameters[params[item]]) {
            return true;
          } else {
            context.fail("missing param : " + params[item]);
            return false;
          }
        }
      }
      return true; // params and context are optional
    }
    return false;
  },

  // validate that a string is a positive integer
  isNormalInteger: (str) => {
    return /^\+?(0|[1-9]\d*)$/.test(str);
  },

  buildLimitOffsetFromQueryParams: (queryParams, noDefaultLimit) => {
    var limitSql = "";
    var offsetSql = "";
    if (queryParams) {
      if (isNormalInteger(queryParams.limit)) {
        limitSql = " LIMIT " + queryParams.limit;
      }
      if (isNormalInteger(queryParams.offset)) {
        offsetSql = " OFFSET " + queryParams.offset;
      }
    }
    // apply default limit
    if (!limitSql && !noDefaultLimit) {
      limitSql = " LIMIT 50";
    }
    return limitSql + offsetSql;
  },

  getCognitoSecretHash: (username, clientId, clientSecret) => {
    return Base64.stringify(hmacSHA256(username + clientId, clientSecret));
  },

  generateVerificationCode: () => {
    // return Math.floor(Math.random() * 1000000);
    return Math.floor(100000 + Math.random() * 900000)
  },

  validateDate: (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateStr.match(regex) === null) {
      return false;
    }
    const date = new Date(dateStr);
    const timestamp = date.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      return false;
    }
    return date.toISOString().startsWith(dateStr);
  },
  sendEmail: async ({ from, to, html, subject }) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "Gmail",
        auth: {
          user: "sensifyaware@gmail.com",
          pass: "cfwgfwoygweujhlh",
        },
      });
      const response = await transporter.sendMail({
        from,
        to,
        html,
        subject,
      });
      console.log("Email Response", response);
    } catch (error) {
      throw error;
    }
  },
};
