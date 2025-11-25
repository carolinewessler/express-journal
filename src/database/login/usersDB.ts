import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// caminho absoluto para o arquivo users.db
const dbPath = join(__dirname, 'users.db');

export const usersDB = new Database(dbPath);

// cria tabela se não existir
usersDB.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    role TEXT DEFAULT 'user'
  );
`);
