import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';


import Homepage from './pages/homepages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component {
  unsubcribeFromAuth = null
  componentDidMount() {

    const { setCurrentUser,collectionsArray } = this.props;
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
      addCollectionAndDocuments('collections',collectionsArray)
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
  collectionsArray: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);