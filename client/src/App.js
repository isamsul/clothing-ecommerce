import React, { useEffect, lazy, Suspense } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

import { GlobalStyle } from "./global.styles";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/shop/*" element={<ShopPage />} />
            {/* <Route index path=":collectionId" element={<CollectionPage />} /> */}
            {/* </Route> */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/signin"
              element={
                currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />
              }
            />
            <Route path="*" element="Page Not Found" />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
