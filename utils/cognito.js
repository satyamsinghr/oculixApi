const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const { cognitoConfig } = require("../config");
const { COGNITO_CONSTANTS } = require("../constants");
const { commonUtil } = require("./common");

class CognitoHelper {
  cognito;

  constructor() {
    this.cognito = new AWS.CognitoIdentityServiceProvider();
  }

  async login(emailId, password) {
    try {
      const loginParams = this._getLoginParams(emailId, password);
      console.log("loginParams: ", loginParams);
      const response = await this.cognito
        .adminInitiateAuth(loginParams)
        .promise();
      console.log("response: ", response);

      const userParams = this._getUserParams(emailId);
      console.log("userParams: ", userParams);

      const userDetails = await this.cognito.adminGetUser(userParams).promise();
      console.log("response: ", JSON.stringify(userDetails));

      const userEmailVerified = userDetails.UserAttributes.find(
        (userAttr) =>
          userAttr.Name === COGNITO_CONSTANTS.USER_ATTRIBUTES.EMAIL_VERIFIED
      );
      response.AuthenticationResult["emailVerified"] = userEmailVerified.Value;
      return response.AuthenticationResult;
    } catch (error) {
      console.log("ERROR: ", error);
      return undefined;
    }
  }

  async verifySoftwareToken(userCode, accessToken, friendlyName) {
    try {
      const verifySoftwareTokenParams = this._getVerifyTokenParams(
        userCode,
        accessToken,
        friendlyName
      );
      console.log("verifySoftwareTokenParams: ", verifySoftwareTokenParams);
      const response = await this.cognito
        .verifySoftwareToken(verifySoftwareTokenParams)
        .promise();
      console.log("response: ", response);

      if (response.Status === COGNITO_CONSTANTS.VERIFY_TOKEN_STATUS.SUCCESS) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    }
  }

