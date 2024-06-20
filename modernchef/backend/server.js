const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicialize o Express antes de usá-lo
const app = express();
const PORT = 5000; // Certifique-se de que a porta está correta

app.use(cors()); // Ativa o CORS
app.use(express.json());

const uri = 'mongodb+srv://teste:1234@cluster0.qnbvwjt.mongodb.net/receita_final33?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('connection error:', err));

// Rotas - Movido para depois da inicialização do Express
const receitaRoutes = require('./routes/receitaRoutes');
app.use('/receitas', receitaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});