import React, { useState } from 'react';
import './recipeComponent.css';

function RecipeComponent() {
  const [showDetails, setShowDetails] = useState(false);

  const recipe = {
    title: "Salada de Frutas com Amêndoas",
    ingredients: [
      "1 cup butter, softened",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "3 cups all-purpose flour",
      "1 teaspoon baking soda",
      "2 teaspoons hot water",
      "1/2 teaspoon salt",
      "2 cups semisweet chocolate chips"
    ],
    instructions: "Preheat oven to 350 degrees F (175 degrees C). Cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. Dissolve baking soda in hot water. Add to batter along with salt. Stir in flour, chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans. Bake for about 10 minutes in the preheated oven, or until edges are nicely browned."
  };

  return (
    <div className="recipe">
      <h2>{recipe.title}</h2>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Ver Menos' : 'Ver Mais'}
      </button>
      {showDetails && (
        <div className="recipe-details">
          <h2>Ingredientes</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Modo de Preparo</h2>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeComponent;
