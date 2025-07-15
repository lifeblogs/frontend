import React, { useState, useEffect } from "react";


const testimonials = [
	{
		text: "I love starting my Sundays with Seventhday. The wealth articles are always actionable.",
		author: "Ananya S.",
	},
	{
		text: "A thoughtful blend of deep and light content. I never miss the philosophy section.",
		author: "Rohan T.",
	},
	{
		text: "Clean, calm, and relevant. It’s a refreshing alternative to noisy news feeds.",
		author: "Priya M.",
	},
	{
		text: "The productivity tips helped me reset my weekly workflow in just a few reads.",
		author: "Rahul D.",
	},
];

export default function TestimonialCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % testimonials.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (

		<>
		<div className="testimony">
			<div className="testimony__text">
				<div className="testimony__quo">&ldquo;</div>
				<p>{testimonials[currentIndex].text}</p>
				<div className="testimony__quo">&rdquo;</div>
			</div>
			<div className="testimony__author">
				<strong>&mdash; {testimonials[currentIndex].author}</strong>
			</div>
		</div>

		<div className="carousel__dots">
			{testimonials.map((_, index) => (
				<span
				key={index}
				className={`dot ${currentIndex === index ? "active" : ""}`}
				onClick={() => setCurrentIndex(index)}
				/>
			))}
		</div>
		</>
	);
}
