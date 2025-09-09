import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Paperclip, Send, Image } from "lucide-react";

interface EnhancedChatInputProps {
	onSendMessage: (message: string) => void;
	mode: "chat" | "compare";
}

const EnhancedChatInput: React.FC<EnhancedChatInputProps> = ({
	onSendMessage,
	mode,
}) => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message.trim());
			setMessage("");
		}
	};

	const placeholder =
		mode === "compare" ? "Ask me anything..." : "Message T3.chat...";

	return (
		<div className="border-t border-border-glass bg-background/50 backdrop-blur-sm">
			<div className="max-w-4xl mx-auto p-6">
				<form onSubmit={handleSubmit} className="relative">
					<div className="flex items-end gap-3 bg-input/50 backdrop-blur-sm border border-border-glass rounded-xl p-3">
						{/* Left side buttons for compare mode */}
						{mode === "compare" && (
							<div className="flex gap-2 pb-2">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
								>
									<Image className="h-4 w-4" />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
								>
									<Paperclip className="h-4 w-4" />
								</Button>
							</div>
						)}

						{/* Text input */}
						<div className="flex-1">
							<Textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder={placeholder}
								className="min-h-[20px] max-h-32 resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSubmit(e);
									}
								}}
							/>
						</div>

						{/* Right side buttons */}
						<div className="flex gap-2 pb-2">
							{mode === "chat" && (
								<>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
									>
										<Paperclip className="h-4 w-4" />
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
									>
										<Search className="h-4 w-4" />
									</Button>
								</>
							)}

							{message.trim() && (
								<Button
									type="submit"
									size="sm"
									className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 text-primary-foreground"
								>
									<Send className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EnhancedChatInput;
