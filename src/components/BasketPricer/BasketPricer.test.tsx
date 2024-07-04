import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import the custom matchers
import BasketPricer from "./BasketPricer";
import { Basket, Catalogue, Offer } from "../../types";

const mockBasket: Basket = {
  items: [
    { productName: "Apple", quantity: 2 },
    { productName: "Banana", quantity: 3 },
  ],
};

const mockCatalogue: Catalogue = {
  Apple: { name: "Apple", price: 1.0 },
  Banana: { name: "Banana", price: 0.5 },
};

const mockOffers: Offer[] = [
  {
    description: "Buy 2 Apples, get 1 free",
    apply: (basket: Basket, catalogue: Catalogue): number => {
      const appleItem = basket.items.find(
        (item) => item.productName === "Apple"
      );
      if (appleItem && appleItem.quantity >= 2) {
        return catalogue["Apple"].price; // Free 1 Apple
      }
      return 0;
    },
  },
];

describe("BasketPricer", () => {
  test("renders basket summary with correct pricing", () => {
    render(
      <BasketPricer
        basket={mockBasket}
        catalogue={mockCatalogue}
        offers={mockOffers}
      />
    );

    // Check if items are rendered correctly
    expect(screen.getByText("Apple x 2: £2.00")).toBeInTheDocument();
    expect(screen.getByText("Banana x 3: £1.50")).toBeInTheDocument();

    // Check if sub-total is calculated correctly
    expect(screen.getByText("Sub-Total: £3.50")).toBeInTheDocument();

    // Check if discount is applied correctly
    expect(screen.getByText("Discount: £1.00")).toBeInTheDocument();

    // Check if total is calculated correctly
    expect(screen.getByText("Total: £2.50")).toBeInTheDocument();
  });

  test("applies no discount when offers do not apply", () => {
    const basketWithoutOffers: Basket = {
      items: [
        { productName: "Apple", quantity: 1 },
        { productName: "Banana", quantity: 1 },
      ],
    };

    render(
      <BasketPricer
        basket={basketWithoutOffers}
        catalogue={mockCatalogue}
        offers={mockOffers}
      />
    );

    // Check if items are rendered correctly
    expect(screen.getByText("Apple x 1: £1.00")).toBeInTheDocument();
    expect(screen.getByText("Banana x 1: £0.50")).toBeInTheDocument();

    // Check if sub-total is calculated correctly
    expect(screen.getByText("Sub-Total: £1.50")).toBeInTheDocument();

    // Check if no discount is applied
    expect(screen.getByText("Discount: £0.00")).toBeInTheDocument();

    // Check if total is calculated correctly
    expect(screen.getByText("Total: £1.50")).toBeInTheDocument();
  });

  test("applies multiple offers correctly", () => {
    const multipleOffers: Offer[] = [
      ...mockOffers,
      {
        description: "50% off all Bananas",
        apply: (basket: Basket, catalogue: Catalogue): number => {
          const bananaItem = basket.items.find(
            (item) => item.productName === "Banana"
          );
          if (bananaItem) {
            return (catalogue["Banana"].price * bananaItem.quantity) / 2;
          }
          return 0;
        },
      },
    ];

    render(
      <BasketPricer
        basket={mockBasket}
        catalogue={mockCatalogue}
        offers={multipleOffers}
      />
    );

    // Check if items are rendered correctly
    expect(screen.getByText("Apple x 2: £2.00")).toBeInTheDocument();
    expect(screen.getByText("Banana x 3: £1.50")).toBeInTheDocument();

    // Check if sub-total is calculated correctly
    expect(screen.getByText("Sub-Total: £3.50")).toBeInTheDocument();

    // Check if discount is applied correctly
    expect(screen.getByText("Discount: £1.75")).toBeInTheDocument(); // 1 Apple free (£1.00) + 50% off Bananas (£0.75)

    // Check if total is calculated correctly
    expect(screen.getByText("Total: £1.75")).toBeInTheDocument();
  });
});
