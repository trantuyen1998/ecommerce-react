import React from 'react';

import CartDropdown from './cart-dropdown.component';
import { gql } from 'apollo-boost';
import { Mutation, Query } from 'react-apollo';




const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;


const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;


const CartDropdownContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => (
                <Query query={GET_CART_ITEMS}>
                    {
                        ({ data: { cartItems } }) => (
                            <CartDropdown
                                cartItems={cartItems}
                                toggleCartHidden={toggleCartHidden}
                            />
                        )
                    }
                </Query>
            )
        }
    </Mutation>
)

export default CartDropdownContainer;