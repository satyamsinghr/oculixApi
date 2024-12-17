const { runQuery } = require("./config/db");

async function updateTestTube() {
  try {
    const testTubeResults = await runQuery(
      `SELECT * FROM TubeTest_Response WHERE TestType='sixteen'`
    );

    const values = testTubeResults.recordsets[0];

    for (let i = 0; i < values.length; i++) {
      if (values[i].Id > 53) {
        console.log(values[i].Id);
        let finalItem = values[i].TubeId.split(",");
        console.log("1", finalItem);
        finalItem = finalItem.slice(0, finalItem.length - 1);
        console.log("2", finalItem);
        let finalItemLastDigit = finalItem[finalItem.length - 1];
        console.log("3", finalItemLastDigit);
        finalItemLastDigit = Number(finalItemLastDigit);
        console.log("4", finalItemLastDigit);
        let lastTwoValues = [];
        for (let i = 0; i < 2; i++) {
          finalItemLastDigit++;
          if (finalItemLastDigit > 9) {
            lastTwoValues.push(`0000${finalItemLastDigit}`);
          }
          if (finalItemLastDigit < 10) {
            lastTwoValues.push(`00000${finalItemLastDigit}`);
          }
        }
        finalItem = [...finalItem, ...lastTwoValues];
        finalItem = finalItem.join(",");
        // await runQuery(
        //   `UPDATE TubeTest_Response SET TubeId=\'${finalItem}\' WHERE Id=${values[i].Id}`
        // );
        // console.log("Executed ", values[i].Id);
        // Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon

        // await runQuery(
        //   `UPDATE TubeTest_Response SET SelectedAnswer='Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon' WHERE Id=${values[i].Id}`
        // );
        console.log("Executed ", values[i].Id);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
// Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon
// Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Fish,Garlic,Honey,Orange,Lemon,Banana,Rose,Lemon,Cheese,Garlic,Honey,Orange,Lemon
updateTestTube();
`UPDATE TubeTest_Response SET TubeId=\'000001,000002,000003,000004,000005,000006,000007,000008,000009,000010,000011,000012,000013,000014,000015,000016,000017,000018,000019,000020,000021,000022,000023,000024,000025,000026,000027,000028,000029,000030,000031,000032\' WHERE TubeId='000001,000002,000003,000004,000005,000006,000007,000008,000009,000010,000011,000012,000013,000014'`;
// "000001,000002,000003,000004,000005,000006,000007,000008,000009,000010,000011,000012,000013,000014,000015,000016,000017,000018,000019,000020,000021,000022,000023,000024,000025,000026,000027,000028,000029,000030,000031,000032"
