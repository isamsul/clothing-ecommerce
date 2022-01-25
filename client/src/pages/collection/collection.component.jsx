import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from "../../redux/shop/shop.selector";

import './collection.styles.scss';

const CollectionPage = (collection) => {
  console.log(collection)
  const { collectionId } = useParams();
  const { title, items } = useSelector(selectCollection(collectionId));
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}

export default CollectionPage;