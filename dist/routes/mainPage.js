import { Router } from "express";
const router = Router();
router.get('/', (req, res) => {
    const user = req.session.user;
    res.render('mainPage', { user });
});
export default router;
// (req, res) => {
//   const user = (req.session as any).user;
//   res.render('mainPage', { user });
// }
//# sourceMappingURL=mainPage.js.map