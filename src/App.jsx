import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
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

	const [openMenu, setOpenMenu] = useState(false);
	return (
		<Router>
		<NavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
		<div className={`wrapper ${openMenu ? 'blurred' : ''}`}>
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
		</div>
		<Footer />
		</Router>
	)
}

export default App
