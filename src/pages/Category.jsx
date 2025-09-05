import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from "../components/Card.jsx";

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
		<div className="cat__name">
		<Link to={`/category/${name}`}>{name}</Link>
		</div>

		{blogs.length === 0 ? (
			<p>No blog posts yet.</p>
		) : (
			<ol>
			{blogs.map((blog) => (
				<li key={blog.slug} blog={blog}><Link to={`/blog/${blog.slug}`}>{blog.title}</Link> <i>posted on {new Date(blog.date_created).toLocaleDateString()}</i></li>
			))}
			</ol>
		)}
		</div>
	);


}

export default CategoryPage;
