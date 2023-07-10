import * as mysql from "mysql2";

// CONFIG FOR DEPLOYED SQL DB
/* export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (event.node.req.url === "/api/mysql" || event.node.req.url === "/api/sql") {
    console.log("New DB request");
    event.context.db = await mysql.createConnection({
      host: config.public.DEPLOYEDDBHOST,
      user: config.public.DEPLOYEDDBUSER,
      password: config.public.DEPLOYEDDBPASSWORD,
      database: config.public.DEPLOYEDDBDATABASE,
    });
  }
}); */

// CONFIG FOR LOCAL SQL DB
export default defineEventHandler(async (event) => {
  // CHECK HERE THE AUTH TOKEN FOR INSTANCE
  /* console.log(event.node.req.headers.authorization); */

  const config = useRuntimeConfig();
  if (
    event.node.req.url === "/api/mysql" ||
    event.node.req.url === "/api/sql"
  ) {
    console.log("New DB request");
    event.context.db = mysql.createConnection({
      host: config.public.DBHOST,
      port: 3306,
      user: config.public.DBUSER,
      password: config.public.DBPASSWORD,
      database: config.public.DBDATABASE,
    });
    /* event.context.db = mysql.createPool({
      host: config.public.DBHOST,
      port: 3306,
      user: config.public.DBUSER,
      password: config.public.DBPASSWORD,
      database: config.public.DBDATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    }); */
  }
});
