import { Pool } from 'pg';

// Hardcode the database connection parameters here
const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',       
  database: 'employee_tracker',  
  password: 'bentley',  
  port: 5432, 
});

export const connectToDb = async () => {
  try {
    const client = await pool.connect(); 
    console.log('✅ Connected to database');
    client.release();
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

export default pool;
