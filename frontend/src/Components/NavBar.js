import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cartContext } from "./CartContext";

const links = [
  { to: "/home", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function NavBar() {
  const { cart } = useContext(cartContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/home" className="brand">Eat Chic</Link>

        <nav id="site-links" className={`nav-links${open ? " open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-link" aria-label={`Cart, ${count} items`}>
            Cart <span className="cart-count">{count}</span>
          </Link>
          <Link to="/menu" className="btn btn-primary nav-order">Order now</Link>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-links"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
