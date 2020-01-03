import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';


import Homepage from './pages/homepages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }
  
  unsubcribeFromAuth = null
  componentDidMount(){
    this.unsubcribeFromAuth =  auth.onAuthStateChanged( async user => {
      createUserProfileDocument(user);
    });

  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;