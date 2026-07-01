// ============================================================================
// Auth Pages
// Source of Truth: BankMate AI Frontend Blueprint - Section 4
// ============================================================================

import { useEffect, useMemo, useState } from 'react';
import type { ComponentType, FormEvent, ReactNode } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { KeyRound, LogIn, Mail, Phone, ShieldCheck, UserPlus, Zap, User, Briefcase, Shield } from 'lucide-react';
import { authApi } from '@/features/auth/api/auth.api';
import type {
  AuthFlowResult,
  AuthSession,
  LoginFormValues,
  OtpChallenge,
  RegisterFormValues,
} from '@/features/auth/types/auth.types';
import { ROUTES } from '@/core/config/routes.config';
import { UserRole } from '@/core/constants/roles.constants';
import { Button, Input, PasswordInput, Field, Checkbox, Alert } from '@/shared/components/ui';
import { LoadingScreen } from '@/shared/components/feedback/LoadingScreen';
import { overlay } from '@/store';
import { resolveUserRole, useAuthStore } from '@/store/auth.store';

const OTP_STORAGE_KEY = 'bankmate.auth.otpChallenge';
const LOGIN_ATTEMPT_KEY = 'bankmate.auth.loginAttempts';

type FieldErrors<T extends string> = Partial<Record<T, string>>;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

function AuthCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-gray-950">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function landingRoute(session: AuthSession, returnUrl?: string | null): string {
  if (returnUrl?.startsWith('/')) return returnUrl;

  const role = resolveUserRole(session.user);
  if (role === UserRole.ADMIN) return ROUTES.ADMIN_DASHBOARD;
  if (role === UserRole.RELATIONSHIP_MANAGER) return ROUTES.RM_DASHBOARD;
  if ((session.profileCompletionPct ?? 0) < 100 && !session.user.profileCompleted) {
    return ROUTES.ONBOARDING;
  }
  return ROUTES.DASHBOARD;
}

function persistOtpChallenge(challenge: OtpChallenge) {
  sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(challenge));
}

function readOtpChallenge(): OtpChallenge | null {
  const raw = sessionStorage.getItem(OTP_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OtpChallenge;
  } catch {
    sessionStorage.removeItem(OTP_STORAGE_KEY);
    return null;
  }
}

function completeAuth(
  result: AuthFlowResult,
  rememberMe: boolean,
  navigate: ReturnType<typeof useNavigate>,
  returnUrl?: string | null,
) {
  if (result.status === 'OTP_REQUIRED' && result.otp) {
    persistOtpChallenge(result.otp);
    navigate(ROUTES.VERIFY_OTP, { replace: true });
    return;
  }

  if (!result.session) {
    throw new Error('Authentication response is missing session data.');
  }

  useAuthStore.getState().setSession({
    user: result.session.user,
    accessToken: result.session.tokens.accessToken,
    refreshToken: result.session.tokens.refreshToken,
    expiresIn: result.session.tokens.expiresIn,
    rememberMe,
  });
  sessionStorage.removeItem(OTP_STORAGE_KEY);
  navigate(landingRoute(result.session, returnUrl), { replace: true });
}

function loginAttempts(): number[] {
  const raw = sessionStorage.getItem(LOGIN_ATTEMPT_KEY);
  if (!raw) return [];
  try {
    return (JSON.parse(raw) as number[]).filter((at) => Date.now() - at < 60_000);
  } catch {
    return [];
  }
}

function recordLoginAttempt() {
  sessionStorage.setItem(LOGIN_ATTEMPT_KEY, JSON.stringify([...loginAttempts(), Date.now()]));
}

// ── Demo Mode helpers ─────────────────────────────────────────────────────
const DEMO_USERS = {
  customer: {
    id: 'demo-customer-001',
    email: 'customer@demo.bankmate.ai',
    mobile: '9876543210',
    fullName: 'Rahul Sharma (Demo)',
    roles: [UserRole.CUSTOMER],
    customerId: 'demo-customer-001',
    profileCompleted: true,
    kycStatus: 'APPROVED',
  },
  rm: {
    id: 'demo-rm-001',
    email: 'rm@demo.bankmate.ai',
    mobile: '9876543211',
    fullName: 'Priya Mehta (Demo RM)',
    roles: [UserRole.RELATIONSHIP_MANAGER],
    customerId: 'demo-rm-001',
    profileCompleted: true,
    kycStatus: 'APPROVED',
  },
  admin: {
    id: 'demo-admin-001',
    email: 'admin@demo.bankmate.ai',
    mobile: '9876543212',
    fullName: 'Amit Kumar (Demo Admin)',
    roles: [UserRole.ADMIN],
    customerId: 'demo-admin-001',
    profileCompleted: true,
    kycStatus: 'APPROVED',
  },
} as const;

function DemoAccessPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<'customer' | 'rm' | 'admin' | null>(null);

  const enterDemo = (role: 'customer' | 'rm' | 'admin') => {
    setLoading(role);
    const user = DEMO_USERS[role];
    useAuthStore.getState().setSession({
      user: { ...user, kycStatus: 'APPROVED' },
      accessToken: `demo-access-token-${role}`,
      refreshToken: `demo-refresh-token-${role}`,
      expiresIn: 86400,
      rememberMe: false,
    });
    overlay.success(`Welcome to Demo — ${role === 'customer' ? 'Customer' : role === 'rm' ? 'Relationship Manager' : 'Admin'} view!`);
    setTimeout(() => {
      const route = role === 'admin' ? ROUTES.ADMIN_DASHBOARD : role === 'rm' ? ROUTES.RM_DASHBOARD : ROUTES.DASHBOARD;
      navigate(route, { replace: true });
      setLoading(null);
    }, 400);
  };

  const demoRoles = [
    {
      key: 'customer' as const,
      label: 'Customer',
      desc: 'Dashboard, Goals, KYC, Products',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
    },
    {
      key: 'rm' as const,
      label: 'Relationship Manager',
      desc: 'Leads, Tasks, Calendar, Targets',
      icon: Briefcase,
      color: 'from-violet-500 to-violet-600',
      bg: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
      text: 'text-violet-700',
      iconBg: 'bg-violet-100',
    },
    {
      key: 'admin' as const,
      label: 'Admin',
      desc: 'Analytics, Config, Monitoring',
      icon: Shield,
      color: 'from-rose-500 to-rose-600',
      bg: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
      text: 'text-rose-700',
      iconBg: 'bg-rose-100',
    },
  ];

  return (
    <div className="mt-6 rounded-xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400">
          <Zap className="h-4 w-4 text-white" />
        </span>
        <div>
          <p className="text-sm font-bold text-amber-900">Try Demo — No login needed!</p>
          <p className="text-xs text-amber-700">Explore all 3 dashboards instantly</p>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {demoRoles.map(({ key, label, desc, icon: Icon, bg, text, iconBg }) => (
          <button
            key={key}
            id={`demo-${key}-btn`}
            type="button"
            disabled={loading !== null}
            onClick={() => enterDemo(key)}
            className={`flex w-full items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-all duration-200 ${bg} disabled:opacity-60`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
              {loading === key ? (
                <span className={`h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${text}`} />
              ) : (
                <Icon className={`h-4 w-4 ${text}`} />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${text}`}>{label}</p>
              <p className="text-xs text-gray-500 truncate">{desc}</p>
            </div>
            <span className={`text-xs font-medium ${text} opacity-70`}>→</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-amber-600">
        🔒 Demo data only · No real account required
      </p>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FieldErrors<'email' | 'password'>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next: FieldErrors<'email' | 'password'> = {};
    if (!values.email.trim()) next.email = 'Email is required.';
    if (!values.password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');
    if (!validate()) return;

    if (loginAttempts().length >= 3) {
      setFormError('Too many attempts. Please wait a minute before trying again.');
      return;
    }

    setIsSubmitting(true);
    recordLoginAttempt();
    try {
      const result = await authApi.login(values);
      completeAuth(result, values.rememberMe, navigate, searchParams.get('returnUrl'));
      overlay.success('Signed in successfully.');
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard icon={LogIn} title="Sign in" subtitle="Use your registered email and password.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {formError ? <Alert variant="error">{formError}</Alert> : null}
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            invalid={!!errors.email}
            leftAdornment={<Mail className="h-4 w-4" aria-hidden="true" />}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          />
        </Field>
        <Field label="Password" htmlFor="password" required error={errors.password}>
          <PasswordInput
            id="password"
            value={values.password}
            invalid={!!errors.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          />
        </Field>
        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <Checkbox
              checked={values.rememberMe}
              onCheckedChange={(checked) => setValues((current) => ({ ...current, rememberMe: checked === true }))}
            />
            Remember me
          </label>
          <Link to={ROUTES.FORGOT_PASSWORD} className="font-semibold text-primary-700 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Sign in
        </Button>
        <p className="text-center text-sm text-gray-500">
          New to BankMate?{' '}
          <Link to={ROUTES.REGISTER} className="font-semibold text-primary-700 hover:underline">
            Create account
          </Link>
        </p>
      </form>

      {/* ── Demo Access Panel ──────────────────────────────────────── */}
      <DemoAccessPanel />
    </AuthCard>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterFormValues>({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState<FieldErrors<keyof RegisterFormValues>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next: FieldErrors<keyof RegisterFormValues> = {};
    if (!values.fullName.trim()) next.fullName = 'Full name is required.';
    if (!/^\d{10}$/.test(values.mobile.trim())) next.mobile = 'Enter a valid 10 digit mobile number.';
    if (!values.email.includes('@')) next.email = 'Enter a valid email.';
    if (values.password.length < 8) next.password = 'Use at least 8 characters.';
    if (values.password !== values.confirmPassword) next.confirmPassword = 'Passwords do not match.';
    if (!values.acceptedTerms) next.acceptedTerms = 'Please accept the terms.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await authApi.register(values);
      completeAuth(result, true, navigate);
      overlay.success('Account created successfully.');
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard icon={UserPlus} title="Create your account" subtitle="Set up your BankMate customer profile.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {formError ? <Alert variant="error">{formError}</Alert> : null}
        <Field label="Full name" htmlFor="fullName" required error={errors.fullName}>
          <Input
            id="fullName"
            value={values.fullName}
            invalid={!!errors.fullName}
            onChange={(event) => setValues((current) => ({ ...current, fullName: event.target.value }))}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mobile" htmlFor="mobile" required error={errors.mobile}>
            <Input
              id="mobile"
              inputMode="numeric"
              autoComplete="tel"
              value={values.mobile}
              invalid={!!errors.mobile}
              leftAdornment={<Phone className="h-4 w-4" aria-hidden="true" />}
              onChange={(event) => setValues((current) => ({ ...current, mobile: event.target.value }))}
            />
          </Field>
          <Field label="Email" htmlFor="registerEmail" required error={errors.email}>
            <Input
              id="registerEmail"
              type="email"
              autoComplete="email"
              value={values.email}
              invalid={!!errors.email}
              onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            />
          </Field>
        </div>
        <Field label="Password" htmlFor="registerPassword" required error={errors.password}>
          <PasswordInput
            id="registerPassword"
            autoComplete="new-password"
            value={values.password}
            invalid={!!errors.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          />
        </Field>
        <Field label="Confirm password" htmlFor="confirmPassword" required error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            value={values.confirmPassword}
            invalid={!!errors.confirmPassword}
            onChange={(event) => setValues((current) => ({ ...current, confirmPassword: event.target.value }))}
          />
        </Field>
        <Field error={errors.acceptedTerms}>
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <Checkbox
              checked={values.acceptedTerms}
              onCheckedChange={(checked) => setValues((current) => ({ ...current, acceptedTerms: checked === true }))}
            />
            I agree to the Terms and Privacy Policy.
          </label>
        </Field>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Create account
        </Button>
        <p className="text-center text-sm text-gray-500">
          Already registered?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-primary-700 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<OtpChallenge | null>(() => readOtpChallenge());
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const maskedDestination = useMemo(() => challenge?.destination || 'your registered contact', [challenge]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!challenge) {
      setError('OTP session has expired. Please start again.');
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6 digit OTP.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authApi.verifyOtp({
        referenceId: challenge.referenceId,
        purpose: challenge.purpose,
        otp,
      });
      completeAuth(result, true, navigate);
      overlay.success('OTP verified.');
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resend = async () => {
    if (!challenge) return;
    setIsResending(true);
    setError('');
    try {
      const next = await authApi.resendOtp(challenge);
      setChallenge(next);
      persistOtpChallenge(next);
      overlay.success('OTP sent again.');
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthCard icon={ShieldCheck} title="Verify OTP" subtitle={`Enter the OTP sent to ${maskedDestination}.`}>
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? <Alert variant="error">{error}</Alert> : null}
        {!challenge ? (
          <Alert variant="warning">No active OTP challenge found. Please login or register again.</Alert>
        ) : null}
        <Field label="One-time password" htmlFor="otp" required>
          <Input
            id="otp"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            className="text-center text-lg font-semibold tracking-[0.35em]"
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
          />
        </Field>
        <Button type="submit" fullWidth loading={isSubmitting} disabled={!challenge}>
          Verify and continue
        </Button>
        <Button type="button" variant="ghost" fullWidth loading={isResending} disabled={!challenge} onClick={resend}>
          Resend OTP
        </Button>
      </form>
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!email.includes('@')) {
      setError('Enter a valid registered email.');
      return;
    }

    setIsSubmitting(true);
    try {
      setMessage(await authApi.forgotPassword({ email }));
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard icon={KeyRound} title="Forgot password" subtitle="We will send reset instructions to your email.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {message ? <Alert variant="success">{message}</Alert> : null}
        {error ? <Alert variant="error">{error}</Alert> : null}
        <Field label="Registered email" htmlFor="forgotEmail" required>
          <Input
            id="forgotEmail"
            type="email"
            autoComplete="email"
            value={email}
            leftAdornment={<Mail className="h-4 w-4" aria-hidden="true" />}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Send reset link
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </form>
    </AuthCard>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token = '' } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.resetPassword({ token, newPassword: password });
      overlay.success('Password reset successfully.');
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard icon={KeyRound} title="Reset password" subtitle="Choose a new password for your account.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? <Alert variant="error">{error}</Alert> : null}
        <Field label="New password" htmlFor="newPassword" required>
          <PasswordInput
            id="newPassword"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        <Field label="Confirm new password" htmlFor="confirmNewPassword" required>
          <PasswordInput
            id="confirmNewPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Field>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Reset password
        </Button>
      </form>
    </AuthCard>
  );
}

export function LogoutPage() {
  const navigate = useNavigate();
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    const runLogout = async () => {
      try {
        await authApi.logout();
      } catch {
        // Logout must complete locally even if the backend is unreachable.
      } finally {
        clearSession();
        overlay.success('Signed out.');
        navigate(ROUTES.LOGIN, { replace: true });
      }
    };

    runLogout();
  }, [clearSession, navigate]);

  return <LoadingScreen message="Signing you out..." />;
}
