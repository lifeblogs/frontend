import { useState } from "react";


function AdminLogin({ onLogin }) {
	const [passcode, setPasscode] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ passcode }),
			credentials: 'include'
		});

		if (res.ok) {
			window.location.href = '/admin';
		} else {
			alert('Wrong passcode');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
		Enter the pass-code to log into the admin panel:&nbsp;&nbsp;
		<input
		type="password"
		placeholder="(type here)"
		value={passcode}
		onChange={(e) => setPasscode(e.target.value)}
		/>.
		Once typed, click
		<button type="submit">Login</button>.
		</form>
	);
}

export default AdminLogin;
