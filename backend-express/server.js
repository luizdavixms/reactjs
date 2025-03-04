const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Crie ou abra o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Banco de dados SQLite conectado');
  }
});

// Criação de uma tabela, se não existir
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');
});


// Inicialize o Express
const app = express();

app.use(cors());
app.use(express.json());  // Para processar o corpo das requisições em JSON

// Rota para pegar todos os usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM acesso', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;


  console.log(req.body);
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  stmt.run([name, email], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao adicionar usuário', error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
  stmt.run([name, email, id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ id, name, email });
  });
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  stmt.run([id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  });
});

// Inicie o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
