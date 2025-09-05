import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Subscribe from "../components/Subscribe.jsx";
import Testimonies from "../components/Testimonies.jsx";


function Home() {

	const cats = [{'name': 'health', 'desc': 'Tips and insights for a stronger body and mind.'}, 
		{'name': 'wealth', 'desc': 'Practical ideas for growing and managing your money.'},
		{'name': 'philosophy', 'desc': 'Thought-provoking takes on how to think and live.'},
		{'name': 'life', 'desc': 'Reflections on everyday moments, meaning, and growth.'}];
	const [blogs, setBlogs] = useState({});
	const [activeCat, setCat] = useState('health');
	const [loading, setLoading] = useState(true);

	const getReadTime = (text, wpm = 200) => {
		if (typeof text !== "string") return "0 min read";
		const wordCount = text.trim().split(/\s+/).length;
		const minutes = Math.ceil(wordCount / wpm);
		return `${minutes}-minute read`;
	};

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs/thisweek`, {
					credentials: 'include'
				});
				const data = await res.json();
				const map = {};
				for (const blog of data) {
					map[blog.category] = blog;
				}
				setBlogs(map);
			} catch (err) {
				console.error('Error fetching blogs:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchBlogs();
	}, []);

	const current = blogs[activeCat];

	return (
		<>
		<div className="hero">
		<div className="hero__name">Four Paths. One Journey. Weekly Reflections on Life.</div>
		<div className="hero__desc">Every week, we bring you simple, thought-provoking articles across four timeless themes — Health, Wealth, Philosophy, and Life. Read, reflect, and grow a little every Sunday.</div>
		</div>

		<div className="heroine">
		<div className="heroine__cats">
		{cats.map(cat => (
			<div
			key={cat.name}
			className={`heroine__cat ${activeCat === cat.name ? 'active' : ''}`}
			onClick={() => setCat(cat.name)}
			>
			{cat.name}
			<div className="heroine__catdesc">
			{cat.desc}
			</div>
			</div>
		))}
		</div>

		<div className="heroine__content">
		{loading ? (
			<p>Loading…</p>
		) : current ? (
			<>
			<center>
			<div className="cat__name">
			<span className="cat__read">{getReadTime(current.content)}</span>
			</div>
			<h3>{current.title}</h3>
			</center>
			<ReactMarkdown style="margin-top: 10px">{current.content}</ReactMarkdown>
			<center className="readmore"><Link to={`/category/${current.category}`}>Explore related articles &#8599;</Link></center>
			</>
		) : (
			<p>No post found for “{activeCat}”.</p>
		)}
		</div>
		</div>

		<section className="subscribe">
		<h1>Subscribe to the Newsletter</h1>
		<p>
		Get it served fresh right through email each week; type your address and we will deliver the weekly articles to you. Launching in a few weeks, get early access!
		</p>
		<Subscribe />
		</section>

		<hr />

		<section>
			<h1>About Us</h1>
			<p>This is about us.</p>
		</section>

		<Testimonies />
		</>
	);
}

export default Home;
