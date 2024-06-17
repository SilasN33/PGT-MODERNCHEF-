// frontend/src/components/DeleteItem.js
import React, { useState } from 'react';
import axios from 'axios';

function DeleteItem() {
    const [id, setId] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:5000/receitas/${id}`);
            alert('Receita removida com sucesso');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button type="submit">Remover</button>
        </form>
    );
}

export default DeleteItem;