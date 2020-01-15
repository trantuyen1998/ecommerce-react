import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


import { ApolloProvider } from 'react-apollo';
import { createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
    uri: 'https://crwn-clothing.com'
})

const cache = new InMemoryCache();


const client = new ApolloClient({
    link: httpLink,
    cache: cache,
    resolvers,
    typeDefs
});


client.writeData({
    data: {
        cartHidden: true,
        cartItems: [],
        itemCount: 0
    }
})



ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
