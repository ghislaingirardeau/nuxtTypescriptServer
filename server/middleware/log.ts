
export default defineEventHandler((event) => {

  if (event.node.req.url === "/api/login") {
    console.log("New login request");
  }
});

