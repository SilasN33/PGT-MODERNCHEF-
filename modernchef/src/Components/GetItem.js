import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ItemCard = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
`;

const ItemImage = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
    margin-right: 20px;
`;

const ItemDetails = styled.div`
    flex: 1;
`;

const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ItemName = styled.h2`
    margin: 0;
    color: #333;
`;

const ItemDetail = styled.p`
    margin: 5px 0;
    color: #666;
    font-size: 0.9rem;
`;

const DetailGroup = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 10px;
`;

const DetailItem = styled.div`
    text-align: center;
    color: #333;
`;

const DetailValue = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const DetailLabel = styled.div`
    font-size: 0.8rem;
`;

function GetItem() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/receitas');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            {items.map(item => (
                <ItemCard key={item._id}>
                    {item.imagemUrl && <ItemImage src={item.imagemUrl} alt={item.nome} />}
                    <ItemDetails>
                        <ItemHeader>
                            <ItemName>{item.nome}</ItemName>
                        </ItemHeader>
                        <ItemDetail>Ingredientes:</ItemDetail>
                        <ul>
                            {item.ingredientes.map((ingrediente, index) => (
                                <ItemDetail as="li" key={index}>
                                    {ingrediente.nome} - {ingrediente.quantidade}
                                </ItemDetail>
                            ))}
                        </ul>
                        <ItemDetail>Modo de Preparo:</ItemDetail>
                        <ul>
                            {item.modo_preparo.map((etapa, index) => (
                                <ItemDetail as="li" key={index}>{etapa}</ItemDetail>
                            ))}
                        </ul>
                        <DetailGroup>
                            <DetailItem>
                                <DetailValue>{item.calorias}</DetailValue>
                                <DetailLabel>Calorias</DetailLabel>
                            </DetailItem>
                            <DetailItem>
                                <DetailValue>{item.porcoes}</DetailValue>
                                <DetailLabel>Porções</DetailLabel>
                            </DetailItem>
                            <DetailItem>
                                <DetailValue>{item.tipo}</DetailValue>
                                <DetailLabel>Tipo</DetailLabel>
                            </DetailItem>
                        </DetailGroup>
                        <ItemDetail>Nutrientes:</ItemDetail>
                        <ul>
                            {item.nutrientes.map((nutriente, index) => (
                                <ItemDetail as="li" key={index}>
                                    {nutriente.nome} - {nutriente.quantidade}
                                </ItemDetail>
                            ))}
                        </ul>
                    </ItemDetails>
                </ItemCard>
            ))}
        </div>
    );
}

export default GetItem;