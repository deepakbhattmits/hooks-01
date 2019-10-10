import React, { memo, useState } from "react";
// import TextInput from "../UI/TextInput";
import Button from "../UI/Button";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = memo(props => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const submitHandler = e => {
    e.preventDefault();
    props.onAddIngredientsHandler({ title: enteredTitle, amount: enteredAmount })
    // ...
  };
  const handleChange = e => {
    const { id, value } = e.target;
    if (id === "title") {
      setEnteredTitle(value);
    }
    if (id === "amount") {
      setEnteredAmount(value);
    }
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              value={enteredTitle ? enteredTitle : ""}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={handleChange}
              value={enteredAmount ? enteredAmount : ""}
            />
          </div>
          <div className="ingredient-form__actions">
            <Button className="button">Add Ingredient</Button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
