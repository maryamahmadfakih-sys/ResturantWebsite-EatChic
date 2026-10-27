import React, { createContext, useState } from "react";
import { API_URL } from "../config";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // 2. Remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 3. Update item quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // 4. Submit Order to MySQL Backend
  const checkout = async () => {
    if (cart.length === 0) return null;

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: totalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart([]); // Clear cart after checkout
        return data.orderId;
      } else {
        alert("Checkout failed. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Can't reach the server right now. Please try again in a minute.");
      return null;
    }
  };

  return (
    <cartContext.Provider
      value={{ cart, addToCart, removeItem, updateQuantity, checkout }}
    >
      {children}
    </cartContext.Provider>
  );
};