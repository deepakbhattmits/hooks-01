import React from 'react';

import Card from '../UI/Card';
import TextInput from '../UI/TextInput'
import './Search.css';

const Search = React.memo(props => {
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <TextInput type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;
