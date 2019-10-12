import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";

import IngredientList from "./IngredientList";
import Search from "./Search";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  // useEffect(() => {
  //   fetch('https://hooks-01.firebaseio.com/ingredients.json').then(response => {
  //     return response.json();
  //   }).then(respnseData => {
  //     const loadedIngredients = [];
  //     for (const key in respnseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: respnseData[key].title,
  //         amount: respnseData[key].amount
  //       })
  //     }
  //     setUserIngredients(loadedIngredients)
  //   })
  // }, [])
  const filteredIngredientHandeler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, []);


  const addIngredientsHandler = ingredients => {
    fetch('https://hooks-01.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(respnseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: respnseData.name, ...ingredients }
      ]);
    })

  };
  return (
    <div className="App">
      <IngredientForm onAddIngredientsHandler={addIngredientsHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandeler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => { }} />
      </section>
    </div>
  );
};

export default Ingredients;
