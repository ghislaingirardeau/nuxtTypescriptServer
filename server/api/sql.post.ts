export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return new Promise((resolve, reject) => {
    event.context.db.execute(
      "SELECT * FROM chien where idchien=? AND race=?",
      [body.id, body.name], // to avoid injection risk + can control type of data pass
      function (err: Error, results: []) {
        if (err) {
          reject({
            statusCode: 400,
            statusMessage: "Can't access to the database",
          });
        } else {
          const dbResults =
            results.length > 0 ? results : ["La recherche n'a pas abouti"];
          resolve(dbResults);
          // no need connection end if use pool
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
