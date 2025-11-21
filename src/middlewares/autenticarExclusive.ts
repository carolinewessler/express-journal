import type { Request, Response, NextFunction } from 'express';

export function autenticarExclusive(req: Request, res: Response, next: NextFunction) {
  const user = (req.session as any)?.user;

  if (!user || user.role !== 'exclusive') {
    return res
      .status(403)
      .send('<h1>Acesso restrito a membros exclusivos</h1><a href="/">Voltar</a>');
  }

  next();
}
