import React, { useContext } from 'react';

import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import {CollectionItemsContainer,CollectionPageContainer, CollectionTitle} from './collection.styles';
import CollectionsContext from '../../context/collections/collections.context';

const CollectionPage = ({ match }) => {
    const collections = useContext(CollectionsContext);
    const collection = collections[match.params.collectionId]
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

export default CollectionPage;