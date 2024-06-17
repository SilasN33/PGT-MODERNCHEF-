const mongoose = require('mongoose');

const ingredienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidade: { type: mongoose.Schema.Types.Mixed, required: true } // Pode ser número ou string (q.b.)
});

const nutrienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true }
});

const receitaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    modo_preparo: [String],
    calorias: { type: Number, required: true },
    porcoes: { type: Number, required: true },
    tipo: { type: String, required: true },
    nutrientes: [nutrienteSchema],
    imagem: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Receita', receitaSchema);