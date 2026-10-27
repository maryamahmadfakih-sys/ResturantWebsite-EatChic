import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import {CartProvider} from './Components/CartContext';
import OrderTracker from './Components/OrderTracker';
import Login from './pages/Login';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';


function App() {
  return (
    <div className="App">
      <Router>
      {/* NavBar sits inside CartProvider so it can show the cart count */}
      <CartProvider>
      <NavBar />
      <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/track-order/:orderId" element={<OrderTracker/>} />
      </Routes>
      </main>
      <Footer />
     </CartProvider>
     </Router>
    </div>
  );
}

export default App;
