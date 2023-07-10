export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body.email);
  if ((body.password as string).length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: "Password should be longer",
    });
  }
  return { body: body.email.toUpperCase() };
});
