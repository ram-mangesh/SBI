import { create } from 'zustand';
import type { AgentType, ChatMessage, ConversationSummary } from '@/core/types';

export type CopilotMode = 'floating' | 'fullscreen' | 'embedded';
export type CopilotStatus = 'IDLE' | 'WAITING_USER' | 'TYPING' | 'SUGGESTION_READY' | 'ERROR';

export interface CopilotAgentConfig {
  type: AgentType;
  label: string;
  description: string;
}

export interface SuggestedPrompt {
  label: string;
  prompt: string;
  agentType: AgentType;
}

export interface CopilotSuggestion {
  title: string;
  message: string;
  prompt: string;
}

interface ChatStore {
  isOpen: boolean;
  mode: CopilotMode;
  currentAgent: AgentType;
  currentConversationId: string;
  conversations: ConversationSummary[];
  messages: ChatMessage[];
  status: CopilotStatus;
  error: string | null;
  unreadCount: number;
  voiceActive: boolean;
  suggestion: CopilotSuggestion | null;
  openCopilot: (mode?: CopilotMode, agentType?: AgentType) => void;
  closeCopilot: () => void;
  minimizeCopilot: () => void;
  setAgent: (agentType: AgentType) => void;
  setConversation: (conversationId: string) => void;
  sendMessage: (content: string, agentType?: AgentType) => void;
  resetConversation: () => void;
  startVoice: () => void;
  endVoice: () => void;
}

export const COPILOT_AGENTS: CopilotAgentConfig[] = [
  { type: 'CONVERSATIONAL_AGENT', label: 'General Banking', description: 'Everyday banking support.' },
  { type: 'ONBOARDING_AGENT', label: 'Profile Setup', description: 'Guided onboarding and profile completion.' },
  { type: 'RECOMMENDATION_ENGINE', label: 'Recommendations', description: 'Product match and next best offers.' },
  { type: 'QUALIFICATION_AGENT', label: 'Application Help', description: 'Eligibility, documents, and application guidance.' },
  { type: 'KYC_AGENT', label: 'KYC Support', description: 'Identity verification and document help.' },
  { type: 'GOAL_DISCOVERY_AGENT', label: 'Goals', description: 'Savings goals and planning support.' },
  { type: 'LIFE_EVENT_DETECTOR', label: 'Life Events', description: 'Milestone planning and financial triggers.' },
  { type: 'FINANCIAL_ANALYSIS_AGENT', label: 'Financial Health', description: 'Income, spending, and affordability insights.' },
  { type: 'COMMUNICATION_AGENT', label: 'Communication', description: 'Notification and preference support.' },
  { type: 'VOICE_ENGAGEMENT_AGENT', label: 'Voice Assistant', description: 'Voice campaigns and call support.' },
];

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { label: 'Explain my offers', prompt: 'Explain my best product recommendations.', agentType: 'RECOMMENDATION_ENGINE' },
  { label: 'Check eligibility', prompt: 'Check my eligibility for this application.', agentType: 'QUALIFICATION_AGENT' },
  { label: 'KYC help', prompt: 'Help me complete KYC verification.', agentType: 'KYC_AGENT' },
  { label: 'Plan a goal', prompt: 'Help me create a financial goal.', agentType: 'GOAL_DISCOVERY_AGENT' },
  { label: 'Notification settings', prompt: 'Help me manage communication preferences.', agentType: 'COMMUNICATION_AGENT' },
  { label: 'Voice callback', prompt: 'Start or explain a voice callback.', agentType: 'VOICE_ENGAGEMENT_AGENT' },
];

const initialConversationId = 'conv-bankmate-home';

