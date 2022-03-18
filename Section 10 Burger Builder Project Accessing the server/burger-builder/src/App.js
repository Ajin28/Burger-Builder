import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import React from 'react';

function App() {

  return (
    <div className="App">
      <Layout >
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
