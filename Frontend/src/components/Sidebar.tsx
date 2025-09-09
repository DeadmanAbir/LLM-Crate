import React from "react";
import {
	Search,
	Plus,
	MessageSquare,
	Settings,
	Moon,
	ChevronLeft,
	Menu,
	User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarProps {
	isCollapsed: boolean;
	onToggleCollapse: () => void;
	activeTab: "chat" | "compare";
	onTabChange: (tab: "chat" | "compare") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	isCollapsed,
	onToggleCollapse,
	activeTab,
	onTabChange,
}) => {
	return (
		<div
			className={`${
				isCollapsed ? "w-16" : "w-64"
			} h-screen bg-sidebar glass-strong border-r border-border-glass flex flex-col transition-all duration-300`}
		>
			{/* Header */}
			<div className="p-4 border-b border-border-glass">
				{!isCollapsed ? (
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-xl font-semibold text-foreground">LLM Crate</h1>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" className="p-2">
								<Settings className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="sm" className="p-2">
								<Moon className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="p-2"
								onClick={onToggleCollapse}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
						</div>
					</div>
				) : (
					<div className="flex justify-center mb-4">
						<Button
							variant="ghost"
							size="sm"
							className="p-2"
							onClick={onToggleCollapse}
						>
							<Menu className="h-4 w-4" />
						</Button>
					</div>
				)}

				{/* Tab Switcher */}
				{!isCollapsed && (
					<div className="flex bg-secondary/30 rounded-lg p-1 mb-4">
						<button
							onClick={() => onTabChange("chat")}
							className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
								activeTab === "chat"
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
							}`}
						>
							Chat
						</button>
						<button
							onClick={() => onTabChange("compare")}
							className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
								activeTab === "compare"
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
							}`}
						>
							Compare
						</button>
					</div>
				)}

				{/* New Chat Button - Only show in Chat mode */}
				{activeTab === "chat" && (
					<>
						{!isCollapsed ? (
							<Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
								<Plus className="h-4 w-4 mr-2" />
								New Chat
							</Button>
						) : (
							<Button
								size="sm"
								className="w-full bg-gradient-primary hover:opacity-90 transition-opacity p-2"
							>
								<Plus className="h-4 w-4" />
							</Button>
						)}
					</>
				)}
			</div>

			{/* Search - Only show in Chat mode */}
			{!isCollapsed && activeTab === "chat" && (
				<div className="p-4 border-b border-border-glass">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search threads..."
							className="pl-10 chat-input"
						/>
					</div>
				</div>
			)}

			{/* Content based on active tab */}
			<div className="flex-1 overflow-y-auto">
				{activeTab === "chat" ? (
					<div className="p-4">
						{!isCollapsed && (
							<div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
								Last 30 Days
							</div>
						)}

						{/* Sample chat item */}
						<div className="sidebar-item group cursor-pointer">
							<MessageSquare className="h-4 w-4 flex-shrink-0" />
							{!isCollapsed && (
								<div className="flex-1 min-w-0">
									<p className="text-sm truncate">Rs in strawberry</p>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="p-4">
						{!isCollapsed && (
							<div className="text-center text-muted-foreground text-sm">
								<p className="mb-2">Compare Mode</p>
								<p className="text-xs">
									Select models in the main area to start comparing responses
								</p>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Login Button */}
			<div className="p-4 border-t border-border-glass">
				{!isCollapsed ? (
					<Button
						variant="outline"
						className="w-full border-border-glass hover:bg-secondary/50"
					>
						Login
					</Button>
				) : (
					<Button
						variant="outline"
						size="sm"
						className="w-full border-border-glass hover:bg-secondary/50 p-2"
					>
						<User className="h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
