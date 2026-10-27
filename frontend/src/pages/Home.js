import React from "react";
import { Link } from "react-router-dom";
import About from "./About";
import Menu from "./Menu";
import Contact from "./Contact";
import heroImg from "../images/img1.jpg";

function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-img" src={heroImg} alt="A chef flambéing a pan over an open flame" />
        <div className="wrap hero-content">
          <h1>Cooked over fire, shared at the table.</h1>
          <p className="hero-lede">
            Lebanese mezze and charcoal-grilled plates, alongside burgers, pizza and pasta.
            Order for delivery or come in and sit down.
          </p>
          <div className="hero-ctas">
            <Link to="/menu" className="btn btn-primary">See the menu</Link>
            <Link to="/contact" className="btn btn-ghost-light">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="info-strip" aria-label="Opening hours and contact">
        <div className="wrap">
          <div className="info-item">
            <strong>Open Monday to Saturday</strong>
            <span>9:00 AM – 11:00 PM</span>
          </div>
          <div className="info-item">
            <strong>Call to order</strong>
            <span>+961 07 727 272</span>
          </div>
          <div className="info-item">
            <strong>Free delivery</strong>
            <span>On every order</span>
          </div>
        </div>
      </section>

      <div className="home-section"><About /></div>
      <div className="home-section"><Menu preview /></div>
      <div className="home-section"><Contact /></div>
    </>
  );
}

export default Home;
