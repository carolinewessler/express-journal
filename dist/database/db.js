import Database from 'better-sqlite3';
import path from 'path';
const dbPath = path.join(__dirname, 'news_table.db');
// desliga a chatice do TS
const db = new Database(dbPath, { verbose: console.log });
export default db;
//# sourceMappingURL=db.js.map