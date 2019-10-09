import React, { memo, useState } from 'react'
import TextInput from '../UI/TextInput'
import Button from '../UI/Button'

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = memo(props => {
  const [inputState, setInputState] = useState({ title: '', amount: '' })
  const submitHandler = e => {
    e.preventDefault();
    console.log('TEST : ', inputState)    // ...
  };
  const handleChange = e => {
    const { id, value } = e.target;
    if (id === 'title') {
      setInputState(prevInputState => ({
        title: value,
        ampount: prevInputState.amount,
      }))
    }
    if (id === 'amount') {
      setInputState(prevInputState => ({
        amount: value,
        title: prevInputState.title,
      }))
    }
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <TextInput type="text" id="title" value={inputState.title ? inputState.title : ''} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <TextInput type="number" id="amount" value={inputState.amount ? inputState.amount : ''} onChange={handleChange} />
          </div>
          <div className="ingredient-form__actions">
            <Button type="submit">Add Ingredient</Button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
