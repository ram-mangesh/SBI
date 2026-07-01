import { useParams } from 'react-router-dom';
import type { AgentType } from '@/core/types';
import { FullScreenChatPage } from '@/features/chat/components/CopilotExperience';

const routeAgentMap: Record<string, AgentType> = {
  profile: 'ONBOARDING_AGENT',
  onboarding: 'ONBOARDING_AGENT',
  recommendation: 'RECOMMENDATION_ENGINE',
  products: 'RECOMMENDATION_ENGINE',
  application: 'QUALIFICATION_AGENT',
  qualification: 'QUALIFICATION_AGENT',
  kyc: 'KYC_AGENT',
  goal: 'GOAL_DISCOVERY_AGENT',
  'life-event': 'LIFE_EVENT_DETECTOR',
  financial: 'FINANCIAL_ANALYSIS_AGENT',
  voice: 'VOICE_ENGAGEMENT_AGENT',
};

export function ChatPage() {
  return <FullScreenChatPage />;
}

export function ChatConversationPage() {
  return <FullScreenChatPage />;
}

export function ChatAgentPage() {
  const params = useParams();
  const agentType = params.agentType ? routeAgentMap[params.agentType] : undefined;

  return <FullScreenChatPage agentType={agentType} />;
}
