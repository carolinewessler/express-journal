import express from 'express';
import bcrypt from 'bcryptjs';

import { usersDB } from '../database/login/usersDB.js';
import type { Request, Response } from 'express';

interface User {
  id: number;
  login: string;
  password_hash: string;
}

const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
  res.render('login'); // tua view EJS de login
});

router.post('/login', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  // 1. buscar usuário no banco
  const stmt = usersDB.prepare('SELECT * FROM users WHERE login = ?');
  const user = stmt.get(login) as User | undefined;

  if (!user) {
    return res.status(400).send('Login ou senha inválidos.');
  }

  // 2. comparar a senha digitada com o hash
  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    return res.status(400).send('Login ou senha inválidos.');
  }

  // 3. salvar info na sessão (exemplo)
  // @ts-ignore
  req.session.userId = user.id;

  res.redirect('/area-restrita'); // ou página principal logada
});

export default router;
