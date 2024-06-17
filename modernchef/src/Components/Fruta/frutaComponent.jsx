import React, { useState } from 'react';
import './frutaComponent.css'; // Você pode usar o mesmo CSS ou criar um específico para frutas

function Fruta() {
  const [showDetails, setShowDetails] = useState(false);

  const fruitInfo = {
    name: "Laranja Lima",
    benefits: [
      "Rica em Vitamina C",
      "Ajuda a fortalecer o sistema imunológico",
      "Contribui para a saúde da pele",
      "Reduz o risco de doenças cardíacas"
    ],
    description: "A laranja lima é conhecida por seu sabor suave e doce, sendo menos ácida do que outras variedades. É muito apreciada por crianças e pessoas com estômago sensível."
  };

  return (
    <div className="fruit">
      <h2>{fruitInfo.name}</h2>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Ver Menos' : 'Ver Mais'}
      </button>
      {showDetails && (
        <div className="fruit-details">
          <h2>Benefícios</h2>
          <ul>
            {fruitInfo.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <h2>Descrição</h2>
          <p>{fruitInfo.description}</p>
        </div>
      )}
    </div>
  );
}

export default Fruta;
