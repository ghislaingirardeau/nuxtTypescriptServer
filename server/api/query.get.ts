export default defineEventHandler((event) => {
  return new Promise((resolve, reject) => {
    const query = getQuery(event);
    console.log(query);
    if ((query.password as string).length < 3) {
      reject({
        statusCode: 400,
        statusMessage: "Password should be longer",
      });
    }
    setTimeout(() => {
      resolve(query);
    }, 2000);
  });
});
