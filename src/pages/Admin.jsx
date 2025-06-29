import { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function Admin() {
	const [isAuthorized, setIsAuthorized] = useState(null);
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('health');
	const [content, setContent] = useState('');
	const [blogs, setBlogs] = useState([]);
	const [editId, setEditId] = useState(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/admin/protected`, {
			credentials: 'include'
		})
			.then(res => {
				if (res.ok) {
					setIsAuthorized(true);
					fetchBlogs();
				} else {
					window.location.href = '/admin-login';
				}
			});
	}, []);

	const fetchBlogs = async () => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);
		const data = await res.json();
		setBlogs(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const blogData = { title, category, content };

		const url = `${import.meta.env.VITE_API_URL}/blogs${editId ? '/' + editId : ''}`;
		const method = editId ? 'PUT' : 'POST';

		const res = await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(blogData),
			credentials: 'include'
		});

		if (res.ok) {
			setMessage(editId ? 'Blog updated!' : 'Blog created!');
			setTitle('');
			setCategory('health');
			setContent('');
			setEditId(null);
			fetchBlogs();
		} else {
			setMessage('Error saving blog');
		}
	};

	const handleDelete = async (id) => {
		if (!confirm('Are you sure you want to delete this blog?')) return;
		await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		});
		fetchBlogs();
	};

	const handleEdit = (blog) => {
		setTitle(blog.title);
		setCategory(blog.category);
		setContent(blog.content);
		setEditId(blog.id);
	};

	if (isAuthorized === null) return <p>Checking authorization...</p>;

	return (
		<div style={{ padding: '1rem' }}>
		<h2>{editId ? 'Edit Blog' : 'Add Blog'}</h2>
		<form onSubmit={handleSubmit}>
		<div>
		<label>Title:</label><br />
		<input value={title} onChange={(e) => setTitle(e.target.value)} required />
		</div>
		<div>
		<label>Category:</label><br />
		<select value={category} onChange={(e) => setCategory(e.target.value)}>
		<option value="health">Health</option>
		<option value="wealth">Wealth</option>
		<option value="philosophy">Philosophy</option>
		<option value="life">Life</option>
		</select>
		</div>
		<div>
		<label>Content (Markdown supported):</label><br />
		<SimpleMDE value={content} onChange={setContent} />
		</div>
		<button type="submit">{editId ? 'Update' : 'Add'} Blog</button>
		</form>

		{message && <p>{message}</p>}

		<h3 style={{ marginTop: '2rem' }}>All Blogs</h3>
		<ul>
		{blogs.map(blog => (
			<li key={blog.id} style={{ marginBottom: '1rem' }}>
			<strong>{blog.title}</strong> ({blog.category})
			<br />
			<button onClick={() => handleEdit(blog)}>Edit</button>{' '}
			<button onClick={() => handleDelete(blog.id)}>Delete</button>
			</li>
		))}
		</ul>
		</div>
	);
}

export default Admin;
