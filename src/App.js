import React, { useState } from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import { store } from "./store/store";

function App() {

  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(true);

  const hideCartHandler = () => setShowCart(false);

  return (
    <Provider store={store}>
      <Header onShowCart={showCartHandler} />
      <main>
        {showCart && <Cart onClose={hideCartHandler} />}
        <Meals />
      </main>
    </Provider>
  );
}

export default App;
