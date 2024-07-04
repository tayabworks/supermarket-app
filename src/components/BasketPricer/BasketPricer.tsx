import { Basket, Catalogue, Offer } from "../../types";

interface BasketPricerProps {
  basket: Basket;
  catalogue: Catalogue;
  offers: Offer[];
}

const BasketPricer = ({ basket, catalogue, offers }: BasketPricerProps) => {
  const { items } = basket;
  const subTotal = items.reduce(
    (total, item) => total + catalogue[item.productName].price * item.quantity,
    0
  );

  let discount = 0;

  offers.forEach((offer) => {
    discount += offer.apply(basket, catalogue);
  });

  const total = subTotal - discount;

  return (
    <div>
      <h2>Basket Summary</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.productName} x {item.quantity}: £
            {(catalogue[item.productName].price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Sub-Total: £{subTotal.toFixed(2)}</p>
      <p>Discount: £{discount.toFixed(2)}</p>
      <p>Total: £{total.toFixed(2)}</p>
    </div>
  );
};

export default BasketPricer;
