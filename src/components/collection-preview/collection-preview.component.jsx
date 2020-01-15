import React from 'react';

import './collection-preview.styles.scss';
import {default as CollectionItem} from '../collection-item/collection-item.container';
const CollectionPreview= ({title, items, history, match}) => (
    <div className='collection-preview'>
        <h1
            className='title'
            onClick={() => history.push(`${match.patch}/${title.toLowerCase()}`)}
        >{title.toUpperCase()}</h1>
        <div className="preview">
            {
                items
                .filter((item,idx) => idx < 4)
                .map((item) => (
                    <CollectionItem  key={item.id} item = {item}/>           
                ))
            }
        </div>
    </div>
)

export default CollectionPreview;