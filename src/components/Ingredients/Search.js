import React, { memo, useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import TextInput from '../UI/TextInput'
import './Search.css';

import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/http';

const Search = memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const { isLoading, data, error, sendRequest, clear } = useHttp();
  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        sendRequest(`https://hooks-01.firebaseio.com/ingredients.json${query}`, `GET`);
      }
    }, 500)

  }, [enteredFilter, sendRequest, inputRef])
  const handleChange = e => {
    const { id, value } = e.target;
    if (id === 'filter') {
      setEnteredFilter(value)
    }
  }
  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        })
      }
      onLoadIngredients(loadedIngredients)
    }
  }, [isLoading, data, error, onLoadIngredients])
  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label htmlFor='filter' >Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <TextInput refe={inputRef} id='filter' type="text" value={enteredFilter} onChange={handleChange} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
