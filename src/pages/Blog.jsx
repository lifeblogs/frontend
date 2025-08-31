import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Blog() {
	const { slug } = useParams();
	const [blog, setBlog] = useState(null);
	const [error, setError] = useState('');


	const getReadTime = (text, wpm = 200) => {
		if (typeof text !== "string") return "0 min read";
		const wordCount = text.trim().split(/\s+/).length;
		const minutes = Math.ceil(wordCount / wpm);
		return `${minutes}-minute read`;
	};

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/blogs/${slug}`)
			.then((res) => {
				if (!res.ok) throw new Error('Blog not found');
				return res.json();
			})
			.then((data) => setBlog(data))
			.catch((err) => setError(err.message));
	}, [slug]);

	if (error) return <p>{error}</p>;
	if (!blog) return <p>Loading...</p>;

	return (
		<>

		<div className="cat__name">
		<Link to={`/category/${blog.category}`}>{blog.category}</Link>&nbsp;&nbsp;&nbsp;&nbsp;|
			&nbsp;&nbsp;&nbsp;<span class="cat__read">{getReadTime(blog.content)}</span>
		</div>
		<div>
		<h2>{blog.title}</h2>
		<p>
		<em>Posted on {new Date(blog.date_created).toLocaleDateString()}</em>
		</p>
		<ReactMarkdown>{blog.content}</ReactMarkdown>
		<hr />
		</div>

		</>
	);
};

export default Blog;
