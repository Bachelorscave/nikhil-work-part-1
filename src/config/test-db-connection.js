import pool from './database';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful!');
    console.log('Current timestamp from database:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  } finally {
    // Close the pool
    pool.end();
  }
}

// Run the test
testConnection(); 