export interface ChatMessage {
    content: string;
    type: 'user' | 'bot';
    timestamp: Date;
    isLoading?: boolean;
}

export interface QuickAction {
    label: string;
    message: string;
}

export interface ChatTopic {
    id: string;
    title: string;
    icon: string;
    description: string;
    systemContext: string;
    quickActions: QuickAction[];
    keywords: string[];
    invalidResponse: string;
}