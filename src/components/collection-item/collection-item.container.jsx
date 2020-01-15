import React from 'react';

import CollectionItem from './collection-item.component';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!){
        addItemToCart(item: $item) @client
    }
`;

const CollectionItemContainer = (props) => (
    <Mutation mutation={ADD_ITEM_TO_CART}>
        {
            addItemToCart => <CollectionItem
                {...props}
                addItem={item => addItemToCart({ variables: { item } })}
            />
        }
    </Mutation>
)

export default CollectionItemContainer;