import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
	const [showTopics, setShowTopics] = useState(false);

	return (
		<nav>
		<Link to="/">Home</Link>
		<ul className="links">
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
		</nav>
	);
};

export default Navbar;
