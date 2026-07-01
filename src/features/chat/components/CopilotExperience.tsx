import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Bot,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Maximize2,
  MessageCircle,
  Mic,
  Minimize2,
  PhoneOff,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import type { AgentType, ChatMessage } from '@/core/types';
import { routeBuilders, ROUTES } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';
import {
  agentForPath,
  COPILOT_AGENTS,
  getAgent,
  SUGGESTED_PROMPTS,
  useChatStore,
  type CopilotMode,
} from '@/features/chat/store/chat.store';

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function messageLabel(message: ChatMessage) {
  if (message.role === 'USER') return 'You';
  if (message.role === 'SYSTEM') return 'System';
  return getAgent(message.agentType ?? 'CONVERSATIONAL_AGENT').label;
}

function AgentSelect({ compact = false }: { compact?: boolean }) {
  const currentAgent = useChatStore((state) => state.currentAgent);
  const setAgent = useChatStore((state) => state.setAgent);

  return (
    <label className={cn('flex items-center gap-2', compact ? 'min-w-0 flex-1' : 'w-full')}>
      <span className="sr-only">Change AI topic</span>
      <select
        value={currentAgent}
        onChange={(event) => setAgent(event.target.value as AgentType)}
        className="h-9 min-w-0 flex-1 rounded-md border border-app bg-surface px-2 text-sm font-medium text-app"
        aria-label="Change AI topic"
      >
        {COPILOT_AGENTS.map((agent) => (
          <option key={agent.type} value={agent.type}>
            {agent.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-app" aria-live="polite">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700">
        <Bot className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:240ms]" />
      </span>
      <span>AI is thinking</span>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const sendMessage = useChatStore((state) => state.sendMessage);
  const isUser = message.role === 'USER';
  const isSystem = message.role === 'SYSTEM';

  if (isSystem) {
    return (
      <div className="flex justify-center px-3 py-1">
        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <article className={cn('flex px-3 py-2', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[86%]', isUser ? 'text-right' : 'text-left')}>
        <div className="mb-1 flex items-center gap-2 text-xs text-muted-app">
          {!isUser && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
            </span>
          )}
          <span>{messageLabel(message)}</span>
          <span>{formatTime(message.timestamp)}</span>
        </div>
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm leading-6 shadow-sm',
            isUser
              ? 'bg-primary-600 text-white'
              : 'border border-primary-100 bg-ai-bubble text-app shadow-ai-bubble',
          )}
        >
          {message.content}
        </div>
        {!isUser && message.metadata?.actions && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.metadata.actions.slice(0, 3).map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() =>
                  sendMessage(
                    action.action,
                    (action.payload as { agentType?: AgentType } | undefined)?.agentType,
                  )
                }
                className="rounded-md border border-primary-100 bg-surface px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function SuggestedPromptStrip({ contextAgent }: { contextAgent?: AgentType }) {
  const sendMessage = useChatStore((state) => state.sendMessage);
  const prompts = useMemo(() => {
    if (!contextAgent) return SUGGESTED_PROMPTS;
    return [
      ...SUGGESTED_PROMPTS.filter((prompt) => prompt.agentType === contextAgent),
      ...SUGGESTED_PROMPTS.filter((prompt) => prompt.agentType !== contextAgent),
    ];
  }, [contextAgent]);

  return (
    <div className="flex gap-2 overflow-x-auto border-t border-app px-3 py-2 scrollbar-hide">
      {prompts.slice(0, 5).map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => sendMessage(item.prompt, item.agentType)}
          className="shrink-0 rounded-md border border-app bg-surface px-3 py-1.5 text-xs font-semibold text-app hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ChatInput({ mode }: { mode: CopilotMode }) {
  const [value, setValue] = useState('');
  const sendMessage = useChatStore((state) => state.sendMessage);
  const startVoice = useChatStore((state) => state.startVoice);
  const voiceActive = useChatStore((state) => state.voiceActive);
  const status = useChatStore((state) => state.status);

  function submit(event: FormEvent) {
    event.preventDefault();
    sendMessage(value);
    setValue('');
  }

  return (
    <form onSubmit={submit} className="border-t border-app bg-surface p-3 bm-safe-bottom">
      <div className="flex items-end gap-2">
        <button
          type="button"
          onClick={startVoice}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-app text-muted-app hover:bg-gray-50 hover:text-app',
            voiceActive && 'border-primary-200 bg-primary-50 text-primary-700',
          )}
          aria-label="Start voice input"
          title="Start voice input"
        >
          <Mic className="h-4 w-4" aria-hidden="true" />
        </button>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Type a message</span>
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={mode === 'embedded' ? 'Ask for help in this flow' : 'Type a message'}
            rows={1}
            className="max-h-28 min-h-10 w-full resize-none rounded-md border border-app bg-surface px-3 py-2 text-sm text-app placeholder:text-gray-400"
          />
        </label>
        <button
          type="submit"
          disabled={!value.trim() || status === 'TYPING'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-600 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          aria-label="Send message"
          title="Send message"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

function VoiceOverlay() {
  const voiceActive = useChatStore((state) => state.voiceActive);
  const endVoice = useChatStore((state) => state.endVoice);

  if (!voiceActive) return null;

  return (
    <div className="border-t border-primary-100 bg-primary-50 px-3 py-2">
      <div className="flex items-center gap-3 rounded-md bg-surface px-3 py-2 shadow-sm">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white">
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-app">Voice session active</p>
          <p className="truncate text-xs text-muted-app">Listening for customer intent and live transcript.</p>
        </div>
        <button
          type="button"
          onClick={endVoice}
          className="flex h-8 w-8 items-center justify-center rounded-md text-error hover:bg-error-light"
          aria-label="End voice session"
          title="End voice session"
        >
          <PhoneOff className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function CopilotHeader({
  mode,
  onClose,
  onMinimize,
}: {
  mode: CopilotMode;
  onClose?: () => void;
  onMinimize?: () => void;
}) {
  const navigate = useNavigate();
  const currentAgent = useChatStore((state) => state.currentAgent);
  const status = useChatStore((state) => state.status);
  const resetConversation = useChatStore((state) => state.resetConversation);
  const agent = getAgent(currentAgent);

  return (
    <header className="border-b border-app bg-surface">
      <div className="flex min-h-14 items-center gap-3 px-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-700">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-app">BankMate AI Copilot</p>
          <p className="flex items-center gap-1 text-xs text-muted-app">
            <span className="bm-status-dot bm-status-dot--success" />
            {status === 'TYPING' ? 'Responding' : 'Online'} - {agent.label}
          </p>
        </div>
        <button
          type="button"
          onClick={resetConversation}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-app hover:bg-gray-50 hover:text-app"
          aria-label="Reset conversation"
          title="Reset conversation"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        {mode === 'floating' && (
          <button
            type="button"
            onClick={() => navigate(ROUTES.CHAT)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-app hover:bg-gray-50 hover:text-app"
            aria-label="Open full chat"
            title="Open full chat"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        {onMinimize && (
          <button
            type="button"
            onClick={onMinimize}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-app hover:bg-gray-50 hover:text-app"
            aria-label="Minimize copilot"
            title="Minimize copilot"
          >
            <Minimize2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-app hover:bg-gray-50 hover:text-app"
            aria-label="Close copilot"
            title="Close copilot"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-app px-3 py-2">
        <span className="hidden text-xs font-medium text-muted-app sm:block">Currently</span>
        <AgentSelect compact />
      </div>
    </header>
  );
}

export function CopilotChatSurface({
  mode,
  className,
  onClose,
  onMinimize,
}: {
  mode: CopilotMode;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
}) {
  const messages = useChatStore((state) => state.messages);
  const status = useChatStore((state) => state.status);
  const error = useChatStore((state) => state.error);
  const currentAgent = useChatStore((state) => state.currentAgent);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, status]);

  return (
    <section className={cn('flex min-h-0 flex-col overflow-hidden bg-surface', className)} aria-label="AI Copilot">
      <CopilotHeader mode={mode} onClose={onClose} onMinimize={onMinimize} />
      {error && (
        <div className="flex items-center gap-2 border-b border-error-light bg-error-light px-3 py-2 text-sm text-error-dark">
          <CircleAlert className="h-4 w-4" aria-hidden="true" />
          {error}
        </div>
      )}
      <div className="flex-1 overflow-y-auto py-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {status === 'TYPING' && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
      <VoiceOverlay />
      <SuggestedPromptStrip contextAgent={currentAgent} />
      <ChatInput mode={mode} />
    </section>
  );
}

function SuggestionCard() {
  const suggestion = useChatStore((state) => state.suggestion);
  const openCopilot = useChatStore((state) => state.openCopilot);
  const sendMessage = useChatStore((state) => state.sendMessage);

  if (!suggestion) return null;

  return (
    <button
      type="button"
      onClick={() => {
        openCopilot('floating', 'RECOMMENDATION_ENGINE');
        window.setTimeout(() => sendMessage(suggestion.prompt, 'RECOMMENDATION_ENGINE'), 50);
      }}
      className="mb-3 hidden w-[320px] rounded-lg border border-primary-100 bg-surface p-3 text-left shadow-lg hover:bg-primary-50 sm:block"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-700">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-app">{suggestion.title}</p>
          <p className="mt-1 text-xs leading-5 text-muted-app">{suggestion.message}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-app" aria-hidden="true" />
      </div>
    </button>
  );
}

export function FloatingCopilot() {
  const location = useLocation();
  const isOpen = useChatStore((state) => state.isOpen);
  const status = useChatStore((state) => state.status);
  const unreadCount = useChatStore((state) => state.unreadCount);
  const openCopilot = useChatStore((state) => state.openCopilot);
  const closeCopilot = useChatStore((state) => state.closeCopilot);
  const minimizeCopilot = useChatStore((state) => state.minimizeCopilot);

  useEffect(() => {
    if (!isOpen) return;
    const agent = agentForPath(location.pathname);
    useChatStore.getState().setAgent(agent);
  }, [isOpen, location.pathname]);

  if (location.pathname.startsWith('/chat')) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[500] flex flex-col items-end lg:bottom-6 lg:right-6">
      {!isOpen && <SuggestionCard />}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[499] bg-gray-900/30 sm:hidden" onClick={closeCopilot} />
          <div className="relative z-[500] h-[calc(100dvh-112px)] w-[calc(100vw-32px)] max-w-[380px] overflow-hidden rounded-lg border border-app bg-surface shadow-lg sm:h-[70vh] sm:max-h-[600px] sm:min-h-[400px]">
            <CopilotChatSurface mode="floating" onClose={closeCopilot} onMinimize={minimizeCopilot} />
          </div>
        </>
      )}
      {!isOpen && (
        <button
          type="button"
          onClick={() => openCopilot('floating', agentForPath(location.pathname))}
          className={cn(
            'relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform hover:scale-105',
            status === 'SUGGESTION_READY' && 'animate-pulse',
          )}
          aria-label="Open AI Copilot"
          title="Chat with BankMate AI"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

export function ConversationList() {
  const conversations = useChatStore((state) => state.conversations);
  const currentConversationId = useChatStore((state) => state.currentConversationId);
  const setConversation = useChatStore((state) => state.setConversation);

  return (
    <nav className="space-y-2" aria-label="Conversation history">
      {conversations.map((conversation) => {
        const agent = getAgent(conversation.agentType);
        const active = conversation.id === currentConversationId;

        return (
          <Link
            key={conversation.id}
            to={routeBuilders.chatConversation(conversation.id)}
            onClick={() => setConversation(conversation.id)}
            className={cn(
              'block rounded-md border p-3 text-left hover:bg-primary-50',
              active ? 'border-primary-200 bg-primary-50' : 'border-app bg-surface',
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold text-app">{agent.label}</p>
              {conversation.unreadCount > 0 && (
                <span className="rounded-full bg-error px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-app">{conversation.lastMessage}</p>
          </Link>
        );
      })}
    </nav>
  );
}

export function FullScreenChatPage({ agentType }: { agentType?: AgentType }) {
  const location = useLocation();
  const params = useParams();
  const openCopilot = useChatStore((state) => state.openCopilot);
  const setConversation = useChatStore((state) => state.setConversation);

  useEffect(() => {
    openCopilot('fullscreen', agentType ?? agentForPath(location.pathname));
  }, [agentType, location.pathname, openCopilot]);

  useEffect(() => {
    if (params.conversationId) setConversation(params.conversationId);
  }, [params.conversationId, setConversation]);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden bg-surface-muted xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="hidden border-r border-app bg-surface p-3 xl:block">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">History</p>
            <h2 className="text-base font-semibold text-app">Conversations</h2>
          </div>
          <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
        </div>
        <ConversationList />
      </aside>
      <CopilotChatSurface mode="fullscreen" className="min-h-0 flex-1" />
    </div>
  );
}

export function EmbeddedCopilot({ context }: { context?: AgentType }) {
  const location = useLocation();
  const openCopilot = useChatStore((state) => state.openCopilot);
  const resolvedAgent = context ?? agentForPath(location.pathname);

  useEffect(() => {
    openCopilot('embedded', resolvedAgent);
  }, [openCopilot, resolvedAgent]);

  return (
    <aside className="min-h-[420px] overflow-hidden rounded-lg border border-app bg-surface shadow-sm">
      <CopilotChatSurface mode="embedded" className="h-full" />
    </aside>
  );
}
