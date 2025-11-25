import express from 'express';
import bcrypt from 'bcryptjs';
import { usersDB } from '../database/login/usersDB.js'; // ajusta o caminho se precisar
const router = express.Router();
router.get('/register', (req, res) => {
    res.render('register'); // tua view EJS que você mostrou
});
router.post('/register', async (req, res) => {
    const { login, password } = req.body;
    try {
        // 1. gerar hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        // 2. preparar o insert
        const stmt = usersDB.prepare(`
      INSERT INTO users (login, password_hash)
      VALUES (?, ?)
    `);
        // 3. executar o insert
        stmt.run(login, hashedPassword);
        // 4. redirecionar pra tela de login ou home
        res.redirect('/login');
    }
    catch (err) {
        console.error(err);
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            // login já existe
            return res.status(400).send('Esse login já está em uso. Tenta outro.');
        }
        res.status(500).send('Erro ao registrar usuário.');
    }
});
export default router;
//# sourceMappingURL=registerRoute.js.map