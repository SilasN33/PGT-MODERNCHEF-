import React from 'react';
import Cards from '../Card/cardComponent';
import SearchbarComponent from '../SearchBar/searchbarComponent';
import "./homeComponent.css";

const Home = () => {
  const recipeData = [
    {
      title: "Salada de frutas com amêndoas",
      description: "Banana, maçã, laranja, morango, manga, e um toque de hortelã. Fresquinha e suculenta!",
      time: "15 minutos",
      serves: "Serve 2 pessoas",
      imgSrc: "../Assets/imagem_fundo_login.png"
    },
    {
      title: "Churrasco Dietético com Verduras",
      description: "Uma descrição para o churrasco dietético...",
      time: "30 minutos",
      serves: "Serve 4 pessoas",
      imgSrc: "https://s2-redeglobo.glbimg.com/nuTa0sOZZ-hoALspr80pbseh5-s=/0x0:2000x1333/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/e/O/FcOCQqScGCmqLBxcssww/condor-12.jpg"
    }
  ];

  return (
    <div className='home-page'>
      <header className='hero'>
        <h1 className="title">
          Veja <b>receitas saudáveis</b> para tornar o seu dia a dia mais nutritivo!
        </h1>
        <div className="search-bar-wrapper">
          <SearchbarComponent />
        </div>
        <button className="filter-button">Filtrar por: Mais populares</button>
      </header>
      <main>
        <div className="cards-layout">
          <Cards recipe={recipeData[0]} type="recipe" />
          <Cards type="fruit" />
        </div>
        {/* Outros cards de receitas aqui */}
      </main>
    </div>
  );
}

export default Home;