const initialConversations: ConversationSummary[] = [
  {
    id: initialConversationId,
    customerId: 'cust-priya',
    agentType: 'CONVERSATIONAL_AGENT',
    lastMessage: 'I can help with recommendations, applications, KYC, and notifications.',
    lastMessageAt: '2026-06-27T09:00:00.000Z',
    unreadCount: 0,
  },
  {
    id: 'conv-application-help',
    customerId: 'cust-priya',
    agentType: 'QUALIFICATION_AGENT',
    lastMessage: 'Your home loan application is ready for review.',
    lastMessageAt: '2026-06-26T16:00:00.000Z',
    unreadCount: 1,
  },
  {
    id: 'conv-recommendations',
    customerId: 'cust-priya',
    agentType: 'RECOMMENDATION_ENGINE',
    lastMessage: 'I found 4 products that match your profile.',
    lastMessageAt: '2026-06-25T11:30:00.000Z',
    unreadCount: 0,
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-welcome',
    conversationId: initialConversationId,
    role: 'ASSISTANT',
    agentType: 'CONVERSATIONAL_AGENT',
    content: 'Hi Priya, I am BankMate AI. I can help you compare products, finish applications, complete KYC, or manage notifications.',
    status: 'DELIVERED',
    timestamp: '2026-06-27T09:00:00.000Z',
    metadata: {
      actions: [
        { label: 'View recommendations', action: 'Show my recommended products', payload: { agentType: 'RECOMMENDATION_ENGINE' } },
        { label: 'Track application', action: 'Track my application status', payload: { agentType: 'QUALIFICATION_AGENT' } },
        { label: 'KYC help', action: 'Help me with KYC', payload: { agentType: 'KYC_AGENT' } },
      ],
    },
  },
];

export function getAgent(agentType: AgentType) {
  return COPILOT_AGENTS.find((agent) => agent.type === agentType) ?? COPILOT_AGENTS[0];
}

export function agentForPath(pathname: string): AgentType {
  if (pathname.includes('/recommendations') || pathname.includes('/products')) return 'RECOMMENDATION_ENGINE';
  if (pathname.includes('/applications')) return 'QUALIFICATION_AGENT';
  if (pathname.includes('/kyc')) return 'KYC_AGENT';
  if (pathname.includes('/goals')) return 'GOAL_DISCOVERY_AGENT';
  if (pathname.includes('/life-events')) return 'LIFE_EVENT_DETECTOR';
  if (pathname.includes('/profile') || pathname.includes('/onboarding')) return 'ONBOARDING_AGENT';
  if (pathname.includes('/transactions') || pathname.includes('/financial')) return 'FINANCIAL_ANALYSIS_AGENT';
  if (pathname.includes('/notifications') || pathname.includes('/settings/notifications')) return 'COMMUNICATION_AGENT';
  if (pathname.includes('/voice')) return 'VOICE_ENGAGEMENT_AGENT';
  return 'CONVERSATIONAL_AGENT';
}

function now() {
  return new Date().toISOString();
}

function createMessage(role: ChatMessage['role'], content: string, conversationId: string, agentType?: AgentType): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    conversationId,
    role,
    content,
    agentType,
    status: 'DELIVERED',
    timestamp: now(),
  };
}

function responseFor(agentType: AgentType, content: string) {
  const lower = content.toLowerCase();
  if (agentType === 'RECOMMENDATION_ENGINE') {
    return 'Based on your profile, Home Flex Loan, Family Health Shield, and Signature Rewards Card are the strongest matches. I can explain match score, affordability, or eligibility.';
  }
  if (agentType === 'QUALIFICATION_AGENT') {
    return 'Your application flow checks KYC, customer details, financial details, documents, review, and submission. I will flag missing documents before final submit.';
  }
  if (agentType === 'KYC_AGENT') {
    return 'KYC requires identity, address, and document verification. Approved KYC documents can be reused in applications.';
  }
  if (agentType === 'COMMUNICATION_AGENT') {
    return 'Communication preferences control push, email, SMS, WhatsApp, voice, and in-app channels. Security alerts remain protected by guardrails.';
  }
  if (agentType === 'VOICE_ENGAGEMENT_AGENT') {
    return 'Voice support can initiate approved campaign callbacks and keep call history linked to your communication timeline.';
  }
  if (lower.includes('emi')) return 'I can estimate EMI from amount, rate, and tenure, then compare it with your monthly affordability.';
  return 'Got it. I can guide the next step and connect this request to the right BankMate flow.';
}

