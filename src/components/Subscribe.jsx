import { useState } from "react";


function Subscribe() {

	const [email, setEmail] = useState("");

	function handleSubmit() {
		return
	}


	return (
		<form onSubmit={handleSubmit} className="newsletter-form">
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
