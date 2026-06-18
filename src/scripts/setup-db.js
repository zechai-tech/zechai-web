const { Client } = require("pg");

const connectionString = "postgresql://postgres:s7f$VWP-23hVRfr@db.nmarmjgzyficevfteplu.supabase.co:5432/postgres";

async function main() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log("Successfully connected to Supabase PostgreSQL database.");

    const query = `
      CREATE TABLE IF NOT EXISTS franchise_enquiries (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at timestamp with time zone DEFAULT now(),
        full_name text NOT NULL,
        phone text NOT NULL,
        email text NOT NULL,
        city text NOT NULL,
        preferred_model text NOT NULL,
        budget_range text NOT NULL,
        message text,
        status text DEFAULT 'new'
      );
    `;

    await client.query(query);
    console.log("Table 'franchise_enquiries' created successfully or already exists.");
  } catch (err) {
    console.error("Error setting up database:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
