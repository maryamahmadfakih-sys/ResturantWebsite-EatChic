import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <Link to="/home" className="brand">Eat Chic</Link>
          <p>Lebanese mezze and grill plates, plus the burgers, pizza and pasta our regulars come back for.</p>
        </div>
        <div>
          <h3>Opening hours</h3>
          <ul>
            <li>Monday to Saturday</li>
            <li>9:00 AM – 11:00 PM</li>
          </ul>
        </div>
        <div>
          <h3>Find us</h3>
          <ul>
            <li>Lebanon</li>
            <li><a href="tel:+96107727272">+961 07 727 272</a></li>
            <li><Link to="/contact">Send us a message</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        &copy; {new Date().getFullYear()} Eat Chic. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
