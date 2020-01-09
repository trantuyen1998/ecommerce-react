import React from 'react';

import './collection.styles.scss';
import { selectCollection } from '../../redux/shop/shop.selector';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';
import {CollectionItemsContainer,CollectionPageContainer, CollectionTitle} from './collection.styles';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(
        ownProps.match.params.collectionId
    )(state)// curring function - get url params
})

export default connect(mapStateToProps)(CollectionPage);