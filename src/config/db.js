import { neon } from "@neondatabase/serverless"


let client 

export function connectDB() {
  try {
    client = neon(process.env.DATABASE_URL);
    console.log("Connected to Neon PostgreSQL");
    return client;
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

export { client }