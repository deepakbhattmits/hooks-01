import React, { useState, useEffect, useReducer, useCallback } from "react";

import IngredientForm from "./IngredientForm";

import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from '../UI/ErrorModal'
import videoUrl from '../../assets/videos/react-hooks-01-intro.mp4'

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

  const [autoPlay, setAutoPlay] = useState(false);

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })

  const filteredIngredientHandeler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, []);
  const listener = e => {
    let elem = document.querySelector('#videoRef');

    let elemMain = document.querySelector('#videoMain');
    let bounding = elem.getBoundingClientRect();
    console.log(bounding.top, bounding.bottom, window.screen.height)
    // checking whether fully visible
    if (bounding.top >= 0 && bounding.bottom <= window.screen.height) {
      console.log('Element is fully visible in screen');
      setAutoPlay(true)
      elemMain.setAttribute('autoPlay', autoPlay)

    } else {
      setAutoPlay(false)
      elemMain.setAttribute('autoPlay', autoPlay)
    }

    // checking for partial visibility
    // if (bounding.top <= window.screen.height && bounding.bottom >= 0) {
    //   console.log('Element is partially visible in screen');
    //   setAutoPlay(false)
    // }
    // if (parseInt(bounding.bottom + 4) === elem.offsetTop) {
    //   setAutoPlay(true)
    // } else {
    //   setAutoPlay(false)
    // }

  };
  useEffect(() => {

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
    fetch(`https://hooks-01.firebaseio.com/ingredients/${ingredientId}.json`, {
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
      {`HI ${autoPlay}`}
      {httpState.error && <ErrorModal onClose={clearError} >{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredientsHandler={addIngredientsHandler} isLoading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandeler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>

      <section>

        yes i am partially  visible <span>{autoPlay}</span>

        <div className='visible'>

          i am displayed only on visible

        </div>

      </section>
      <section id="videoRef">
        {`check ${autoPlay}`}
        <video id="videoMain" width="320" height="240" controls={false} autoPlay={false}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>



    </div >
  );
};

export default Ingredients;
