import React from 'react';


import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


const GET_COLLECTIONS = gql`
    {
        collections{
            id
            title
            items{
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
        {
            ({loading, data}) => {
               if(loading) return <Spinner/>
               return <CollectionsOverview collections={data.collections}/> 
            }
        }
    </Query>
);

export default CollectionsOverviewContainer;