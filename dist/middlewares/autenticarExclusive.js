export function autenticarExclusive(req, res, next) {
    const user = req.session?.user;
    if (!user || user.role !== 'exclusive') {
        return res
            .status(403)
            .send('<h1>Acesso restrito a membros exclusivos</h1><a href="/">Voltar</a>');
    }
    next();
}
//# sourceMappingURL=autenticarExclusive.js.map