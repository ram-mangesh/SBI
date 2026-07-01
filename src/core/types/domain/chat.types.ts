// ============================================================================
// Domain Types — Chat (AI Copilot)
// Source of Truth: BankMate AI Frontend Blueprint · Sections 7.12
// ============================================================================

export type AgentType =
  | 'CONVERSATIONAL_AGENT'
  | 'ONBOARDING_AGENT'
  | 'RECOMMENDATION_ENGINE'
  | 'GOAL_DISCOVERY_AGENT'
  | 'LIFE_EVENT_DETECTOR'
  | 'FINANCIAL_ANALYSIS_AGENT'
  | 'QUALIFICATION_AGENT'
  | 'KYC_AGENT'
  | 'NEXT_BEST_ACTION_AGENT'
  | 'COMMUNICATION_AGENT'
  | 'VOICE_ENGAGEMENT_AGENT'
  | 'PRODUCT_ADVISOR'
  | 'LOAN_OFFICER'
  | 'LIFE_EVENT_PLANNER'
  | 'GENERAL_ASSISTANT';

export type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM';

export type MessageStatus = 'SENDING' | 'SENT' | 'DELIVERED' | 'FAILED';

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  agentType?: AgentType;
  status?: MessageStatus;
  timestamp: string;
  metadata?: {
    products?: Array<{ id: string; name: string }>;
    actions?: Array<{ label: string; action: string; payload?: unknown }>;
    source?: string;
  };
}

export interface ConversationSummary {
  id: string;
  customerId: string;
  agentType: AgentType;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface ChatAgent {
  type: AgentType;
  name: string;
  description: string;
  icon: string;
  suggestedPrompts: string[];
}

export default {};
