import React, { useState } from "react";

interface WelcomeScreenProps {
	message?: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setMessage }) => {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const categories = [
		{ emoji: "✨", label: "Create", id: "create" },
		{ emoji: "📖", label: "Explore", id: "explore" },
		{ emoji: "💻", label: "Code", id: "code" },
		{ emoji: "🎓", label: "Learn", id: "learn" },
	];

	const questionsByCategory = {
		default: [
			"How does AI work?",
			"Are black holes real?",
			"How many Rs are in the word 'strawberry'?",
			"What is the meaning of life?",
		],
		create: [
			"Write a short story about space exploration",
			"Create a marketing plan for a new app",
			"Design a logo concept for a coffee shop",
			"Generate ideas for a birthday party theme",
		],
		explore: [
			"What are the deepest parts of the ocean?",
			"Explain quantum physics in simple terms",
			"What would happen if gravity stopped working?",
			"How do different cultures celebrate new year?",
		],
		code: [
			"Build a todo app with React",
			"Explain how APIs work with examples",
			"Debug this JavaScript function",
			"Create a Python script for data analysis",
		],
		learn: [
			"Teach me about machine learning basics",
			"How can I improve my public speaking?",
			"What's the best way to learn a new language?",
			"Explain photosynthesis step by step",
		],
	};

	const getCurrentQuestions = () => {
		if (!activeCategory) {
			return questionsByCategory.default;
		}
		return (
			questionsByCategory[activeCategory as keyof typeof questionsByCategory] ||
			questionsByCategory.default
		);
	};

	const handleCategoryClick = (categoryId: string) => {
		setActiveCategory(activeCategory === categoryId ? null : categoryId);
	};

	return (
		<div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
			{/* Main Heading */}
			<h1 className="text-5xl font-semibold text-foreground mb-12 text-center">
				How can I help you?
			</h1>

			{/* Category Grid */}
			<div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-md">
				{categories.map((category, index) => (
					<button
						key={index}
						onClick={() => handleCategoryClick(category.id)}
						className={`category-card group transition-all duration-300 cursor-pointer ${
							activeCategory === category.id
								? "bg-primary/20 border-primary/30 shadow-lg scale-105"
								: "hover:bg-card/50"
						}`}
					>
						<div className="text-2xl mb-2">{category.emoji}</div>
						<p
							className={`text-sm font-medium transition-colors ${
								activeCategory === category.id
									? "text-primary font-semibold"
									: "text-card-foreground"
							}`}
						>
							{category.label}
						</p>
					</button>
				))}
			</div>

			{/* Dynamic Sample Questions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
				{getCurrentQuestions().map((question, index) => (
					<button
						key={`${activeCategory}-${index}`}
						onClick={() => {
							setMessage(question);
						}}
						className="glass p-4 text-left rounded-lg hover-lift hover:bg-card/50 group transition-all duration-200"
					>
						<p className="text-sm text-muted-foreground group-hover:text-card-foreground">
							{question}
						</p>
					</button>
				))}
			</div>

			<p className="text-xs text-muted-foreground mt-8 text-center opacity-60">
				{activeCategory
					? `Showing ${
							categories.find((c) => c.id === activeCategory)?.label
					  } questions • Click category again to show all`
					: "Select a category or ask your own question to get started"}
			</p>

			{/* Additional CSS for styling */}
		</div>
	);
};

export default WelcomeScreen;
