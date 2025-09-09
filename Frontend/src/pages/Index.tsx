import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import WelcomeScreen from "@/components/WelcomeScreen";
import CompareModelGrid from "@/components/CompareModelGrid";
import EnhancedChatInput from "@/components/EnhancedChatInput";
import ChatMessage from "@/components/ChatMessage";
import CompareContent from "@/components/CompareContent";
import ChatInput from "@/components/ChatInput";

interface Message {
	id: string;
	text: string;
	isUser: boolean;
	timestamp: Date;
}

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

const Index = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [compareMessages, setCompareMessages] = useState<CompareMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [compareLoading, setCompareLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<"chat" | "compare">("chat");
	const [selectedModels, setSelectedModels] = useState([
		{
			id: "gpt5-nano",
			name: "GPT-5 nano",
			accent: "emerald-500",
			enabled: false,
		},
		{
			id: "gemini25-lite",
			name: "Gemini 2.5 Lite",
			accent: "blue-500",
			enabled: false,
		},
		{
			id: "deepseek-chat",
			name: "DeepSeek Chat",
			accent: "purple-500",
			enabled: false,
		},
		{
			id: "perplexity-sonar",
			name: "Perplexity Sonar",
			accent: "teal-500",
			enabled: false,
			hasExternalLink: true,
		},
		{ id: "claude3", name: "Claude 3", accent: "orange-500", enabled: false },
	]);

	const handleSendMessage = async (messageText: string, model: string) => {
		if (activeTab === "chat") {
			const userMessage: Message = {
				id: Date.now().toString(),
				text: messageText,
				isUser: true,
				timestamp: new Date(),
			};

			console.log("userMessage", userMessage, model);

			setMessages((prev) => [...prev, userMessage]);
			setIsLoading(true);

			// Simulate AI response
			setTimeout(() => {
				const aiMessage: Message = {
					id: (Date.now() + 1).toString(),
					text: "I'm an AI assistant created by Lovable. I can help you with a variety of tasks including answering questions, providing information, and assisting with problem-solving. How can I help you today?",
					isUser: false,
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, aiMessage]);
				setIsLoading(false);
			}, 2000);
		} else {
			// Compare mode
			const userMessage: CompareMessage = {
				id: Date.now().toString(),
				text: messageText,
				isUser: true,
				timestamp: new Date(),
				modelResponses: {},
			};

			setCompareMessages((prev) => [...prev, userMessage]);
			setCompareLoading(true);

			// Get active models
			const activeModels = selectedModels.filter((model) => model.enabled);

			// Create AI responses for each active model
			const aiResponses: {
				[key: string]: { text: string; isLoading: boolean };
			} = {};

			// Mock responses for different models
			const mockResponses = {
				"gpt5-nano": `I'm GPT-5 nano, a compact yet powerful language model. For "${messageText}", I'd approach this by breaking down the core concepts and providing clear, actionable insights. My training emphasizes efficiency and precision in responses.`,
				"gemini25-lite": `As Gemini 2.5 Lite, I process your query "${messageText}" through multimodal understanding. I can analyze text, context, and relationships to provide comprehensive answers with integrated reasoning capabilities.`,
				"deepseek-chat": `DeepSeek Chat here. I specialize in deep reasoning and analytical thinking. For your question about "${messageText}", let me provide a structured analysis with step-by-step reasoning and evidence-based conclusions.`,
				"perplexity-sonar": `Perplexity Sonar combines real-time search with AI reasoning. Regarding "${messageText}", I can provide up-to-date information with source citations and comprehensive research-backed answers.`,
				claude3: `I'm Claude 3, focusing on helpful, harmless, and honest responses. For "${messageText}", I'll provide a balanced perspective considering multiple viewpoints and potential implications while being direct and clear.`,
			};

			activeModels.forEach((model) => {
				aiResponses[model.id] = {
					text:
						mockResponses[model.id as keyof typeof mockResponses] ||
						`This is ${model.name}'s response to: "${messageText}". Each model brings unique capabilities and perspectives to answer your questions.`,
					isLoading: false,
				};
			});

			// Simulate staggered responses
			setTimeout(() => {
				const aiMessage: CompareMessage = {
					id: (Date.now() + 1).toString(),
					text: "",
					isUser: false,
					timestamp: new Date(),
					modelResponses: aiResponses,
				};
				setCompareMessages((prev) => [...prev, aiMessage]);
				setCompareLoading(false);
			}, 2500);
		}
	};

	const handleModelToggle = (modelId: string) => {
		setSelectedModels((prev) =>
			prev.map((model) =>
				model.id === modelId ? { ...model, enabled: !model.enabled } : model
			)
		);
	};

	const handleTabChange = (tab: "chat" | "compare") => {
		setActiveTab(tab);
	};

	const hasMessages = messages.length > 0;

	const hasActiveModels = selectedModels.some((model) => model.enabled);

	return (
		<div
			className="h-screen flex overflow-hidden"
			style={{ background: "var(--gradient-background)" }}
		>
			{/* Left Sidebar */}
			<Sidebar
				isCollapsed={isSidebarCollapsed}
				onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
				activeTab={activeTab}
				onTabChange={handleTabChange}
			/>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col relative">
				{activeTab === "chat" ? (
					<>
						{/* Chat Messages or Welcome Screen */}
						<div className="flex-1 overflow-y-auto">
							{hasMessages ? (
								<div className="max-w-4xl mx-auto">
									{messages.map((message) => (
										<ChatMessage
											key={message.id}
											message={message.text}
											isUser={message.isUser}
										/>
									))}
									{isLoading && (
										<ChatMessage message="" isUser={false} isLoading={true} />
									)}
								</div>
							) : (
								<WelcomeScreen />
							)}
						</div>

						{/* Chat Input */}
						<ChatInput onSendMessage={handleSendMessage} />
						{/* <EnhancedChatInput onSendMessage={handleSendMessage} mode="chat" /> */}
					</>
				) : (
					<>
						{/* Compare Mode */}
						<CompareModelGrid
							models={selectedModels}
							onModelToggle={handleModelToggle}
						/>
						<CompareContent
							hasActiveModels={hasActiveModels}
							messages={compareMessages}
							models={selectedModels}
							isLoading={compareLoading}
						/>
						<EnhancedChatInput
							onSendMessage={handleSendMessage}
							mode="compare"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Index;