function updateConversation(conversations: ConversationSummary[], id: string, agentType: AgentType, lastMessage: string) {
  const updatedAt = now();
  const existing = conversations.find((conversation) => conversation.id === id);
  if (!existing) {
    return [
      {
        id,
        customerId: 'cust-priya',
        agentType,
        lastMessage,
        lastMessageAt: updatedAt,
        unreadCount: 0,
      },
      ...conversations,
    ];
  }
  return conversations.map((conversation) =>
    conversation.id === id
      ? { ...conversation, agentType, lastMessage, lastMessageAt: updatedAt, unreadCount: 0 }
      : conversation,
  );
}

export const useChatStore = create<ChatStore>((set, get) => ({
  isOpen: false,
  mode: 'floating',
  currentAgent: 'CONVERSATIONAL_AGENT',
  currentConversationId: initialConversationId,
  conversations: initialConversations,
  messages: initialMessages,
  status: 'SUGGESTION_READY',
  error: null,
  unreadCount: 1,
  voiceActive: false,
  suggestion: {
    title: 'Need help choosing an offer?',
    message: 'Ask BankMate AI to compare your recommended products.',
    prompt: 'Compare my top recommended products.',
  },
  openCopilot: (mode = 'floating', agentType) =>
    set({
      isOpen: true,
      mode,
      currentAgent: agentType ?? get().currentAgent,
      unreadCount: 0,
      status: 'WAITING_USER',
      error: null,
    }),
  closeCopilot: () => set({ isOpen: false, mode: 'floating' }),
  minimizeCopilot: () => set({ isOpen: false }),
  setAgent: (agentType) => set({ currentAgent: agentType }),
  setConversation: (conversationId) => {
    const conversation = get().conversations.find((item) => item.id === conversationId);
    set({
      currentConversationId: conversationId,
      currentAgent: conversation?.agentType ?? get().currentAgent,
      conversations: get().conversations.map((item) =>
        item.id === conversationId ? { ...item, unreadCount: 0 } : item,
      ),
    });
  },
  sendMessage: (content, agentType) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const state = get();
    const resolvedAgent = agentType ?? state.currentAgent;
    const userMessage = createMessage('USER', trimmed, state.currentConversationId, resolvedAgent);
    set({
      messages: [...state.messages, userMessage],
      currentAgent: resolvedAgent,
      status: 'TYPING',
      error: null,
      conversations: updateConversation(state.conversations, state.currentConversationId, resolvedAgent, trimmed),
    });
    window.setTimeout(() => {
      const current = get();
      const assistantMessage = createMessage(
        'ASSISTANT',
        responseFor(resolvedAgent, trimmed),
        current.currentConversationId,
        resolvedAgent,
      );
      set({
        messages: [...current.messages, assistantMessage],
        status: 'WAITING_USER',
        conversations: updateConversation(current.conversations, current.currentConversationId, resolvedAgent, assistantMessage.content),
      });
    }, 450);
  },
  resetConversation: () => {
    const state = get();
    const resetMessage = createMessage('SYSTEM', 'Conversation reset', state.currentConversationId, state.currentAgent);
    set({
      messages: [initialMessages[0], resetMessage],
      status: 'WAITING_USER',
      error: null,
      voiceActive: false,
    });
  },
  startVoice: () => {
    const state = get();
    set({
      voiceActive: true,
      status: 'WAITING_USER',
      messages: [
        ...state.messages,
        createMessage('SYSTEM', 'Voice session started. Live transcript will appear here.', state.currentConversationId, state.currentAgent),
      ],
    });
  },
  endVoice: () => {
    const state = get();
    set({
      voiceActive: false,
      status: 'WAITING_USER',
      messages: [
        ...state.messages,
        createMessage('SYSTEM', 'Voice session ended.', state.currentConversationId, state.currentAgent),
      ],
    });
  },
}));
