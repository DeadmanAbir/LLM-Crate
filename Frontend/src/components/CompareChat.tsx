import React from "react";
import ModelColumn from "./ModelColumn";

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

interface CompareChatProps {
	models: Array<{
		id: string;
		name: string;
		accent: string;
		enabled: boolean;
	}>;
	messages: CompareMessage[];
	isLoading: boolean;
}

const CompareChat: React.FC<CompareChatProps> = ({
	models,
	messages,
	isLoading,
}) => {
	const activeModels = models.filter((model) => model.enabled);

	// Transform messages for each model
	const getModelMessages = (modelId: string) => {
		const modelMessages: any[] = [];

		messages.forEach((message) => {
			// Add user message
			if (message.isUser) {
				modelMessages.push({
					id: message.id,
					text: message.text,
					isUser: true,
					timestamp: message.timestamp,
				});
			} else {
				// Add model response if it exists
				const response = message.modelResponses[modelId];
				if (response) {
					modelMessages.push({
						id: `${message.id}-${modelId}`,
						text: response.text,
						isUser: false,
						timestamp: message.timestamp,
						isLoading: response.isLoading,
					});
				}
			}
		});

		return modelMessages;
	};

	return (
		<div className="flex-1 flex overflow-hidden">
			{activeModels.map((model, index) => (
				<div
					key={model.id}
					className={`flex-1 border-border/30 ${
						index < activeModels.length - 1 ? "border-r" : ""
					}`}
				>
					<ModelColumn
						model={model}
						messages={getModelMessages(model.id)}
						isLoading={isLoading}
					/>
				</div>
			))}
		</div>
	);
};

export default CompareChat;
