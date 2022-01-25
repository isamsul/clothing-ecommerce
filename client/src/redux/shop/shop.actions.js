import ShopActionTypes from "./shop.types";
import {
  convertCollectionsSnapShotToMap,
  getDocs,
  collection,
  firestore,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(firestore, "collections");
    dispatch(fetchCollectionsStart());
    getDocs(collectionRef)
      .then((snapShot) => {
        const collectionsMap = convertCollectionsSnapShotToMap(snapShot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
        this.setState({ loading: false });
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
