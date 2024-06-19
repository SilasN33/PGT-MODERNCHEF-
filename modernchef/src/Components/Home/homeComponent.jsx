import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../Card/cardComponent';
import SearchbarComponent from '../SearchBar/searchbarComponent';
import "./homeComponent.css";

const Home = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/receitas');
        setRecipeData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = recipeData.filter(recipe =>
      recipe.nome.toLowerCase().includes(lowercasedQuery) ||
      recipe.ingredientes.some(ingrediente =>
        ingrediente.nome.toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div className='home-page'>
      <header className='hero'>
        <h1 className="title">
          Veja <b>receitas saudáveis</b> para tornar o seu dia a dia mais nutritivo!
        </h1>
        <div className="search-bar-wrapper">
          <SearchbarComponent onSearch={handleSearch} />
        </div>
        <button className="filter-button">Filtrar por: Mais populares</button>
      </header>
      <main className="cards-layout">
        <div className="cards-column">
          {filteredData.map(recipe => (
            <Cards key={recipe._id} recipe={recipe} type="recipe" />
          ))}
        </div>
        <Cards type="fruit" />
      </main>
    </div>
  );
}

export default Home;