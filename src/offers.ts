// src/offers.ts

import { Offer } from "./types";

export const buy2Get1FreeOffer: Offer = {
  description: "Buy 2 get 1 free on Baked Beans",
  apply: (basket, catalogue) => {
    let discount = 0;
    const item = basket.items.find((i) => i.productName === "Baked Beans");
    if (item) {
      const freeItems = Math.floor(item.quantity / 3);
      discount = freeItems * catalogue[item.productName].price;
    }
    return discount;
  },
};

export const sardinesDiscountOffer: Offer = {
  description: "25% off on Sardines",
  apply: (basket, catalogue) => {
    let discount = 0;
    const item = basket.items.find((i) => i.productName === "Sardines");
    if (item) {
      discount = item.quantity * catalogue[item.productName].price * 0.25;
    }
    return discount;
  },
};

export const shampooBuyThreeGetCheapestFreeOffer: Offer = {
  description: "Buy three, get the cheapest one free on Shampoo",
  apply: (basket, catalogue) => {
    const shampooProducts = [
      "Shampoo (Large)",
      "Shampoo (Medium)",
      "Shampoo (Small)",
    ];
    const shampooItems = basket.items
      .filter((item) => shampooProducts.includes(item.productName))
      .flatMap((item) =>
        Array(item.quantity).fill(catalogue[item.productName].price)
      );

    if (shampooItems.length < 3) {
      return 0;
    }

    // Sort prices in ascending order
    shampooItems.sort((a, b) => a - b);

    // Calculate discount for every set of three items
    let discount = 0;
    for (let i = 0; i + 2 < shampooItems.length; i += 3) {
      discount += shampooItems[i]; // Add the cheapest item in the group of three
    }

    return discount;
  },
};

export const offers: Offer[] = [
  buy2Get1FreeOffer,
  sardinesDiscountOffer,
  shampooBuyThreeGetCheapestFreeOffer,
];
