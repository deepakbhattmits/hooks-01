import React from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        <IngredientList />
      </section>
    </div>
  );
}

export default Ingredients;
