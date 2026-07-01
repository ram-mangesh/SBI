import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  BellRing,
  Check,
  Clock,
  History,
  MailCheck,
  Mic,
  PhoneCall,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { NOTIFICATION_CHANNELS, NotificationCategory } from '@/core/constants/notification-types.constants';
import { ROUTES, routeBuilders } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';
import { communicationInsights } from '../data/communication.mock';
import { useCommunicationStore } from '../store/communication.store';
import type { Campaign, CommunicationFilter, Notification, NotificationChannel, NotificationCategory as Category, VoiceCampaign } from '../types/communication.types';
import {
  categoryIcon,
  categoryLabel,
  channelChipClass,
  channelIcon,
  channelLabel,
  formatDateTime,
  formatDuration,
  groupNotifications,
  notificationCta,
  unreadCount,
} from '../utils/communication.utils';

function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="bm-card p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-app">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ChannelBadge({ channel }: { channel: NotificationChannel }) {
  const Icon = channelIcon(channel);
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold', channelChipClass(channel))}>
      <Icon className="h-3.5 w-3.5" />
      {channelLabel(channel)}
    </span>
  );
}

function NotificationCard({ notification, compact = false }: { notification: Notification; compact?: boolean }) {
  const navigate = useNavigate();
  const markRead = useCommunicationStore((state) => state.markRead);
  const dismiss = useCommunicationStore((state) => state.dismiss);
  const Icon = categoryIcon(notification.category);
  const unread = notification.readStatus === 'UNREAD';

  function openNotification() {
    markRead(notification.id);
    if (notification.deepLink) {
      navigate(notification.deepLink);
      return;
    }
    navigate(routeBuilders.notificationDetail(notification.id));
  }

  return (
    <article className={cn('bm-notification-card p-4', unread && 'border-primary-300 bg-primary-50')}>
      <div className="flex items-start gap-3">
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', unread ? 'bg-primary-600 text-white' : 'bg-surface-muted text-primary-700')}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-app">{notification.title}</h3>
            {unread && <span className="h-2 w-2 rounded-full bg-primary-600" aria-label="Unread" />}
          </div>
          <p className={cn('mt-1 text-sm text-muted-app', compact && 'line-clamp-2')}>{notification.body}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ChannelBadge channel={notification.channel} />
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">{categoryLabel(notification.category)}</span>
            <span className="text-xs text-muted-app">{formatDateTime(notification.createdAt)}</span>
          </div>
        </div>
        {notification.isDismissible && (
          <button
            type="button"
            onClick={() => dismiss(notification.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-app hover:bg-gray-100"
            aria-label="Dismiss notification"
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={openNotification} className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white">
          {notificationCta(notification)}
        </button>
        {unread && (
          <button type="button" onClick={() => markRead(notification.id)} className="rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">
            Mark Read
          </button>
        )}
        <Link to={routeBuilders.notificationDetail(notification.id)} className="rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">
          Details
        </Link>
      </div>
    </article>
  );
}

function ChannelFilters({ active, setActive }: { active: CommunicationFilter; setActive: (value: CommunicationFilter) => void }) {
  const notifications = useCommunicationStore((state) => state.notifications);
  const filters: Array<{ label: string; value: CommunicationFilter; count: number }> = [
    { label: 'All', value: 'ALL', count: notifications.length },
    { label: 'Unread', value: 'UNREAD', count: unreadCount(notifications) },
    ...NOTIFICATION_CHANNELS.map((channel) => ({
      label: channelLabel(channel),
      value: channel,
      count: notifications.filter((item) => item.channel === channel).length,
    })),
  ];

  return (
    <Panel title="Channels">
      <div className="space-y-2">
        {filters.map((filter) => {
          const Icon = filter.value === 'ALL' || filter.value === 'UNREAD' ? Bell : channelIcon(filter.value);
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              className={cn(
                'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm font-semibold',
                active === filter.value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-app bg-surface text-muted-app',
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {filter.label}
              </span>
              <span>{filter.count}</span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

function ForegroundToast() {
  const toastId = useCommunicationStore((state) => state.foregroundToastId);
  const setForegroundToast = useCommunicationStore((state) => state.setForegroundToast);
  const notification = useCommunicationStore((state) => state.notifications.find((item) => item.id === toastId));
  if (!notification) return null;
  return (
    <div className="rounded-lg border border-primary-100 bg-primary-50 p-3">
      <div className="flex items-start gap-3">
        <BellRing className="mt-0.5 h-5 w-5 text-primary-700" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-app">{notification.title}</p>
          <p className="text-sm text-muted-app">{notification.body}</p>
        </div>
        <button type="button" onClick={() => setForegroundToast(null)} className="text-muted-app" aria-label="Close toast">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function NotificationsExperience() {
  const notifications = useCommunicationStore((state) => state.notifications);
  const markAllRead = useCommunicationStore((state) => state.markAllRead);
  const [activeFilter, setActiveFilter] = useState<CommunicationFilter>('ALL');
  const [query, setQuery] = useState('');
  const unread = unreadCount(notifications);
  const visible = useMemo(() => {
    const normalized = query.toLowerCase();
    return notifications
      .filter((item) => (activeFilter === 'ALL' ? true : activeFilter === 'UNREAD' ? item.readStatus === 'UNREAD' : item.channel === activeFilter))
      .filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(normalized))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }, [activeFilter, notifications, query]);
  const grouped = groupNotifications(visible);

  return (
    <div className="space-y-5 pb-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-700">CommunicationAgent</p>
          <h1 className="text-2xl font-bold text-app">Communication Center</h1>
          <p className="text-sm text-muted-app">{unread} unread - Last updated 2 minutes ago</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={markAllRead} className="inline-flex items-center gap-2 rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">
            <Check className="h-4 w-4" />
            Mark All Read
          </button>
          <Link to={ROUTES.SETTINGS_NOTIFICATIONS} className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <ChannelFilters active={activeFilter} setActive={setActiveFilter} />
          <Panel title="Smart Inbox">
            <div className="grid gap-2 text-sm">
              <SmartInboxRow label="Today" value={grouped.today.length} />
              <SmartInboxRow label="Campaigns" value={grouped.campaigns.length} />
              <SmartInboxRow label="Security" value={grouped.security.length} />
              <SmartInboxRow label="Earlier" value={grouped.earlier.length} />
            </div>
          </Panel>
        </aside>
        <main className="space-y-4">
          <ForegroundToast />
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <span className="sr-only">Search communication</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search messages, campaigns, updates"
              className="h-11 w-full rounded-md border border-app bg-surface pl-10 pr-3 text-sm"
            />
          </label>
          {visible.length === 0 ? (
            <EmptyState title="No communication found" body="Try another channel or clear the search." />
          ) : (
            <div className="space-y-3">
              {visible.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SmartInboxRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-surface-muted px-3 py-2">
      <span className="font-medium text-app">{label}</span>
      <span className="text-muted-app">{value}</span>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lg border border-dashed border-app bg-surface p-8 text-center">
      <Bell className="mx-auto h-9 w-9 text-primary-600" />
      <h2 className="mt-3 text-lg font-semibold text-app">{title}</h2>
      <p className="mt-1 text-sm text-muted-app">{body}</p>
    </section>
  );
}

export function NotificationDetailExperience() {
  const params = useParams();
  const notification = useCommunicationStore((state) => state.notifications.find((item) => item.id === params.notificationId) ?? state.notifications[0]);
  const markRead = useCommunicationStore((state) => state.markRead);
  const Icon = categoryIcon(notification.category);

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-24">
      <Link to={ROUTES.NOTIFICATIONS} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
        <ArrowLeft className="h-4 w-4" />
        Back to Communication Center
      </Link>
      <section className="bm-card p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <Icon className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <ChannelBadge channel={notification.channel} />
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">{categoryLabel(notification.category)}</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold text-app">{notification.title}</h1>
            <p className="mt-2 text-muted-app">{notification.body}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <InfoTile label="Sent" value={formatDateTime(notification.createdAt)} />
          <InfoTile label="Read Status" value={notification.readStatus} />
          <InfoTile label="Expires" value={formatDateTime(notification.expiresAt)} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {notification.deepLink && (
            <Link to={notification.deepLink} onClick={() => markRead(notification.id)} className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
              {notificationCta(notification)}
            </Link>
          )}
          {notification.readStatus === 'UNREAD' && (
            <button type="button" onClick={() => markRead(notification.id)} className="rounded-md border border-app px-4 py-2 text-sm font-semibold text-app">
              Mark Read
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-muted p-3">
      <p className="text-xs text-muted-app">{label}</p>
      <p className="mt-1 font-semibold text-app">{value}</p>
    </div>
  );
}

export function VoiceExperience() {
  const voiceCampaigns = useCommunicationStore((state) => state.voiceCampaigns);
  const voiceHistory = useCommunicationStore((state) => state.voiceHistory);
  const initiateVoiceCall = useCommunicationStore((state) => state.initiateVoiceCall);

  return (
    <div className="space-y-5 pb-24">
      <div className="rounded-lg bg-primary-600 p-5 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-primary-100">Voice Communication</p>
            <h1 className="text-2xl font-bold">Voice Assistant & Campaign Calls</h1>
            <p className="mt-2 text-sm text-primary-100">Start approved voice callbacks and review campaign context from CommunicationAgent.</p>
          </div>
          <button type="button" onClick={() => initiateVoiceCall()} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary-700">
            <PhoneCall className="h-4 w-4" />
            Start Voice Call
          </button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="grid gap-4 md:grid-cols-2">
          {voiceCampaigns.map((campaign) => (
            <VoiceCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </main>
        <aside className="space-y-4">
          <Panel title="Recent Calls" action={<Link to={ROUTES.VOICE_HISTORY} className="text-sm font-semibold text-primary-700">View all</Link>}>
            <div className="space-y-2">
              {voiceHistory.slice(0, 3).map((call) => (
                <div key={call.id} className="rounded-md bg-surface-muted p-3 text-sm">
                  <p className="font-semibold text-app">{call.status.replace('_', ' ')}</p>
                  <p className="text-muted-app">{formatDateTime(call.startedAt ?? call.scheduledAt)} - {formatDuration(call.durationSeconds)}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Link to={ROUTES.VOICE_PREFERENCES} className="block rounded-md border border-app px-4 py-2 text-center text-sm font-semibold text-app">
            Voice Preferences
          </Link>
        </aside>
      </div>
    </div>
  );
}

function VoiceCampaignCard({ campaign }: { campaign: VoiceCampaign }) {
  const initiateVoiceCall = useCommunicationStore((state) => state.initiateVoiceCall);
  return (
    <article className="bm-card p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700">
          <Mic className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">{campaign.status}</span>
      </div>
      <h2 className="font-semibold text-app">{campaign.name}</h2>
      <p className="mt-1 text-sm text-muted-app">{campaign.script}</p>
      <div className="mt-4 grid gap-2 text-sm">
        <InfoTile label="Audience" value={campaign.targetAudience ?? 'Customer segment'} />
        <InfoTile label="Window" value={formatDateTime(campaign.startDate)} />
      </div>
      <button type="button" onClick={() => initiateVoiceCall(campaign.id)} className="mt-4 w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white">
        Initiate Call
      </button>
    </article>
  );
}

export function VoiceHistoryExperience() {
  const voiceHistory = useCommunicationStore((state) => state.voiceHistory);
  return (
    <div className="space-y-5 pb-24">
      <PageHeader eyebrow="Voice" title="Voice Call History" subtitle="Past voice campaign calls, outcomes, durations, and notes." />
      <Panel title="Call Timeline">
        <div className="space-y-3">
          {voiceHistory.map((call) => (
            <div key={call.id} className="rounded-lg border border-app p-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-app">{call.direction} - {call.status.replace('_', ' ')}</p>
                  <p className="text-sm text-muted-app">{call.notes}</p>
                </div>
                <span className="text-sm text-muted-app">{formatDateTime(call.startedAt ?? call.scheduledAt)}</span>
              </div>
              <p className="mt-2 text-sm text-muted-app">Duration: {formatDuration(call.durationSeconds)}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function VoicePreferencesExperience() {
  const voicePreferences = useCommunicationStore((state) => state.voicePreferences);
  const updateVoicePreference = useCommunicationStore((state) => state.updateVoicePreference);
  return (
    <div className="space-y-5 pb-24">
      <PageHeader eyebrow="Voice" title="Voice Preferences" subtitle="Manage language, calling window, and voice campaign consent." />
      <Panel title="Calling Preferences">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-app">Preferred time slot</span>
            <select
              value={voicePreferences.preferredTimeSlot}
              onChange={(event) => updateVoicePreference('preferredTimeSlot', event.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-app bg-surface px-3 text-sm"
            >
              <option>10:00 - 12:00</option>
              <option>14:00 - 16:00</option>
              <option>18:00 - 20:00</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-app">Language</span>
            <select
              value={voicePreferences.language}
              onChange={(event) => updateVoicePreference('language', event.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-app bg-surface px-3 text-sm"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </label>
        </div>
        <div className="mt-4 space-y-3">
          <ToggleRow label="Allow voice campaigns" checked={voicePreferences.allowedCampaigns} onChange={() => updateVoicePreference('allowedCampaigns', !voicePreferences.allowedCampaigns)} />
          <ToggleRow label="Do not disturb" checked={voicePreferences.doNotDisturb} onChange={() => updateVoicePreference('doNotDisturb', !voicePreferences.doNotDisturb)} />
        </div>
      </Panel>
    </div>
  );
}

export function NotificationSettingsExperience() {
  const preferences = useCommunicationStore((state) => state.preferences);
  const consentAudit = useCommunicationStore((state) => state.consentAudit);
  const toggleChannelPreference = useCommunicationStore((state) => state.toggleChannelPreference);
  const toggleCategoryPreference = useCommunicationStore((state) => state.toggleCategoryPreference);
  const toggleQuietHours = useCommunicationStore((state) => state.toggleQuietHours);
  const categories = Object.values(NotificationCategory) as Category[];

  return (
    <div className="space-y-5 pb-24">
      <PageHeader eyebrow="Settings" title="Notification Preferences" subtitle="Consent-first communication controls across push, email, SMS, WhatsApp, voice, and in-app." />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-5">
          <Panel title="Channel Consent">
            <div className="grid gap-3 md:grid-cols-2">
              {NOTIFICATION_CHANNELS.map((channel) => (
                <ToggleRow key={channel} label={channelLabel(channel)} checked={preferences.channels[channel]} onChange={() => toggleChannelPreference(channel)} />
              ))}
            </div>
          </Panel>
          <Panel title="Notification Categories">
            <div className="grid gap-3 md:grid-cols-2">
              {categories.map((category) => (
                <ToggleRow key={category} label={categoryLabel(category)} checked={preferences.categories[category]} onChange={() => toggleCategoryPreference(category)} />
              ))}
            </div>
          </Panel>
          <Panel title="Quiet Hours">
            <ToggleRow
              label={`${preferences.quietHoursStart} - ${preferences.quietHoursEnd}`}
              checked={preferences.quietHoursEnabled}
              onChange={toggleQuietHours}
            />
          </Panel>
        </main>
        <aside className="space-y-5">
          <Panel title="AI Preferences">
            <div className="flex gap-3">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <p className="text-sm text-muted-app">CommunicationAgent respects consent, quiet hours, and recent engagement before surfacing messages.</p>
            </div>
          </Panel>
          <Panel title="Consent Audit">
            <div className="space-y-2">
              {consentAudit.map((item) => (
                <div key={item.id} className="rounded-md bg-surface-muted p-3 text-sm">
                  <p className="font-semibold text-app">{item.label}</p>
                  <p className="text-muted-app">{channelLabel(item.channel)} - {formatDateTime(item.changedAt)}</p>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-app bg-surface px-3 py-2">
      <span className="text-sm font-medium text-app">{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4" />
    </label>
  );
}

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-primary-700">{eyebrow}</p>
        <h1 className="text-2xl font-bold text-app">{title}</h1>
        <p className="text-sm text-muted-app">{subtitle}</p>
      </div>
      <Link to={ROUTES.NOTIFICATIONS} className="inline-flex items-center gap-2 rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">
        <History className="h-4 w-4" />
        Communication Center
      </Link>
    </div>
  );
}

export function CommunicationActivityExperience() {
  const campaigns = useCommunicationStore((state) => state.campaigns);
  const history = useCommunicationStore((state) => state.communicationHistory);
  return (
    <div className="space-y-5 pb-24">
      <PageHeader eyebrow="My Activity" title="Communication Analytics" subtitle="Customer-facing activity, campaign history, and timeline." />
      <div className="grid gap-3 md:grid-cols-4">
        {communicationInsights.map((item) => (
          <div key={item.label} className="bm-card p-4">
            <p className="text-sm text-muted-app">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-app">{item.value}</p>
            <p className="text-xs text-success-dark">{item.trend}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Communication Timeline">
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-md bg-surface-muted p-3">
                <MailCheck className="mt-0.5 h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-semibold text-app">{item.title}</p>
                  <p className="text-sm text-muted-app">{item.status} - {formatDateTime(item.sentAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Campaign History">
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="rounded-lg border border-app p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-app">{campaign.name}</p>
          <p className="text-sm text-muted-app">{categoryLabel(campaign.category)} - {campaign.sentCount ?? 0} sent</p>
        </div>
        <ChannelBadge channel={campaign.channel} />
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-primary-600" style={{ width: `${Math.min(100, ((campaign.sentCount ?? 0) / campaign.recipientCount) * 100)}%` }} />
      </div>
    </div>
  );
}

export function SettingsOverviewExperience() {
  return (
    <div className="space-y-5 pb-24">
      <PageHeader eyebrow="Settings" title="Settings" subtitle="Manage account preferences and communication controls." />
      <div className="grid gap-4 md:grid-cols-2">
        <SettingsLink icon={<BellRing className="h-5 w-5" />} title="Notification Preferences" to={ROUTES.SETTINGS_NOTIFICATIONS} />
        <SettingsLink icon={<ShieldCheck className="h-5 w-5" />} title="Security" to={ROUTES.SETTINGS_SECURITY} />
        <SettingsLink icon={<SlidersHorizontal className="h-5 w-5" />} title="Language & Theme" to={ROUTES.SETTINGS_LANGUAGE} />
        <SettingsLink icon={<Clock className="h-5 w-5" />} title="Voice Preferences" to={ROUTES.VOICE_PREFERENCES} />
      </div>
    </div>
  );
}

function SettingsLink({ icon, title, to }: { icon: ReactNode; title: string; to: string }) {
  return (
    <Link to={to} className="bm-card bm-card-hover flex items-center gap-3 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">{icon}</span>
      <span className="font-semibold text-app">{title}</span>
    </Link>
  );
}
