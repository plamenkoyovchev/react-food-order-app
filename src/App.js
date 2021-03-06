import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(true);

  const hideCartHandler = () => setShowCart(false);

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} />
      <main>
        {showCart && <Cart onClose={hideCartHandler} />}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
