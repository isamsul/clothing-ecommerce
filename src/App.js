import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { Route, Routes } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />

        <Route path="*" element="Page Not Found" />
      </Routes>
    </div>
  );
}

export default App;
