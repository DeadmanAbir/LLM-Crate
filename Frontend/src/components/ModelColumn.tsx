import React, { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelMessage {
	id: string;
	text: string;
	isUser: boolean;
	timestamp: Date;
	isLoading?: boolean;
}

interface ModelColumnProps {
	model: {
		id: string;
		name: string;
		accent: string;
	};
	messages: ModelMessage[];
	isLoading?: boolean;
}

const ModelTypingIndicator = () => {
	return (
		<div className="flex items-center gap-1 px-4 py-3">
			<div className="flex gap-1">
				<div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
			</div>
			<span className="text-xs text-muted-foreground ml-2">Thinking...</span>
		</div>
	);
};

const ModelColumn: React.FC<ModelColumnProps> = ({
	model,
	messages,
	isLoading = false,
}) => {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const handleCopy = (text: string, messageId: string) => {
		navigator.clipboard.writeText(text);
		setCopiedId(messageId);
		setTimeout(() => setCopiedId(null), 2000);
	};

	return (
		<div className="flex flex-col min-w-0 flex-1">
			{/* Model Header */}
			<div className="flex items-center gap-2 p-4 border-b border-border/30">
				<div className={`w-3 h-3 rounded-full bg-${model.accent}`} />
				<h3 className="font-medium text-foreground text-sm">{model.name}</h3>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto">
				{messages.map((message) => (
					<div key={message.id} className="p-4 border-b border-border/20">
						{message.isUser ? (
							<div className="flex justify-end mb-2">
								<div className="bg-primary/10 rounded-2xl px-3 py-2 max-w-[80%] border border-primary/20">
									<p className="text-foreground text-xs whitespace-pre-wrap">
										{message.text}
									</p>
								</div>
							</div>
						) : (
							<div className="space-y-3">
								<div className="prose prose-sm max-w-none text-foreground">
									<div className="text-foreground leading-relaxed whitespace-pre-wrap text-xs">
										{message.text}
									</div>
								</div>

								{/* Response Actions */}
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
										onClick={() => handleCopy(message.text, message.id)}
									>
										{copiedId === message.id ? (
											<span className="text-xs">✓</span>
										) : (
											<Copy className="h-3 w-3" />
										)}
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-7 w-7 p-0 text-muted-foreground hover:text-green-400"
									>
										<ThumbsUp className="h-3 w-3" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-7 w-7 p-0 text-muted-foreground hover:text-red-400"
									>
										<ThumbsDown className="h-3 w-3" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
									>
										<MoreHorizontal className="h-3 w-3" />
									</Button>
								</div>
							</div>
						)}
					</div>
				))}

				{/* Loading State */}
				{isLoading && (
					<div className="p-4">
						<ModelTypingIndicator />
					</div>
				)}
			</div>
		</div>
	);
};

export default ModelColumn;
