// CONFIG FOR DEPLOYED SQL DB
/* export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    event.context.db.execute(
      "SELECT id, denomination, description FROM associations WHERE id=? AND denomination= ?;",
      [55, "care"], // to avoid injection risk + can control type of data pass
      function (err: Error, results: []) {
        if (err) {
          reject({
            statusCode: 400,
            statusMessage: "Can't access to the database",
          });
        } else {
          resolve(results);
          event.context.db.end(function (err: Error) {
            if (err) {
              console.log("error:" + err.message);
            } else {
              console.log("DB disconnected");
            }
          });
        }
      }
    );
  });
}); */

// CONFIG FOR LOCAL SQL DB
export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    event.context.db.execute(
      "SELECT * FROM associations",
      function (err: Error, results: []) {
        if (err) {
          reject({
            statusCode: 400,
            statusMessage: "Can't access to the database",
          });
        } else {
          resolve(results);
          event.context.db.end(function (err: Error) {
            if (err) {
              console.log("error:" + err.message);
            } else {
              console.log("DB disconnected");
            }
          });
        }
      }
    );
  });
});
