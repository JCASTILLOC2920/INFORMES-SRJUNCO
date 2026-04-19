
require('dotenv').config();
const { Pool } = require('pg');

async function testConnection() {
  console.log('Testing connection to:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@'));
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000
  });

  try {
    const client = await pool.connect();
    console.log('SUCCESS: Connected to database');
    const res = await client.query('SELECT NOW()');
    console.log('Result:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('FAILURE: Could not connect to database');
    console.error(err);
  } finally {
    await pool.end();
  }
}

testConnection();
