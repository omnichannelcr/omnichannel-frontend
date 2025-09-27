import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class DatabaseConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env['DB_HOST'] || 'localhost',
      port: parseInt(process.env['DB_PORT'] || '5432'),
      database: process.env['DB_NAME'] || (process.env['NODE_ENV'] === 'production' ? 'omnichannel' : 'omnichannel_dev'),
      user: process.env['DB_USER'] || 'omnichannel_user',
      password: process.env['DB_PASSWORD'] || 'omnichannel_password',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Handle pool errors
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now();
    try {
      const res = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.query('SELECT NOW()');
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }
}

export const db = new DatabaseConnection();
export default db;
