import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	const [showTopics, setShowTopics] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<nav>
		<Link to="/">Home</Link>

		<div className="dropdown-wrapper">
		<div className="dropdown-button" onClick={() => setOpenMenu(!openMenu)}>☰</div>

		<ul className={`links ${openMenu ? 'open' : ''}`}>
		<li>
		<div
		className="dropdown"
		onMouseEnter={() => setShowTopics(true)}
		onMouseLeave={() => setShowTopics(false)}
		style={{ cursor: 'pointer' }}
		>
		Topics
		{showTopics && (
			<div className="dropdown-menu">
			<div><Link to="/category/health">Health</Link></div>
			<div><Link to="/category/wealth">Wealth</Link></div>
			<div><Link to="/category/philosophy">Philosophy</Link></div>
			<div><Link to="/category/life">Life</Link></div>
			</div>
		)}
		</div>
		</li>
		<li><Link to="/about">About</Link></li>
		<li><Link to="/archive">Archive</Link></li>
		<li><Link to="/contact">Contact</Link></li>
		</ul>
		</div>
		</nav>
	);
}
