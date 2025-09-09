import React, { useState } from "react";
import { Send, Paperclip, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ModelSelector from "./ModelSelector";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
	const [message, setMessage] = useState("");
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message.trim());
			setMessage("");
		}
	};

	const modelDisplayName =
		selectedModel === "gemini-2.5-flash" ? "Gemini 2.5 Flash" : selectedModel;

	return (
		<>
			<div className="border-t border-border-glass bg-background/80 backdrop-blur-xl">
				<div className="max-w-4xl mx-auto p-4">
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Model Selector */}
						<div className="flex items-center justify-between">
							<button
								type="button"
								onClick={() => setIsModelSelectorOpen(true)}
								className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors text-sm"
							>
								<span className="text-muted-foreground">Model:</span>
								<span className="font-medium">{modelDisplayName}</span>
								<ChevronDown className="h-4 w-4 text-muted-foreground" />
							</button>
						</div>

						{/* Input Area */}
						<div className="relative">
							<div className="flex items-end gap-3 glass p-4 rounded-xl">
								{/* Text Input */}
								<div className="flex-1">
									<Textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Type your message here..."
										className="min-h-[60px] resize-none border-none bg-transparent focus:ring-0 p-0 text-foreground placeholder:text-muted-foreground"
										onKeyDown={(e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault();
												handleSubmit(e);
											}
										}}
									/>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-2">
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="p-2 hover:bg-secondary/50"
									>
										<Paperclip className="h-4 w-4" />
									</Button>

									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="p-2 hover:bg-secondary/50"
									>
										<Search className="h-4 w-4" />
									</Button>

									{message.trim() && (
										<Button
											type="submit"
											size="sm"
											className="bg-gradient-primary hover:opacity-90 transition-opacity"
										>
											<Send className="h-4 w-4" />
										</Button>
									)}
								</div>
							</div>
						</div>

						{/* Footer Text */}
						<p className="text-xs text-muted-foreground text-center opacity-60">
							T3.chat can make mistakes. Consider checking important
							information.
						</p>
					</form>
				</div>
			</div>

			{/* Model Selector Modal */}
			<ModelSelector
				isOpen={isModelSelectorOpen}
				onClose={() => setIsModelSelectorOpen(false)}
				selectedModel={selectedModel}
				onSelectModel={setSelectedModel}
			/>
		</>
	);
};

export default ChatInput;
