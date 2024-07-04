import { useState } from "react";
import BasketPricer from "./components/BasketPricer/BasketPricer";
import ProductSelector from "./components/SelectProduct/SelectProduct";
import OffersList from "./components/OffersList/OffersList";
import {
  buy2Get1FreeOffer,
  sardinesDiscountOffer,
  shampooBuyThreeGetCheapestFreeOffer,
} from "./offers";
import { Catalogue, Product, BasketItem } from "./types";
import "./App.css"; // Import the CSS file

const catalogue: Catalogue = {
  "Baked Beans": { name: "Baked Beans", price: 0.99 },
  Biscuits: { name: "Biscuits", price: 1.2 },
  Sardines: { name: "Sardines", price: 1.89 },
  "Shampoo (Small)": { name: "Shampoo (Small)", price: 2.0 },
  "Shampoo (Medium)": { name: "Shampoo (Medium)", price: 2.5 },
  "Shampoo (Large)": { name: "Shampoo (Large)", price: 3.5 },
};

const products: Product[] = Object.values(catalogue);

const offers = [
  { description: "Baked Beans: buy 2 get 1 free", apply: buy2Get1FreeOffer },
  { description: "Sardines: 25% discount", apply: sardinesDiscountOffer },
  {
    description:
      "Shampoo (Small, Medium, Large): Buy three, get the cheapest one for free",
    apply: shampooBuyThreeGetCheapestFreeOffer,
  },
];

const App = () => {
  const [basket, setBasket] = useState<{ items: BasketItem[] }>({ items: [] });
  const [selectedProduct, setSelectedProduct] = useState<string>(
    products[0].name
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToBasket = () => {
    const product = products.find((p) => p.name === selectedProduct);
    if (product) {
      const item: BasketItem = {
        productName: product.name,
        quantity: quantity,
      };
      setBasket((prevBasket) => {
        const existingItem = prevBasket.items.find(
          (basketItem) => basketItem.productName === item.productName
        );

        let updatedItems;
        if (existingItem) {
          updatedItems = prevBasket.items.map((basketItem) =>
            basketItem.productName === item.productName
              ? { ...basketItem, quantity: basketItem.quantity + item.quantity }
              : basketItem
          );
        } else {
          updatedItems = [...prevBasket.items, item];
        }

        return { ...prevBasket, items: updatedItems };
      });
    }
  };

  const handleClearBasket = () => {
    setBasket({ items: [] });
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>Supermarket Basket Pricer</h1>
        <ProductSelector
          catalogue={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <div className="basket-buttons">
          <button onClick={handleAddToBasket}>Add to Basket</button>
          <button onClick={handleClearBasket}>Clear</button>
        </div>
        <OffersList offers={offers} />
      </div>
      <div className="right-panel">
        <BasketPricer
          basket={basket}
          catalogue={catalogue}
          offers={offers.map((o) => o.apply)}
        />
      </div>
    </div>
  );
};

export default App;
