import React from 'react';

import CartIcon from './cart-icon.component';
import { gql } from 'apollo-boost';
import {  graphql } from 'react-apollo';
import { compose } from 'redux';




const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;


const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;


const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
    return (
        <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
    )
};

export default compose(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);