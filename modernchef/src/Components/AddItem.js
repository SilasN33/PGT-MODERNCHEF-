import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Card = styled.div`
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const AddItem = () => {
    const [nome, setNome] = useState('');
    const [ingredientes, setIngredientes] = useState([{ nome: '', quantidade: '' }]);
    const [modoPreparo, setModoPreparo] = useState(['']);
    const [calorias, setCalorias] = useState('');
    const [porcoes, setPorcoes] = useState('');
    const [tipo, setTipo] = useState('');
    const [nutrientes, setNutrientes] = useState([{ nome: '', quantidade: '' }]);
    const [imagem, setImagem] = useState(null);

    const handleChange = (index, event, state, setState) => {
        const values = [...state];
        values[index][event.target.name] = event.target.value;
        setState(values);
    };

    const handleAddFields = (setState, state) => {
        setState([...state, { nome: '', quantidade: '' }]);
    };

    const handleRemoveFields = (index, setState, state) => {
        const values = [...state];
        values.splice(index, 1);
        setState(values);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImagem(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('calorias', calorias);
        formData.append('porcoes', porcoes);
        formData.append('tipo', tipo);
        formData.append('ingredientes', JSON.stringify(ingredientes));
        formData.append('modo_preparo', JSON.stringify(modoPreparo));
        formData.append('nutrientes', JSON.stringify(nutrientes));
        if (imagem) {
            formData.append('imagem', imagem);
        }

        try {
            await axios.post('http://localhost:5000/receitas', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Receita adicionada com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar receita:', error);
        }
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                {ingredientes.map((ingrediente, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            placeholder="Ingrediente"
                            name="nome"
                            value={ingrediente.nome}
                            onChange={event => handleChange(index, event, ingredientes, setIngredientes)}
                        />
                        <Input
                            type="text"
                            placeholder="Quantidade"
                            name="quantidade"
                            value={ingrediente.quantidade}
                            onChange={event => handleChange(index, event, ingredientes, setIngredientes)}
                        />
                        <Button type="button" onClick={() => handleRemoveFields(index, setIngredientes, ingredientes)}>Remover</Button>
                    </div>
                ))}
                <Button type="button" onClick={() => handleAddFields(setIngredientes, ingredientes)}>Adicionar Ingrediente</Button>

                {modoPreparo.map((etapa, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            placeholder={`Modo de Preparo ${index + 1}`}
                            value={etapa}
                            onChange={(e) => {
                                const values = [...modoPreparo];
                                values[index] = e.target.value;
                                setModoPreparo(values);
                            }}
                        />
                        <Button type="button" onClick={() => {
                            const values = [...modoPreparo];
                            values.splice(index, 1);
                            setModoPreparo(values);
                        }}>Remover</Button>
                    </div>
                ))}
                <Button type="button" onClick={() => setModoPreparo([...modoPreparo, ''])}>Adicionar Modo de Preparo</Button>

                <Input
                    type="number"
                    placeholder="Calorias"
                    value={calorias}
                    onChange={(e) => setCalorias(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Porções"
                    value={porcoes}
                    onChange={(e) => setPorcoes(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />

                {nutrientes.map((nutriente, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            placeholder="Nutriente"
                            name="nome"
                            value={nutriente.nome}
                            onChange={event => handleChange(index, event, nutrientes, setNutrientes)}
                        />
                        <Input
                            type="number"
                            placeholder="Quantidade"
                            name="quantidade"
                            value={nutriente.quantidade}
                            onChange={event => handleChange(index, event, nutrientes, setNutrientes)}
                        />
                        <Button type="button" onClick={() => handleRemoveFields(index, setNutrientes, nutrientes)}>Remover</Button>
                    </div>
                ))}
                <Button type="button" onClick={() => handleAddFields(setNutrientes, nutrientes)}>Adicionar Nutriente</Button>

                <Input type="file" onChange={handleImageChange} />
                <Button type="submit">Adicionar</Button>
            </Form>
        </Card>
    );
};

export default AddItem;