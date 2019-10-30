import React, { useReducer, useCallback } from "react";

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
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
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
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, []);


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
    </div>
  );
};

export default Ingredients;
