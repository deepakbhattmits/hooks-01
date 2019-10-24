import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";

import IngredientList from "./IngredientList";
import Search from "./Search";

import ErrorModal from '../UI/ErrorModal'
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    setIsLoading(true)
    fetch('https://hooks-01.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false)
      return response.json();
    }).then(respnseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: respnseData.name, ...ingredients }
      ]);
    })

  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    fetch(`https://hooks-01.firebaseio.com/ingredients/${ingredientId}.jsn`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
    }).catch(
      error => {
        setError(error.message)
        setIsLoading(false)
      }
    )
  }
  const clearError = () => {
    setError(null);

  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError} />}
      <IngredientForm onAddIngredientsHandler={addIngredientsHandler} isLoading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandeler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
