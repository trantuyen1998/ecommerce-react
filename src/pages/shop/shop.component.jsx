import React from 'react'
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';


class ShopPage extends React.Component {

    unsubcribeFromSnapshot = null; //representation of our collections array

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionsRef = firestore.collection('collections');

        collectionsRef.onSnapshot(
           async snapshot => {
               const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
               updateCollections(collectionsMap); //integrate react and redux
           }
        );//whenever updating and run the first 
    }

    render() {
        const {match} = this.props;
       return (
            // nested route in shoppage
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);