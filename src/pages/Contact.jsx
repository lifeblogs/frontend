function Contact() {

fetch(`${import.meta.env.VITE_API_URL}/test-session`, { credentials: 'include' })
  .then(res => res.json())
  .then(console.log);
	return (
		<>

		This is the contact page.
		
		</>
	);
}

export default Contact;
