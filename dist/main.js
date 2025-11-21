import express from 'express';
import session from 'express-session';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mainPage from './routes/mainPage.js';
import loginRoute from './routes/loginRoute.js';
import { autenticarExclusive } from './middlewares/autenticarExclusive.js';
import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
app.use(express.static(join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// configuração da sessão
app.use(session({
    secret: 'chave', // usado para assinar o cookie
    resave: false,
    saveUninitialized: false,
    cookie: { /*maxAge: 1000 * 60 * 60*/} // 1 hora (ou o que quiser)
}));
// configuração das views
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '../src/views'));
app.get('/', mainPage); // página inicial
app.use('/login', loginRoute); // login
app.get('/exclusive/:id', autenticarExclusive, (req, res) => {
    const { id } = req.params;
    const user = req.session.user;
    res.render('exclusivePage', { user, id });
});
app.get('/exclusive/dashboard', autenticarExclusive, (req, res) => {
    const user = req.session.user;
    res.render('exclusiveDashboard', { user });
});
app.get('/cars', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/');
    }
    res.render('cars', { user });
});
app.get('/politics', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/');
    }
    res.render('politics', { user });
});
app.get('/gossip', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/');
    }
    res.render('gossip', { user });
});
// logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar sessão:', err);
        }
        res.redirect('/');
    });
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map