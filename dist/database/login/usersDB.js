import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// aqui ele cria (ou abre) o arquivo users.db dentro da pasta login
const usersDB = new Database(join(__dirname, 'users.db'));
// cria a tabela se não existir
usersDB.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
`);
export { usersDB };
//# sourceMappingURL=usersDB.js.map