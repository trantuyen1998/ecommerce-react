import React from 'react';

import CartIcon from './cart-icon.component';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';



const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;

const CartIconContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden}/>
        }
    </Mutation>
);

export default CartIconContainer;