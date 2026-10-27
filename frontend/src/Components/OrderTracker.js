import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";


const STAGES = [
  { label: "Order Placed" },
  { label: "Preparing" },
  { label: "Ready for Delivery" },
  { label: "Delivered" },
];

function OrderTracker() {
  const { orderId: urlOrderId } = useParams();
  const [searchId, setSearchId] = useState(urlOrderId || "");
  const [activeOrder, setActiveOrder] = useState(null);
  const [, setLoading] = useState(false);

  // Helper function to map order status to stage index
  const getCurrentStageIndex = (status) => {
    const index = STAGES.findIndex(
      (stage) => stage.label.toLowerCase() === status?.toLowerCase()
    );
    return index !== -1 ? index : 0;
  };

  const fetchOrder = async (id) => {
  if (!id) return;
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/api/orders/${id}`);
    if (res.ok) {
      const data = await res.json();

      // Ensure data.items is always an Array
      let parsedItems = data.items;
      if (typeof parsedItems === "string") {
        try {
          parsedItems = JSON.parse(parsedItems);
        } catch (e) {
          parsedItems = [];
        }
      }

      setActiveOrder({
        ...data,
        items: Array.isArray(parsedItems) ? parsedItems : [],
      });
    } else {
      setActiveOrder(null);
    }
  } catch (err) {
    console.error("Failed to fetch order:", err);
  } finally {
    setLoading(false);
  }
 };

  useEffect(() => {
    if (urlOrderId && urlOrderId !== ":orderId") {
      fetchOrder(urlOrderId);
    }
  }, [urlOrderId]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrder(searchId.trim());
  };

  const currentStep = activeOrder ? getCurrentStageIndex(activeOrder.status) : 0;

  return (
    <section className="page">
      <div className="wrap tracker">
        <div className="page-head">
          <h1>Track your order</h1>
          <p>Enter the order ID you received at checkout.</p>
        </div>

        <form className="track-search" onSubmit={handleSearch}>
          <label htmlFor="order-id" className="visually-hidden">Order ID</label>
          <input
            id="order-id"
            className="input"
            type="text"
            placeholder="e.g. ORD-123456"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Track order</button>
        </form>

        {activeOrder ? (
          <div className="track-card">
            <div className="track-head">
              <div>
                <h2>Order #{activeOrder.id}</h2>
                <p>Placed at {activeOrder.timestamp}</p>
              </div>
              <span className="status-badge">{activeOrder.status}</span>
            </div>

            <ol className="steps">
              {STAGES.map((stage, index) => {
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                return (
                  <li
                    key={stage.label}
                    className={`step${isCompleted ? " done" : ""}${isCurrent ? " current" : ""}`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <div className="step-dot">{isCompleted ? "✓" : index + 1}</div>
                    <span className="step-label">{stage.label}</span>
                  </li>
                );
              })}
            </ol>

            <div className="track-items">
              <h3>Order items</h3>
              {(activeOrder.items || []).map((item) => (
                <div key={item.id} className="track-item">
                  <span>{item.quantity} × {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="track-total">
                <span>Total</span>
                <span>${Number(activeOrder.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="track-empty">
            No order found yet. Place an order from the cart, or enter a valid order ID above.
          </p>
        )}
      </div>
    </section>
  );
}

export default OrderTracker;
