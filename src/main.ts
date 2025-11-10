import express from 'express';
import type { Request, Response, NextFunction } from 'express';
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
    (req.session as any).user = { name: login }; // guarda o usuário na sessão
    console.log(`${login} autenticado com sucesso`);
    return res.redirect('/'); // recarrega a página já logado
  }

  if (login === 'exclusive' && senha === 'abc123') {
    (req.session as any).user = { name: login, role: 'exclusive' }; // guarda o usuário na sessão
    console.log(`${login} autenticado com sucesso`);
    return res.redirect('/exclusive/dashboard'); // recarrega a página já logado
  }

  res.send('<h1>Login inválido</h1><a href="/">Voltar</a>');
});

function autenticarExclusive(req: Request, res: Response, next: NextFunction) {
  const user = (req.session as any).user;

  if (!user || user.role !== 'exclusive') {
    return res.status(403).send('<h1>Acesso restrito a membros exclusivos</h1><a href="/">Voltar</a>');
  }

  next(); // se for exclusive, continua
}

app.get('/exclusive/:id', autenticarExclusive, (req, res) => {
  const { id } = req.params as { id: string };
  const user = (req.session as any).user;

  // conteúdo exclusivo simulado
  const exclusiveContent:Record<string, { title: string; body: string }> = {
    news1: { title: 'Tesla’s secret flying car project', body: 'Leaked details suggest a prototype in 2030.' },
    news2: { title: 'AI predicts next global hit', body: 'Exclusive report from OpenAI labs reveals upcoming trends.' },
    news3: { title: 'Celebrity chef launches interplanetary restaurant', body: 'Reservations start next year on Mars.' }
  };

  const content = exclusiveContent[id];

  if (!content) {
    return res.status(404).send('<h1>Conteúdo não encontrado</h1><a href="/">Voltar</a>');
  }

  res.render('exclusivePage', { user, content });
});

app.get('/exclusive/dashboard', autenticarExclusive, (req, res) => {
  const user = (req.session as any).user;
  res.render('exclusiveDashboard', { user });
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
