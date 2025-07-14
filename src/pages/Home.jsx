import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Home() {
	const cats = ['health', 'wealth', 'philosophy', 'life'];
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
			key={cat}
			className={`heroine__cat ${activeCat === cat ? 'active' : ''}`}
			onClick={() => setCat(cat)}
			>
			{cat}
			</div>
		))}
		</div>

		<div className="heroine__content">
		{loading ? (
			<p>Loading…</p>
		) : current ? (
			<>
			<div className="cat__name">
			<Link to={`/category/${current.category}`}>{current.category}</Link>&nbsp;&nbsp;&nbsp;&nbsp;|
			&nbsp;&nbsp;&nbsp;<span class="cat__read">{getReadTime(current.content)}</span>
			</div>
			<h2>{current.title}</h2>
			<ReactMarkdown>{current.content}</ReactMarkdown>
			</>
		) : (
			<p>No post found for “{activeCat}”.</p>
		)}
		</div>
		</div>
		</>
	);
}

export default Home;
