import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Components/CartContext";
import { imageMap } from "../Components/imageMap";
import { API_URL } from "../config";

const initialMenuItems = [
  { id: 1, name: "Spring Rolls", price: 5.99, category: "Appetizers" },
  { id: 2, name: "Garlic Bread", price: 4.99, category: "Appetizers" },
  { id: 3, name: "Guacamole", price: 4.99, category: "Appetizers" },
  { id: 4, name: "Spicy Lebanese Potatos", price: 4.99, category: "Appetizers" },
  { id: 5, name: "Warak Enab", price: 4.99, category: "Appetizers" },
  { id: 6, name: "Hummos", price: 4.99, category: "Appetizers" },
  { id: 7, name: "Baba Ghanoush", price: 4.99, category: "Appetizers" },
  { id: 8, name: "French Fries", price: 4.99, category: "Appetizers" },
  { id: 9, name: "Wedges Fries", price: 4.99, category: "Appetizers" },
  { id: 10, name: "Onion Rings", price: 4.99, category: "Appetizers" },
  { id: 11, name: "Cheese Balls", price: 4.99, category: "Appetizers" },
  { id: 12, name: "Mozzarela Sticks", price: 4.99, category: "Appetizers" },

  { id: 13, name: "Grilled Chicken Plate", price: 12.99, category: "OurPlates" },
  { id: 14, name: "Grilled Beef Plate", price: 12.99, category: "OurPlates" },
  { id: 15, name: "Beef Mushroom Steak Plate", price: 14.99, category: "OurPlates" },
  { id: 16, name: "Chicken Mushroom Plate", price: 4.99, category: "OurPlates" },
  { id: 17, name: "Salmon Fillet Plate", price: 15.99, category: "OurPlates" },
  { id: 18, name: "Escalope Plate", price: 4.99, category: "OurPlates" },
  { id: 19, name: "Shrimp Plate", price: 4.99, category: "OurPlates" },

  { id: 20, name: "Classic Beef Burger", price: 8.99, category: "BeefBurgers" },
  { id: 21, name: "Cheeseburger", price: 9.99, category: "BeefBurgers" },
  { id: 22, name: "Mushroom Burger", price: 8.6, category: "BeefBurgers" },

  { id: 23, name: "Classic Chicken Burger", price: 7.99, category: "ChickenBurgers" },
  { id: 24, name: "Zinger Burger", price: 8.99, category: "ChickenBurgers" },
  { id: 25, name: "Crunchy Chicken Burger", price: 4.99, category: "ChickenBurgers" },

  { id: 26, name: "Chicken Sub", price: 6.99, category: "Sandwiches" },
  { id: 27, name: "Escalope", price: 7.99, category: "Sandwiches" },
  { id: 28, name: "Philladelphia", price: 7.99, category: "Sandwiches" },
  { id: 29, name: "Shrimp", price: 4.99, category: "Sandwiches" },

  { id: 30, name: "Greek Salad", price: 5.99, category: "Salads" },
  { id: 31, name: "Caesar Salad", price: 6.99, category: "Salads" },
  { id: 32, name: "Fattoush", price: 4.99, category: "Salads" },
  { id: 33, name: "Tabbouleh", price: 4.99, category: "Salads" },

  { id: 34, name: "Margherita Pizza", price: 9.99, category: "Pizza" },
  { id: 35, name: "Pepperoni Pizza", price: 10.99, category: "Pizza" },
  { id: 36, name: "Vegetarian Pizza", price: 11.99, category: "Pizza" },
  { id: 37, name: "Shrimp Pizza", price: 12.99, category: "Pizza" },

  { id: 38, name: "Spaghetti Bolognese", price: 10.99, category: "Pasta" },
  { id: 39, name: "Fettuccine Alfredo", price: 11.99, category: "Pasta" },
  { id: 40, name: "Tomato Sauce Pasta", price: 12.99, category: "Pasta" },
  { id: 41, name: "Shrimp Pasta", price: 13.99, category: "Pasta" },

  { id: 42, name: "Garlic Sauce", price: 1.99, category: "DippingSauces" },
  { id: 43, name: "Cheddar Sauce", price: 1.99, category: "DippingSauces" },
  { id: 44, name: "Barbecue Sauce", price: 1.99, category: "DippingSauces" },
  { id: 45, name: "Ranch Sauce", price: 1.99, category: "DippingSauces" },
  { id: 46, name: "Honey Mustard Sauce", price: 1.99, category: "DippingSauces" },

  { id: 47, name: "Coca-Cola", price: 1.99, category: "Drinks" },
  { id: 48, name: "Pepsi", price: 1.99, category: "Drinks" },
  { id: 49, name: "Sprite", price: 1.99, category: "Drinks" },
  { id: 50, name: "Lemonade", price: 2.49, category: "Drinks" },
];

const categories = [
  { label: "All", value: "All" },
  { label: "Appetizers", value: "Appetizers" },
  { label: "Our Plates", value: "OurPlates" },
  { label: "Beef Burgers", value: "BeefBurgers" },
  { label: "Chicken Burgers", value: "ChickenBurgers" },
  { label: "Sandwiches", value: "Sandwiches" },
  { label: "Salads", value: "Salads" },
  { label: "Pizza", value: "Pizza" },
  { label: "Pasta", value: "Pasta" },
  { label: "Dipping Sauces", value: "DippingSauces" },
  { label: "Drinks", value: "Drinks" },
];

// preview: on the home page, show only the first few dishes plus a link to the full menu
function Menu({ preview = false }) {
  const [items, setItems] = useState(initialMenuItems);
  const [category, setCategory] = useState("All");
  const [justAdded, setJustAdded] = useState(null);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading menu from backend:", err));
  }, []);

  const cleanMenuItems = items.map((item) => ({
    ...item,
    price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
  }));

  const filteredItems =
    category === "All"
      ? cleanMenuItems
      : cleanMenuItems.filter((item) => item.category === category);

  const shownItems = preview ? filteredItems.slice(0, 8) : filteredItems;

  const handleAdd = (item) => {
    addToCart(item);
    setJustAdded(item.id);
    setTimeout(() => setJustAdded((id) => (id === item.id ? null : id)), 1400);
  };

  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head">
          {preview ? <h2 className="section-h">Our menu</h2> : <h1>Our menu</h1>}
          <p>Mezze to share, plates from the grill, and something for everyone else at the table.</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="menu-filters">
        <div className="wrap">
          <div className="chips" role="toolbar" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`chip${category === cat.value ? " active" : ""}`}
                aria-pressed={category === cat.value}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <h2 className="menu-section-title">
          {category === "All"
            ? "Everything"
            : categories.find((c) => c.value === category)?.label}
          <small>{filteredItems.length} dishes</small>
        </h2>

        <div className="dish-grid">
          {shownItems.map((item) => {
            const added = justAdded === item.id;
            return (
              <article key={item.id} className="dish">
                <div className="dish-photo">
                  <img
                    src={imageMap[item.name] || item.Image}
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <div className="dish-line">
                  <h3 className="dish-name">{item.name}</h3>
                  <span className="dish-dots" aria-hidden="true" />
                  <span className="dish-price">${item.price.toFixed(2)}</span>
                </div>
                <button
                  className={`btn btn-outline${added ? " added" : ""}`}
                  onClick={() => handleAdd(item)}
                  aria-live="polite"
                >
                  {added ? "Added to cart" : "Add to cart"}
                </button>
              </article>
            );
          })}
        </div>

        {preview && filteredItems.length > shownItems.length && (
          <div className="menu-more">
            <Link to="/menu" className="btn btn-primary">See all {filteredItems.length} dishes</Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
