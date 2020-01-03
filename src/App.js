import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';


import Homepage from './pages/homepage.component';
const ShopHats = () => (
  <div>hello</div>
)
function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop/hats' component={ShopHats} />
      </Switch>
    </div>
  );
}

export default App;