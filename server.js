// Importação das dependências
const express = require('express');
const next = require('next');
const cors = require('cors');
const fs = require('fs');

// Configuração do Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Caminho do ficheiro JSON
const DB_FILE = './db.json';

// Função para ler cartões (array direto)
function lerCartoes() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

// Função para guardar cartões (array direto)
function guardarCartoes(cartoes) {
  fs.writeFileSync(DB_FILE, JSON.stringify(cartoes, null, 2));
}

// Inicialização do servidor
nextApp.prepare().then(() => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // ===== ROTAS DA API =====

  // GET /api/cartoes - Listar todos os cartões
  app.get('/api/cartoes', (req, res) => {
    res.json(lerCartoes());
  });

  // POST /api/cartoes - Criar novo cartão
  app.post('/api/cartoes', (req, res) => {
    const cartoes = lerCartoes();
    const { nome, numero, validade, cor } = req.body;

    const novoCartao = {
      id: cartoes.length ? cartoes[cartoes.length - 1].id + 1 : 1,
      nome,
      numero,
      validade,
      cor
    };

    cartoes.push(novoCartao);
    guardarCartoes(cartoes);
    res.status(201).json(novoCartao);
  });

  // DELETE /api/cartoes/:id - Remover cartão
  app.delete('/api/cartoes/:id', (req, res) => {
    let cartoes = lerCartoes();
    const index = cartoes.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ erro: 'Cartão não encontrado' });

    cartoes.splice(index, 1);
    guardarCartoes(cartoes);
    res.json({ mensagem: 'Cartão removido com sucesso' });
  });

  // Integração com Next.js (rotas não-API)
  app.use((req, res) => {
    return handle(req, res);
  });

  // Iniciar servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor a correr em http://localhost:${PORT}`);
    console.log(`📡 API de cartões disponível em http://localhost:${PORT}/api/cartoes`);
  });
});

