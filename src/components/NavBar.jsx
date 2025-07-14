import { useState } from 'react';
import { Link } from 'react-router-dom';

function EmailForm() {
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:5000/submit-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		const result = await response.json();
		alert(result.message);
	};

	return (
		<form onSubmit={handleSubmit}>
		<input
		type="email"
		placeholder="Email Address"
		value={email}
		onChange={(e) => setEmail(e.target.value)}
		required
		/>
		<button type="submit">Subscribe to Newsletter</button>
		</form>
	);
}

export default function NavBar({openMenu, setOpenMenu}) {
	const [showTopics, setShowTopics] = useState(false);

	return (

		<>
		<nav>
		<Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>

		<div className="dropdown-button" onClick={() => setOpenMenu(!openMenu)}>☰</div>

		<ul className={`links ${openMenu ? 'open' : ''}`}>
		<li><Link to="/about" onClick={() => setOpenMenu(false)}>About</Link></li>
		<li><Link to="/archive" onClick={() => setOpenMenu(false)}>Archive</Link></li>
		<li><Link to="/contact" onClick={() => setOpenMenu(false)}>Contact</Link></li>
		<li><EmailForm /></li>
		</ul>
		</nav>
		</>

	);
}
