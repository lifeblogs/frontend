import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";

import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Blog from "./pages/Blog";
import Archive from "./pages/Archive";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";


function App() {
	return (
		<div className="wrapper">
		<Router>
		<NavBar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/category/:name" element={<Category />} />
			<Route path="/blog/:slug" element={<Blog />} />
			<Route path="/archive" element={<Archive />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/admin-login" element={<AdminLogin />} /> 
		</Routes>
		<Footer />
		</Router>
		</div>
	)
}

export default App
