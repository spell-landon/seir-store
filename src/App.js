import React, { useEffect, useState, useReducer } from 'react';
import Cart from './components/Cart/Cart';
import ProductCard from './components/ProductCard/ProductCard';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.value];
    case 'REMOVE':
      return [
        ...state.slice(0, action.value),
        ...state.slice(action.value + 1),
      ];
    default:
      return state;
  }
};
const useProductsApi = () => {
  const [products, setProducts] = useState([]);

  const updateProducts = () => {
    fetch('https://run.mocky.io/v3/8f6209d6-f1db-482c-9599-4e79af45adbf')
      .then((res) => res.json())
      .then((res) => setProducts(res))
      .catch((error) => console.log(`Oops! There was an error: ${error}`));
  };
  useEffect(() => {
    updateProducts();
  }, []);
  return products;
};

function App() {
  const products = useProductsApi();
  console.log(products);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, updateCartItems] = useReducer(cartReducer, []);

  const addProductToCart = (index) => {
    updateCartItems({ type: 'ADD', value: products[index] });
    setCartOpen(true);
  };

  const removeProductFromCart = (index) => {
    updateCartItems({ type: 'REMOVE', value: index });
  };

  return (
    <div className='App'>
      <header>
        <h1>SEIR Store</h1>
        <nav>
          <button onClick={() => setCartOpen(!cartOpen)}>
            <img
              width='30'
              src='https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png'
              alt='Shopping cart icon'
            />
          </button>
        </nav>
      </header>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} removeProductFromCart={removeProductFromCart} cartItems={cartItems}/>
      <main>
        <ul>
          {products.length > 0 ? (
            products.map((product, idx) => (
              <ProductCard
                key={idx}
                index={idx}
                addToCart={addProductToCart}
                product={product}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
