import React, { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {

  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(true);

  const hideCartHandler = () => setShowCart(false);

  return (
    <Fragment>
      <Header onShowCart={showCartHandler} />
      <main>
        {showCart && <Cart onClose={hideCartHandler} />}
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
