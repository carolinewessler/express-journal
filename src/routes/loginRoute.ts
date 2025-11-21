import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { login, senha } = req.body;

  // lê variáveis do .env
  const adminUser = process.env.LOGIN_ADMIN;
  const adminPass = process.env.LOGIN_PASSWORD;

  const exclusiveUser = process.env.LOGIN_EXCLUSIVE;
  const exclusivePass = process.env.EXCLUSIVE_PASSWORD;

  // login admin
  if (login === adminUser && senha === adminPass) {
    (req.session as any).user = { name: login, role: 'admin' };
    console.log(`${login} autenticado com sucesso`);
    return res.redirect('/');
  }

  // login exclusive
  if (login === exclusiveUser && senha === exclusivePass) {
    (req.session as any).user = { name: login, role: 'exclusive' };
    console.log(`${login} autenticado com sucesso`);
    return res.redirect('/exclusive/dashboard');
  }

  res.send('<h1>Login inválido</h1><a href="/">Voltar</a>');
});

export default router;
