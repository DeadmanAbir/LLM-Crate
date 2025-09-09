import React from "react";
import Markdown from "react-markdown";
import { withMdx } from "react-markdown-with-mdx";

interface ChatMessageProps {
	message: string;
	isUser: boolean;
	isLoading?: boolean;
}

const TypingIndicator = () => {
	return (
		<div className="flex items-center gap-1 px-4 py-3">
			<div className="flex gap-1">
				<div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
			</div>
			<span className="text-sm text-muted-foreground ml-2">
				AI is thinking...
			</span>
		</div>
	);
};

const MarkdownWithMdx = withMdx(Markdown);

const ChatMessage: React.FC<ChatMessageProps> = ({
	message,
	isUser,
	isLoading = false,
}) => {
	if (isUser) {
		return (
			<div className="flex justify-end px-6 py-3">
				<div className="max-w-3xl">
					<div className="bg-primary/10 rounded-2xl px-4 py-3 border border-primary/20">
						<p className="text-foreground text-sm whitespace-pre-wrap">
							{message}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="px-6 py-6 border-b border-border/30">
			<div className="max-w-4xl mx-auto">
				{isLoading ? (
					<TypingIndicator />
				) : (
					<div className="prose prose-sm max-w-none text-foreground">
						<div className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
							{/* {message} */}
							<MarkdownWithMdx>{message}</MarkdownWithMdx>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatMessage;
