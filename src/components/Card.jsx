import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
	const getPreview = (text, wordLimit = 20) => {
		if (typeof text !== "string") return "No content.";
		const trimmed = text.trim();
		if (trimmed === "") return "No content.";
		const words = trimmed.split(/\s+/);
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(" ") + "..."
			: trimmed;
	};

	const preview = getPreview(blog.content);

	return (
		<div className="card">
		<div className="card__title">
		<Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
		</div>
		<div className="card__date">{new Date(blog.date_created).toLocaleDateString()}</div>
		<p>{preview}</p>
		</div>
	);
};

export default Card;
