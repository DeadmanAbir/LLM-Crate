import React from "react";
import { ExternalLink } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Model {
	id: string;
	name: string;
	accent: string;
	enabled: boolean;
	hasExternalLink?: boolean;
}

interface CompareModelGridProps {
	models: Model[];
	onModelToggle: (modelId: string) => void;
}

const CompareModelGrid: React.FC<CompareModelGridProps> = ({
	models,
	onModelToggle,
}) => {
	return (
		<div className="flex gap-4 overflow-x-auto pb-4 px-6 pt-6">
			{models.map((model) => (
				<div
					key={model.id}
					className="min-w-[200px] bg-card-glass/50 border border-border-glass rounded-xl p-4 transition-all duration-200 hover:bg-card-glass/70"
				>
					<div className="flex items-start justify-between mb-3">
						<div className="flex items-center gap-2">
							<div className={`w-3 h-3 rounded-full bg-${model.accent}`} />
							<h3 className="font-medium text-foreground text-sm">
								{model.name}
							</h3>
						</div>
						{model.hasExternalLink && (
							<ExternalLink className="h-3 w-3 text-muted-foreground" />
						)}
					</div>

					<div className="flex justify-end">
						<Switch
							checked={model.enabled}
							onCheckedChange={() => onModelToggle(model.id)}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default CompareModelGrid;
