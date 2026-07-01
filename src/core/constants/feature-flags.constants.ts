// ============================================================================
// Feature Flags
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2 (FeatureFlagGuard)
//   voice_campaigns, financial_goals, voice_config_access, voice_agent
// ============================================================================

export const FeatureFlag = {
  VOICE_CAMPAIGNS: 'voice_campaigns',
  FINANCIAL_GOALS: 'financial_goals',
  VOICE_CONFIG_ACCESS: 'voice_config_access',
  VOICE_AGENT: 'voice_agent',
} as const;

export type FeatureFlag = (typeof FeatureFlag)[keyof typeof FeatureFlag];

export const FEATURE_FLAG_LABELS: Record<FeatureFlag, string> = {
  voice_campaigns: 'Voice Campaigns',
  financial_goals: 'Financial Goals',
  voice_config_access: 'Voice Configuration Access',
  voice_agent: 'Voice Agent',
};

/**
 * Default enabled state per flag. Real values are resolved at runtime from
 * remote config / user entitlements; these are safe build-time fallbacks.
 */
export const FEATURE_FLAG_DEFAULTS: Record<FeatureFlag, boolean> = {
  voice_campaigns: false,
  financial_goals: true,
  voice_config_access: false,
  voice_agent: true,
};

export const FEATURE_FLAGS = Object.values(FeatureFlag);

export default {
  FeatureFlag,
  FEATURE_FLAG_LABELS,
  FEATURE_FLAG_DEFAULTS,
  FEATURE_FLAGS,
};