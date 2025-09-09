import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import CompareChat from "./CompareChat";

interface CompareMessage {
	id: string;
	text: string;
	isUser: boolean;
	timestamp: Date;
	modelResponses: {
		[modelId: string]: {
			text: string;
			isLoading: boolean;
		};
	};
}

interface CompareContentProps {
	hasActiveModels: boolean;
	messages: CompareMessage[];
	models: Array<{
		id: string;
		name: string;
		accent: string;
		enabled: boolean;
	}>;
	isLoading: boolean;
}

const CompareContent: React.FC<CompareContentProps> = ({
	hasActiveModels,
	messages,
	models,
	isLoading,
}) => {
	const hasMessages = messages.length > 0;

	return (
		<div className="flex-1 flex flex-col">
			{/* Upgrade Button */}
			<div className="absolute top-6 right-6 z-10">
				<Button
					variant="secondary"
					className="bg-background text-foreground border border-border-glass hover:bg-secondary/50"
				>
					<Sparkles className="h-4 w-4 mr-2" />
					Upgrade to unlock
				</Button>
			</div>

			{/* Main Content Area */}
			{!hasActiveModels ? (
				<div className="flex-1 flex items-center justify-center">
					<div className="max-w-2xl mx-auto text-center px-6">
						<div className="mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Sparkles className="h-8 w-8 text-primary" />
							</div>
							<h2 className="text-2xl font-semibold text-foreground mb-2">
								Select models to compare
							</h2>
							<p className="text-muted-foreground">
								Choose multiple AI models above to see how they respond to the
								same prompt
							</p>
						</div>
					</div>
				</div>
			) : hasMessages ? (
				<CompareChat
					models={models}
					messages={messages}
					isLoading={isLoading}
				/>
			) : (
				<div className="flex-1 flex items-center justify-center">
					<div className="max-w-4xl mx-auto w-full px-6">
						<div className="text-center mb-8">
							<h2 className="text-xl font-semibold text-foreground mb-2">
								Ready to compare responses
							</h2>
							<p className="text-muted-foreground">
								Enter your prompt below to see how different models respond
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompareContent;
