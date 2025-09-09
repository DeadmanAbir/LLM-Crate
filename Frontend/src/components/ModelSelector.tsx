import React, { useState } from "react";
import {
	Search,
	ChevronDown,
	Zap,
	Diamond,
	Star,
	Lock,
	Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Model {
	name: string;
	label: string;
	icon: React.ReactNode;
	available: boolean;
	selected?: boolean;
	premium?: boolean;
}

interface ModelSelectorProps {
	isOpen: boolean;
	onClose: () => void;
	selectedModel: string;
	onSelectModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
	isOpen,
	onClose,
	selectedModel,
	onSelectModel,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showAll, setShowAll] = useState(false);

	const models: Model[] = [
		{
			name: "gemini-2.5-flash",
			label: "Gemini 2.5 Flash",
			icon: <Diamond className="h-4 w-4" />,
			available: true,
			selected: selectedModel === "gemini-2.5-flash",
		},
		{
			name: "gemini-2.5-flash-lite",
			label: "Gemini 2.5 Flash Lite",
			icon: <Zap className="h-4 w-4" />,
			available: true,
		},
		{
			name: "gemini-2.5-flash-image",
			label: "Gemini 2.5 Flash Image",
			icon: <Diamond className="h-4 w-4 opacity-50" />,
			available: false,
			premium: true,
		},
		{
			name: "gemini-2.5-pro",
			label: "Gemini 2.5 Pro",
			icon: <Star className="h-4 w-4 opacity-50" />,
			available: false,
			premium: true,
		},
		{
			name: "claude-3.5-sonnet",
			label: "Claude 3.5 Sonnet",
			icon: <Star className="h-4 w-4 opacity-50" />,
			available: false,
			premium: true,
		},
		{
			name: "gpt-4o",
			label: "GPT-4o",
			icon: <Star className="h-4 w-4 opacity-50" />,
			available: false,
			premium: true,
		},
	];

	const filteredModels = models.filter((model) =>
		model.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const displayedModels = showAll ? filteredModels : filteredModels.slice(0, 4);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 glass-strong shadow-glass rounded-xl overflow-hidden animate-scale-in">
				{/* Header */}
				<div className="p-4 border-b border-border-glass">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search models..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 chat-input"
						/>
					</div>
				</div>

				{/* Upgrade Banner */}
				<div className="p-4 bg-gradient-primary/10 border-b border-border-glass">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-foreground">
								Unlock all models + higher limits
							</p>
							<p className="text-lg font-semibold text-primary">
								$8{" "}
								<span className="text-sm font-normal text-muted-foreground">
									/month
								</span>
							</p>
						</div>
						<Button size="sm" className="bg-gradient-primary hover:opacity-90">
							Upgrade now
						</Button>
					</div>
				</div>

				{/* Models List */}
				<div className="max-h-80 overflow-y-auto">
					{displayedModels.map((model) => (
						<button
							key={model.name}
							onClick={() => {
								if (model.available) {
									onSelectModel(model.name);
									onClose();
								}
							}}
							disabled={!model.available}
							className={`w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors ${
								!model.available
									? "opacity-50 cursor-not-allowed"
									: "cursor-pointer"
							} ${model.selected ? "bg-primary/10" : ""}`}
						>
							<div className="flex items-center gap-3">
								{model.icon}
								<span className="text-sm font-medium">{model.label}</span>
								{!model.available && (
									<Lock className="h-3 w-3 text-muted-foreground" />
								)}
							</div>
							{model.selected && <Check className="h-4 w-4 text-primary" />}
						</button>
					))}
				</div>

				{/* Show All Toggle */}
				{filteredModels.length > 4 && (
					<div className="p-2 border-t border-border-glass">
						<button
							onClick={() => setShowAll(!showAll)}
							className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							<span>
								{showAll
									? "Show less"
									: `Show all (${filteredModels.length - 4} more)`}
							</span>
							<ChevronDown
								className={`h-4 w-4 transition-transform ${
									showAll ? "rotate-180" : ""
								}`}
							/>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModelSelector;
