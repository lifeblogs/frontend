import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CategoryPage() {
	const { name } = useParams();
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/blogs?category=${name}`)
			.then((res) => res.json())
			.then((data) => setBlogs(data))
			.catch((err) => console.error(err));
	}, [name]);

	return (
		<div>
		<h2>Category: {name}</h2>
		{blogs.length === 0 ? (
			<p>No blog posts yet.</p>
		) : (
			<ul>
			{blogs.map((blog) => (
				<li key={blog.slug}>
				<Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
				</li>
			))}
			</ul>
		)}
		</div>
	);
}

export default CategoryPage;
