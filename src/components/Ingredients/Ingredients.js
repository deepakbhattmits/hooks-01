import React, { useState } from "react";

import IngredientForm from "./IngredientForm";

import IngredientList from "./IngredientList";
import Search from "./Search";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const addIngredientsHandler = ingredients => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredients }
    ]);
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredientsHandler={addIngredientsHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
};

export default Ingredients;
