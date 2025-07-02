import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Blog() {
	const { slug } = useParams();
	const [blog, setBlog] = useState(null);
	const [error, setError] = useState('');

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
			<Link to={`/category/${blog.category}`}>{blog.category}</Link>
		</div>
		<div>
		<h1>{blog.title}</h1>
		<p>
		<strong>Category:</strong> {blog.category}, <em>posted on {new Date(blog.date_created).toLocaleDateString()}</em>
		</p>
		<ReactMarkdown>{blog.content}</ReactMarkdown>
		<hr />
		</div>

		</>
	);
};

export default Blog;
