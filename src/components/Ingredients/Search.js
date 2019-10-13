import React, { memo, useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import TextInput from '../UI/TextInput'
import './Search.css';

const Search = memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://hooks-01.firebaseio.com/ingredients.json' + query).then(response => {
          return response.json();
        }).then(respnseData => {
          const loadedIngredients = [];
          for (const key in respnseData) {
            loadedIngredients.push({
              id: key,
              title: respnseData[key].title,
              amount: respnseData[key].amount
            })
          }
          onLoadIngredients(loadedIngredients)
        })
      }
    }, 500)

  }, [enteredFilter, onLoadIngredients, inputRef])
  const handleChange = e => {
    const { id, value } = e.target;
    if (id === 'filter') {
      setEnteredFilter(value)
    }
  }
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label htmlFor='filter' >Filter by Title</label>
          <TextInput refe={inputRef} id='filter' type="text" value={enteredFilter} onChange={handleChange} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
