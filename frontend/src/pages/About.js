import React from "react";
import { Link } from "react-router-dom";

import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";

function About() {
  return (
    <section className="page">
      <div className="wrap about">
        <div className="about-text">
          <h2>About us</h2>
          <p>
            We're passionate about serving delicious food made from the freshest ingredients.
            Our kitchen moves between Lebanese classics like hummus, warak enab and fattoush
            and the grill: chicken, beef and seafood plates cooked to order.
          </p>
          <p>
            The dining room is low-lit and unhurried, made for long dinners and second rounds of mezze.
          </p>
          <Link to="/menu" className="btn btn-outline">Browse the menu</Link>
        </div>

        <div className="about-photos">
          <img className="about-photo-main" src={img2} alt="Our candle-lit dining room" />
          <img className="about-photo-small" src={img1} alt="Cooking over the flame in our kitchen" />
        </div>
      </div>
    </section>
  );
}

export default About;
