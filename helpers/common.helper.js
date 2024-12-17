
const { runQuery } = require("../config/db");

class CommonHelper {

  async getUserRecordFilterCondition(UserId = null, prefix = "", wherecondition = true, andCondition = false) {
    const customPromise = new Promise(async (resolve, reject) => {
      try {
        let whereUserFilter = "";
        let putWhere = (wherecondition) ? " where " : "";
        let putAnd = (andCondition) ? " and " : "";
        var userRole = 0;
        if (UserId) {
          // check user role 
          let result = await runQuery(
            `SELECT * FROM Users WHERE Id= ${UserId}`
          );
          if (result.recordsets.length > 0 && result.recordsets[0].length > 0) {
            userRole = result.recordsets[0][0].RoleId;
          } else {
            userRole = 11
          }
          if (userRole == 23 || userRole == 22) { //for moderators

            whereUserFilter = ` ${putWhere} ${putAnd} ${prefix}UserId IN (SELECT Patient_ClinicalTrial.UserId FROM Patient_ClinicalTrial join ClinicalTrial on ClinicalTrial.Id = Patient_ClinicalTrial.ClinicalTrial_Id where ClinicalTrial.UserId=${UserId})`;
          }
          if (userRole == 11) {
            whereUserFilter = ` ${putWhere} ${putAnd}  ${prefix}UserId=${UserId} `;
            console.log("whereUserFilter", whereUserFilter)
          }
          resolve(whereUserFilter)
        }
      } catch (error) {
        console.log("ERROR: ", error);
        resolve("")
      }
    })
    return customPromise;
  }


  async checkUserRole(userId) {
    try {
      let userRole = 34;
      let result = await runQuery(
        `SELECT * FROM Users WHERE Id= ${userId}`
      );
      if (result.recordsets.length > 0 && result.recordsets[0].length > 0) {
        userRole = result.recordsets[0][0].RoleId;
      }
      return userRole;
    } catch (error) {
      console.log("Error in checkUserRole", error)
    }

  }

  async logEvent(userId, event, eventMessage, error, errorMessage, type) {
    const userIds = userId !== null ? userId : 0;
    try {
      const currentDate = new Date().toISOString();
      const query = `
        INSERT INTO Logs (UserId, Event, EventMessage, Error, ErrorMessage, Date, Type)
        VALUES ('${userIds}', '${event}', '${eventMessage}', '${error}', '${errorMessage}', '${currentDate}' , '${type}')
      `;
      await runQuery(query);
    } catch (err) {
      console.error('Error logging event:', err);
    }
  }

}

module.exports = CommonHelper;
