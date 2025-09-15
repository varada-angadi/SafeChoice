// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Search from "./pages/Search";
import Info from "./pages/Info";
import ProductDetails from "./pages/product";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Scan" element={<Scan />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/product/:productName" element={<ProductDetails />} />
        <Route path="/Feedback" element={<Feedback />} />

      </Routes>
    </Router>
  );
}

export default App;
