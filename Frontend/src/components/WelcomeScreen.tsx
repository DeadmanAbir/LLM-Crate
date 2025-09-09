const WelcomeScreen = () => {
	const categories = [
		{ emoji: "✨", label: "Create" },
		{ emoji: "📖", label: "Explore" },
		{ emoji: "💻", label: "Code" },
		{ emoji: "🎓", label: "Learn" },
	];

	const sampleQuestions = [
		"How does AI work?",
		"Are black holes real?",
		"How many Rs are in the word 'strawberry'?",
		"What is the meaning of life?",
	];

	return (
		<div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
			{/* Main Heading */}
			<h1 className="text-5xl font-semibold text-foreground mb-12 text-center">
				How can I help you?
			</h1>

			{/* Category Grid */}
			<div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-md">
				{categories.map((category, index) => (
					<div key={index} className="category-card group">
						<div className="text-2xl mb-2">{category.emoji}</div>
						<p className="text-sm font-medium text-card-foreground">
							{category.label}
						</p>
					</div>
				))}
			</div>

			{/* Sample Questions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
				{sampleQuestions.map((question, index) => (
					<button
						key={index}
						className="glass p-4 text-left rounded-lg hover-lift hover:bg-card/50 group transition-all duration-200"
					>
						<p className="text-sm text-muted-foreground group-hover:text-card-foreground">
							{question}
						</p>
					</button>
				))}
			</div>

			{/* Subtle hint text */}
			<p className="text-xs text-muted-foreground mt-8 text-center opacity-60">
				Select a category or ask your own question to get started
			</p>
		</div>
	);
};

export default WelcomeScreen;
