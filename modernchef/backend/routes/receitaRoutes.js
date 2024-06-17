const express = require('express');
const router = express.Router();
const Receita = require('../models/receita');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create
router.post('/', upload.single('imagem'), async (req, res) => {
    const { nome, ingredientes, modo_preparo, calorias, porcoes, tipo, nutrientes } = req.body;

    if (!nome || !ingredientes || !modo_preparo || !calorias || !porcoes || !tipo || !nutrientes) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    let imagem = null;
    if (req.file) {
        imagem = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    const novaReceita = new Receita({
        nome,
        ingredientes: JSON.parse(ingredientes),
        modo_preparo: JSON.parse(modo_preparo),
        calorias,
        porcoes,
        tipo,
        nutrientes: JSON.parse(nutrientes),
        imagem
    });

    try {
        await novaReceita.save();
        res.status(201).send(novaReceita);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const receitas = await Receita.find();
        const receitasComImagem = receitas.map(receita => {
            if (receita.imagem && receita.imagem.data) {
                const base64 = receita.imagem.data.toString('base64');
                const imagemUrl = `data:${receita.imagem.contentType};base64,${base64}`;
                return { ...receita.toObject(), imagemUrl };
            }
            return receita;
        });
        res.status(200).send(receitasComImagem);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Outros endpoints permanecem os mesmos

module.exports = router;