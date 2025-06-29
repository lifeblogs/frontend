import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
	const [showTopics, setShowTopics] = useState(false);

	return (
		<nav>
		<Link to="/">Home</Link> |{' '}
		<span
		onMouseEnter={() => setShowTopics(true)}
		onMouseLeave={() => setShowTopics(false)}
		style={{ cursor: 'pointer' }}
		>
		Topics v
		{showTopics && (
			<div>
			<div><Link to="/category/health">Health</Link></div>
			<div><Link to="/category/wealth">Wealth</Link></div>
			<div><Link to="/category/philosophy">Philosophy</Link></div>
			<div><Link to="/category/life">Life</Link></div>
			</div>
		)}
		</span>
		{' | '}
		<Link to="/about">About</Link> |{' '}
		<Link to="/archive">Archive</Link> |{' '}
		<Link to="/contact">Contact</Link>
		</nav>
	);
};

export default Navbar;
