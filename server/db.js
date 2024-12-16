// server/db.js
import pg from "pg"

// Replace the hardcoded values with the ones provided
const db=new pg.Client({
  user: "postgres",       // DB_USER=postgres
  host: "localhost",      // DB_HOST=localhost
  database: "backmarket", // DB_NAME=backmarket
  password: "bereket",    // DB_PASSWORD=bereket
  port: 5433,             // DB_PORT=5433
});

db.connect()  // Establish the connection

export default db;