  async signUp(emailId, password) {
    try {
      console.log("sign up called");

      const createUserParams = this._getCreateUserParams(emailId);
      console.log("createUserParams: ", createUserParams);

      const response = await this.cognito
        .adminCreateUser(createUserParams)
        .promise();
      console.log("response.User: ", response);

      if (response.User) {
        const paramsForSetPass = this._getSetUserPasswordParams(
          emailId,
          password
        );
        const passRes = await this.cognito
          .adminSetUserPassword(paramsForSetPass)
          .promise();
        console.log("passRes: ", passRes);
      } else {
        console.log("ERROR: Failed to create user. ", response);
        throw new Error("Failed to create user");
      }
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmSignUp(confirmationCode, emailId) {
    try {
      const userParams = this._getUserParams(emailId);
      console.log("userParams: ", userParams);

      const response = await this.cognito.adminGetUser(userParams).promise();
      console.log("response: ", JSON.stringify(response));

      const userVerificationAttribute = response.UserAttributes.find(
        (userAttr) =>
          userAttr.Name ===
          COGNITO_CONSTANTS.USER_ATTRIBUTES.CUSTOM_VERIFICATION_CODE
      );

      console.log("userVerificationAttribute: ", userVerificationAttribute);
      if (userVerificationAttribute.Value === confirmationCode) {
        const updateUserAttributesParams =
          this._getUpdateUserAttributesParams(emailId);
        console.log("updateUserAttributesParams: ", updateUserAttributesParams);

        const updateAttributeRes = await this.cognito
          .adminUpdateUserAttributes(updateUserAttributesParams)
          .promise();

        console.log("updateAttributeRes: ", updateAttributeRes);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    }
  }

  async changePassword(accessToken, oldPassword, newPassword) {
    try {
      const paramsForChangePass = this._getChangePasswordParams(
        accessToken,
        oldPassword,
        newPassword
      );
      const passRes = await this.cognito
        .changePassword(paramsForChangePass)
        .promise();

      console.log("passRes: ", passRes);
      return true;
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    }
  }

  async requestForgotPassword(emailId) {
    try {
      const params = this._getForgotPasswordParams(emailId);
      const passRes = await this.cognito.forgotPassword(params).promise();

      console.log("passRes: ", passRes);
      return true;
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    }
  }

  async verifyForgotPassword(confirmationCode, emailId, newPassword) {
    try {
      const params = this._getConfirmForgotPasswordParams(
        confirmationCode,
        emailId,
        newPassword
      );
      console.log("params: ", params);

      const passRes = await this.cognito
        .confirmForgotPassword(params)
        .promise();

      console.log("passRes: ", passRes);
      return true;
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    }
  }

  async refreshToken(refreshToken, emailId) {
    try {
      const refreshTokenParams = this._getRefreshTokenParams(
        refreshToken,
        emailId
      );
      console.log("refreshTokenParams: ", refreshTokenParams);
      const response = await this.cognito
        .adminInitiateAuth(refreshTokenParams)
        .promise();
      console.log(
        "response.AuthenticationResult: ",
        response.AuthenticationResult
      );

      return response.AuthenticationResult;
    } catch (error) {
      console.log("ERROR: ", error);
      return undefined;
    }
  }

  async logout(accessToken) {
    try {
      const params = this._getLogoutParams(accessToken);
      const logoutRes = await this.cognito.globalSignOut(params).promise();

      console.log("logoutRes: ", logoutRes);
      return true;
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    }
  }

  async associateSoftwareToken(accessToken) {
    try {
      const associateTokenParams = this._getAssociateTokenParams(accessToken);
      console.log("associateTokenParams: ", associateTokenParams);
      const associateTokenRes = await this.cognito
        .associateSoftwareToken(associateTokenParams)
        .promise();
      console.log("associateTokenRes: ", associateTokenRes);
      return associateTokenRes;
    } catch (error) {
      console.log("ERROR: ", error);
      throw error;
    }
  }

  async resendConfirmationCode(username) {
    const params = {
      ClientId: cognitoConfig.USER_POOL_CLIENT_ID,
      Username: username,
      SecretHash: commonUtil.getCognitoSecretHash(
        username,
        cognitoConfig.USER_POOL_CLIENT_ID,
        cognitoConfig.USER_POOL_CLIENT_SECRET
      ),
    };
    const result = await this.cognito.resendConfirmationCode(params).promise();
    await this.cognito
      .adminUpdateUserAttributes(updateUserAttributesParams)
      .promise();
    return result;
  }

  _getLoginParams(emailId, password) {
    return {
      AuthFlow: COGNITO_CONSTANTS.AUTH_TYPES.ADMIN_USER_PASSWORD_AUTH,
      UserPoolId: cognitoConfig.USER_POOL_ID,
      ClientId: cognitoConfig.USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: emailId,
        PASSWORD: password,
        SECRET_HASH: commonUtil.getCognitoSecretHash(
          emailId,
          cognitoConfig.USER_POOL_CLIENT_ID,
          cognitoConfig.USER_POOL_CLIENT_SECRET
        ),
      },
    };
  }

  _getRefreshTokenParams(refreshToken, emailId) {
    return {
      AuthFlow: COGNITO_CONSTANTS.AUTH_TYPES.REFRESH_TOKEN_AUTH,
      UserPoolId: cognitoConfig.USER_POOL_ID,
      ClientId: cognitoConfig.USER_POOL_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: commonUtil.getCognitoSecretHash(
          emailId,
          cognitoConfig.USER_POOL_CLIENT_ID,
          cognitoConfig.USER_POOL_CLIENT_SECRET
        ),
      },
    };
  }

  _getCreateUserParams(emailId, resendCode = false) {
    const verificationCode = commonUtil.generateVerificationCode() + "";
    const createUserParams = {
      UserPoolId: cognitoConfig.USER_POOL_ID,
      Username: emailId,
      DesiredDeliveryMediums: [COGNITO_CONSTANTS.DELIVERY_MEDIUM.EMAIL],
      UserAttributes: [
        {
          Name: "email",
          Value: emailId,
        },
        {
          Name: COGNITO_CONSTANTS.USER_ATTRIBUTES.EMAIL_VERIFIED,
          Value: "false",
        },
        {
          Name: COGNITO_CONSTANTS.USER_ATTRIBUTES.CUSTOM_VERIFICATION_CODE,
          Value: verificationCode,
        },
      ],
      TemporaryPassword: verificationCode,
    };
    if (resendCode) {
      createUserParams["MessageAction"] =
        COGNITO_CONSTANTS.MESSAGE_ACTIONS.RESEND;
    }
    return createUserParams;
  }

  _getConfirmSignUpParams(confirmationCode, emailId) {
    return {
      ClientId: cognitoConfig.USER_POOL_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Username: emailId,
      SecretHash: commonUtil.getCognitoSecretHash(
        emailId,
        cognitoConfig.USER_POOL_CLIENT_ID,
        cognitoConfig.USER_POOL_CLIENT_SECRET
      ),
    };
  }

  _getSetUserPasswordParams(emailId, password) {
    return {
      Password: password,
      UserPoolId: cognitoConfig.USER_POOL_ID,
      Username: emailId,
      Permanent: true,
    };
  }

  _getChangePasswordParams(accessToken, oldPassword, newPassword) {
    return {
      AccessToken: accessToken,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    };
  }

  _getForgotPasswordParams(emailId) {
    return {
      ClientId: cognitoConfig.USER_POOL_CLIENT_ID,
      SecretHash: commonUtil.getCognitoSecretHash(
        emailId,
        cognitoConfig.USER_POOL_CLIENT_ID,
        cognitoConfig.USER_POOL_CLIENT_SECRET
      ),
      Username: emailId,
    };
  }

  _getConfirmForgotPasswordParams(confirmationCode, emailId, newPassword) {
    return {
      ClientId: cognitoConfig.USER_POOL_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Username: emailId,
      Password: newPassword,
      SecretHash: commonUtil.getCognitoSecretHash(
        emailId,
        cognitoConfig.USER_POOL_CLIENT_ID,
        cognitoConfig.USER_POOL_CLIENT_SECRET
      ),
    };
  }

  _getLogoutParams(accessToken) {
    return {
      AccessToken: accessToken,
    };
  }

  _getUserParams(emailId) {
    return {
      UserPoolId: cognitoConfig.USER_POOL_ID,
      Username: emailId,
    };
  }

  _getUpdateUserAttributesParams(emailId) {
    return {
      UserPoolId: cognitoConfig.USER_POOL_ID,
      Username: emailId,
      UserAttributes: [
        {
          Name: COGNITO_CONSTANTS.USER_ATTRIBUTES.EMAIL_VERIFIED,
          Value: "true",
        },
      ],
    };
  }

  _getAssociateTokenParams(accessToken, sessionId) {
    return {
      AccessToken: accessToken,
      Session: sessionId,
    };
  }

  _getVerifyTokenParams(userCode, accessToken, friendlyDeviceName) {
    return {
      UserCode: userCode,
      AccessToken: accessToken,
      FriendlyDeviceName: friendlyDeviceName,
    };
  }
}

module.exports = CognitoHelper;
