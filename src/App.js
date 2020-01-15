import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';


import Homepage from './pages/homepages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import {default as Header} from './components/header/header.container';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import {default as CheckoutPage} from './pages/checkout/checkout.container';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component {
  unsubcribeFromAuth = null
  componentDidMount() {

    const { setCurrentUser, } = this.props;
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //store data in our app
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections',
      // collectionsArray.map(({title, items}) => ({title,items})));
      // // collectionsArray.map return an array of just objects with values
    });

  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => this.props.currentUser ?
              <Redirect to='/' /> : (<SignInAndSignUpPage />)
            }
          />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  // collections: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);