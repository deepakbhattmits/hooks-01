import React, { useContext } from 'react'
import { AuthContext } from './context/auth-context'
import Ingredients from './components/Ingredients/Ingredients'
import Auth from './components/Auth'

const App = () => {
  const authContext = useContext(AuthContext);
  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Ingredients />
  }
  return content;
};

export default App;
