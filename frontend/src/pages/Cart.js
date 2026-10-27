import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../Components/CartContext";
import { imageMap } from "../Components/imageMap";

function Cart() {
  const { cart, removeItem, updateQuantity, checkout } = useContext(cartContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const orderId = await checkout();
    if (orderId) {
      alert(`Order placed successfully! Your Order ID is: ${orderId}`);
      navigate(`/track-order/${orderId}`);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="page">
        <div className="wrap empty">
          <h1>Your cart is empty</h1>
          <p>Pick a few dishes from the menu and they'll show up here.</p>
          <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head">
          <h1>Your cart</h1>
          <p>{itemCount} {itemCount === 1 ? "item" : "items"}, ready when you are.</p>
        </div>

        <div className="cart-layout">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-row">
                <img src={imageMap[item.name] || item.Image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <span className="unit">${Number(item.price).toFixed(2)} each</span>
                </div>

                <div className="qty">
                  <button
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    aria-label={`Add one ${item.name}`}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="line-total">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary btn-block">
              Place order
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
