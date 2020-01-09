import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// get collections data

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections)
                         .map(key => collections[key]) : []//return array data
)

export const selectCollection = collectionUrlParam => 
createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
)

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

// fig errer child item

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections ///truthly
)