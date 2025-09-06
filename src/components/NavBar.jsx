import { useState } from 'react';
import { Link } from 'react-router-dom';
import Subscribe from "../components/Subscribe.jsx";


export default function NavBar({openMenu, setOpenMenu}) {

	const [showTopics, setShowTopics] = useState(false);

	return (

		<>
		<nav>

		<Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>

		<ul className={`links ${openMenu ? 'open' : ''}`}>
		<li><Link to="/about" onClick={() => setOpenMenu(false)}>About</Link></li>
		<li><Link to="/contact" onClick={() => setOpenMenu(false)}>Contact</Link></li>
		</ul>

		<div className="nav-right">
			<div className="nav-subscribe">
				<Subscribe />
			</div>
			<div className="dropdown-button" onClick={() => setOpenMenu(!openMenu)}>
				☰
			</div>
		</div>

		</nav>
		</>

	);
}
