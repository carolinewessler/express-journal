import express from 'express';
import session from 'express-session';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
  cookie: { /*maxAge: 1000 * 60 * 60*/ } // 1 hora (ou o que quiser)
}));

// configuração das views
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '../src/views'));

// página inicial
app.get('/', (req, res) => {
  const user = (req.session as any).user;
  res.render('mainPage', { user });
});

// login
app.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (login === 'admin' && senha === 'admin') {
    // guarda o usuário na sessão
    (req.session as any).user = { name: login };

    console.log(`${login} autenticado com sucesso`);
    return res.redirect('/'); // recarrega a página já logado
  }

  res.send('<h1>Login inválido</h1><a href="/">Voltar</a>');
});

app.get('/cars', (req, res) => {
  const user = (req.session as any).user;

  if (!user) {
    return res.redirect('/');
  }

  res.render('cars', { user });
});

app.get('/politics', (req, res) => {
  const user = (req.session as any).user;

  if (!user) {
    return res.redirect('/');
  }

  res.render('politics', { user });
});

app.get('/gossip', (req, res) => {
  const user = (req.session as any).user;

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
