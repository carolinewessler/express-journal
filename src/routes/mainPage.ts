import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const user = (req.session as any).user;
  res.render('mainPage', { user });
});

export default router;

// (req, res) => {
//   const user = (req.session as any).user;
//   res.render('mainPage', { user });
// }