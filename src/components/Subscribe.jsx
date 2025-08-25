import { useState, useEffect } from "react";

function Subscribe() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubscribe = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/subscribe`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ email }),
			});

			const data = await res.json();
			setMessage(data.message || data.error);
			setEmail("");
		} catch (err) {
			console.error(err);
			setMessage("Something went wrong!");
		}
	};

	// Show alert when message updates
	useEffect(() => {
		if (message) {
			alert(message);
		}
	}, [message]);

	return (
		<form onSubmit={handleSubscribe} className="newsletter-form">
		<input
		type="email"
		placeholder="Enter your email"
		value={email}
		onChange={(e) => setEmail(e.target.value)}
		required
		/>
		<button type="submit">Subscribe</button>
		</form>
	);
}

export default Subscribe;
