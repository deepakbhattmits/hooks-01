import React, { useState, useEffect,useReducer, useCallback } from "react";

import IngredientForm from "./IngredientForm";

import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {

    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there !');

  }
}
const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...curHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...curHttpState, error: null }
    default:
      throw new Error('Should not get there !');
  }
}
const Ingredients = () => {

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })

  const filteredIngredientHandeler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, []);
  const listener = e => {

    let stickyContainer = document.getElementById("sticky-container");
console.log(document.scrollingElement.scrollTop, stickyContainer && stickyContainer.offsetTop ? stickyContainer.offsetTop : 0);
    if(document.scrollingElement.scrollTop < 100) {
      setLastScrollTop(false)
    } else {
      setLastScrollTop(true)
    }
  
  };
  useEffect(()=>{
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  })


  const addIngredientsHandler = ingredients => {
    // setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch('https://hooks-01.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      return response.json();
    }).then(respnseData => {
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients,
      //   { id: respnseData.name, ...ingredients }
      // ]);
      dispatch({ type: 'ADD', ingredient: { id: respnseData.name, ...ingredients } })
    })

  };

  const removeIngredientHandler = ingredientId => {
    // setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch(`https://hooks-01.firebaseio.com/ingredients/${ingredientId}.jon`, {
      method: 'DELETE'
    }).then(response => {
      // setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      // setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
      dispatch({ type: 'DELETE', id: ingredientId })
    }).catch(
      error => {
        // setError(error.message)
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong !' })
        // setIsLoading(false)
      }
    )
  }
  const clearError = () => {
    // setError(null);
    dispatchHttp({ type: 'CLEAR' })
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError} >{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredientsHandler={addIngredientsHandler} isLoading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandeler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
      <section id='sticky-container'>
      
        he is me
        {lastScrollTop&&<div>hello i am runing</div>}
      </section>
    </div>
  );
};

export default Ingredients;
