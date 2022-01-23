import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStart} from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";

import './shop.styles.scss';

class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  componentWillUnmount() {
    // this.unsubscribeFromSnapShot();
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionsOverviewContainer />} />
          <Route path="/:collectionId" element={<CollectionPageContainer />} />
        </Routes>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);