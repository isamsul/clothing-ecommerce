import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import './shop.styles.scss';

const CollectionsOverviewContainer = lazy(()=>import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(()=>import('../collection/collection.container'));

const ShopPage = ({ fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return (
    <div className="shop-page">
      <Suspense>
        <Routes>
          <Route path="/" element={<CollectionsOverviewContainer />} />
          <Route path="/:collectionId" element={<CollectionPageContainer />} />
        </Routes>
      </Suspense>
    </div>
  )

}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);