import React from "react";
import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { Outlet, Routes, Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { collection, firestore, onSnapshot, convertCollectionsSnapShotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

import './shop.styles.scss';
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, 'collections');
    this.unsubscribeFromSnapShot = onSnapshot(collectionRef, (snapShot) => {
      const collectionsMap = convertCollectionsSnapShotToMap(snapShot);
      updateCollections(collectionsMap);
      this.setState({ loading: false })
    });
    console.log('abc')
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapShot();
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={loading} />} />
          <Route path="/:collectionId" element={<CollectionPageWithSpinner isLoading={loading} />} />
        </Routes>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections((collectionsMap)))
});

export default connect(null, mapDispatchToProps)(ShopPage);