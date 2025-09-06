import { React, useState, useEffect } from "react";
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

	const [activeCat, setCat] = useState(() => {
		return localStorage.getItem("activeCat") || "health"
	});

	const highlightColors = {
		health: "#4A694A",
		wealth: "#4E6A80",
		philosophy: "#4B4C6E",
		life: "#73573B"
	};

	const bgpaths = {
		health: "/bg/health.png",
		wealth: "/bg/wealth.png",
		philosophy: "/bg/philosophy.png",
		life: "/bg/life.png"
	};

	useEffect(() => {
		const color = highlightColors[activeCat] || "#7f543c";
		const bgpicpath = bgpaths[activeCat] || "/health.png";

		document.documentElement.style.setProperty("--col-hl", color);
		document.documentElement.style.setProperty("--bg-pic-path", `url(${bgpicpath})`);

		localStorage.setItem("activeCat", activeCat);
	}, [activeCat]);


	return (
		<Router>
		<NavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
		<div className={`wrapper ${openMenu ? 'blurred' : ''}`}>
		<Routes>
		<Route path="/" element={<Home activeCat={activeCat} setCat={setCat} />} />
		<Route path="/about" element={<About />} />
		<Route path="/category/:name" element={<Category />} />
		<Route path="/blog/:slug" element={<Blog />} />
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
