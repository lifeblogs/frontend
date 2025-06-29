import { useParams } from 'react-router-dom';
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
		<div>
		<h2>{blog.title}</h2>
		<p>
		<em>Category: {blog.category} | Posted on {new Date(blog.date_created).toLocaleDateString()}</em>
		</p>
		<hr />
		<ReactMarkdown>{blog.content}</ReactMarkdown>
		</div>
	);
};

export default Blog;
