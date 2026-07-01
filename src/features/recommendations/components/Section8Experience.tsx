import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Bot,
  Check,
  CheckCircle2,
  Filter,
  Home,
  Info,
  RefreshCw,
  Scale,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { ProductCategory, PRODUCT_CATEGORY_LABELS } from '@/core/constants/products.constants';
import { LIFE_EVENT_LABELS } from '@/core/constants/life-events.constants';
import { routeBuilders, ROUTES } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';
import { categoryTabs, products, recommendations } from '../data/section8.mock';
import { useSection8Store } from '../store/section8.store';
import type { EligibilityStatus, ProductSortKey, Section8Product, Section8Recommendation, SortKey } from '../types/section8.types';
import {
  affordabilityLabel,
  eligibilityClass,
  eligibilityLabel,
  filterByCategory,
  getProduct,
  getRecommendation,
  matchBadgeClass,
  productIcon,
  recProduct,
} from '../utils/section8.utils';
function ScoreBadge({ score }: { score: number }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-bold', matchBadgeClass(score))}>
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      {score}% Match
    </span>
  );
}

function AffordabilityIndicator({ score }: { score: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-app">{affordabilityLabel(score)}</span>
        <span className="text-muted-app">{score}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={cn('h-full rounded-full', score >= 80 ? 'bg-success' : score >= 60 ? 'bg-primary-600' : score >= 40 ? 'bg-warning' : 'bg-error')}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ProductLogo({ product }: { product: Section8Product }) {
  const Icon = productIcon(product);
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700" aria-hidden="true">
      <Icon className="h-6 w-6" />
    </span>
  );
}

function RecommendationCard({ rec }: { rec: Section8Recommendation }) {
  const product = recProduct(rec);
  const navigate = useNavigate();
  const savedIds = useSection8Store((state) => state.savedIds);
  const comparisonIds = useSection8Store((state) => state.comparisonIds);
  const eligibilityChecks = useSection8Store((state) => state.eligibilityChecks);
  const toggleSaved = useSection8Store((state) => state.toggleSaved);
  const toggleCompare = useSection8Store((state) => state.toggleCompare);
  const dismiss = useSection8Store((state) => state.dismiss);
  const runEligibility = useSection8Store((state) => state.runEligibility);
  const status = eligibilityChecks[product.id] ?? rec.eligibilityStatus;
  const selected = comparisonIds.includes(product.id);
  const saved = savedIds.includes(rec.id);

  return (
    <article
      className={cn(
        'bm-card bm-card-hover flex h-full flex-col gap-4 p-4',
        selected && 'border-primary-300 bg-primary-50',
        saved && 'border-primary-200',
        status === 'NOT_ELIGIBLE' && 'opacity-70',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <ProductLogo product={product} />
        <ScoreBadge score={rec.matchScore} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-app">{product.name}</h3>
        <p className="text-sm text-muted-app">{product.provider}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {product.metrics.map((metric) => (
          <div key={metric.label} className="rounded-md border border-app bg-surface-muted p-3">
            <p className="text-sm font-semibold text-app">{metric.value}</p>
            <p className="text-xs text-muted-app">{metric.label}</p>
          </div>
        ))}
      </div>
      <AffordabilityIndicator score={rec.affordabilityScore} />
      <div className="flex flex-wrap gap-2">
        {rec.lifeEventType && (
          <span className="rounded-full bg-secondary-100 px-2 py-1 text-xs font-semibold text-secondary-800">
            {LIFE_EVENT_LABELS[rec.lifeEventType]}
          </span>
        )}
        <button
          type="button"
          onClick={() => status === 'CHECK_ELIGIBILITY' && runEligibility(product.id, 'LIKELY_ELIGIBLE')}
          className={cn('rounded-full px-2 py-1 text-xs font-semibold', eligibilityClass(status))}
        >
          {eligibilityLabel(status)}
        </button>
      </div>
      <p className="line-clamp-2 text-sm text-muted-app">{rec.reason}</p>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={status === 'NOT_ELIGIBLE'}
          onClick={() => navigate(routeBuilders.productApply(product.id))}
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white disabled:bg-gray-300"
        >
          Apply Now
        </button>
        <Link
          to={routeBuilders.recommendationDetail(rec.id)}
          className="rounded-md border border-primary-200 px-3 py-2 text-center text-sm font-semibold text-primary-700 hover:bg-primary-50"
        >
          View Details
        </Link>
      </div>
      <div className="flex items-center gap-2 border-t border-app pt-3">
        <button
          type="button"
          onClick={() => toggleSaved(rec.id)}
          className={cn('flex h-9 w-9 items-center justify-center rounded-md border border-app', saved && 'border-primary-200 bg-primary-50 text-primary-700')}
          aria-label={saved ? 'Remove saved recommendation' : 'Save recommendation'}
          title={saved ? 'Remove saved recommendation' : 'Save recommendation'}
        >
          <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
        </button>
        <button
          type="button"
          onClick={() => toggleCompare(product.id)}
          className={cn('flex h-9 w-9 items-center justify-center rounded-md border border-app', selected && 'border-primary-200 bg-primary-50 text-primary-700')}
          aria-label="Compare product"
          title="Compare product"
        >
          <Scale className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => dismiss(rec.id)}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-md border border-app text-muted-app hover:bg-gray-50"
          aria-label="Dismiss recommendation"
          title="Dismiss recommendation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function ProductCard({ product, recommended = false }: { product: Section8Product; recommended?: boolean }) {
  const toggleCompare = useSection8Store((state) => state.toggleCompare);
  const comparisonIds = useSection8Store((state) => state.comparisonIds);
  const trackView = useSection8Store((state) => state.trackView);

  return (
    <article className={cn('bm-card flex h-full flex-col gap-4 p-4', comparisonIds.includes(product.id) && 'border-primary-300 bg-primary-50')}>
      <div className="flex items-start gap-3">
        <ProductLogo product={product} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-app">{product.name}</h3>
          <p className="text-sm text-muted-app">{product.provider}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </span>
        {recommended && (
          <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">
            AI Recommended
          </span>
        )}
      </div>
      <p className="line-clamp-2 text-sm text-muted-app">{product.summary}</p>
      <div className="grid grid-cols-2 gap-2">
        {product.metrics.map((metric) => (
          <div key={metric.label} className="rounded-md bg-surface-muted p-3">
            <p className="text-sm font-semibold text-app">{metric.value}</p>
            <p className="text-xs text-muted-app">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto flex gap-2">
        <Link
          to={routeBuilders.productDetail(product.id)}
          onClick={() => trackView(product.id)}
          className="flex-1 rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => toggleCompare(product.id)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-app text-muted-app hover:bg-primary-50 hover:text-primary-700"
          aria-label="Compare product"
          title="Compare product"
        >
          <Scale className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function ComparisonBar() {
  const navigate = useNavigate();
  const comparisonIds = useSection8Store((state) => state.comparisonIds);
  const removeCompare = useSection8Store((state) => state.removeCompare);
  const clearCompare = useSection8Store((state) => state.clearCompare);

  if (comparisonIds.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[300] border-t border-app bg-surface px-4 py-3 shadow-lg lg:left-[280px]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-app">Comparing ({comparisonIds.length}/3)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {comparisonIds.map((id) => (
              <span key={id} className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                {getProduct(id).name}
                <button type="button" onClick={() => removeCompare(id)} aria-label="Remove from comparison">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {comparisonIds.length < 3 && <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">Add product</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={clearCompare} className="rounded-md px-3 py-2 text-sm font-semibold text-muted-app hover:bg-gray-50">
            Clear All
          </button>
          <button
            type="button"
            disabled={comparisonIds.length < 2}
            onClick={() => navigate(ROUTES.RECOMMENDATION_COMPARE)}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-gray-300"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero({ catalog = false }: { catalog?: boolean }) {
  return (
    <section className="rounded-lg bg-primary-600 p-5 text-white shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-primary-100">{catalog ? 'Product Discovery' : 'AI Recommendation Engine'}</p>
          <h1 className="mt-1 text-2xl font-bold">
            {catalog ? 'Explore Banking Products' : 'Good evening, Priya. Here are your AI-matched products'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-primary-100">
            {catalog ? 'Browse the complete product catalog with filters, search, and comparison.' : 'Based on your Home Purchase journey and financial profile. Last updated 2 hours ago.'}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary-700">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>
    </section>
  );
}

function LifeEventBanner() {
  return (
    <section className="rounded-lg border border-secondary-100 bg-secondary-100 p-4 text-secondary-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-secondary-700">
            <Home className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold">We noticed you may be planning a home purchase</p>
            <p className="text-sm text-secondary-800">Home loan products are matched to your profile. Confidence: 87%.</p>
          </div>
        </div>
        <Link to={routeBuilders.lifeEventDetail('home-purchase')} className="text-sm font-semibold text-secondary-900">
          Learn more
        </Link>
      </div>
    </section>
  );
}

function SearchSortBar({
  search,
  setSearch,
  sort,
  setSort,
  productMode = false,
}: {
  search: string;
  setSearch: (value: string) => void;
  sort: SortKey | ProductSortKey;
  setSort: (value: SortKey | ProductSortKey) => void;
  productMode?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <label className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <span className="sr-only">Search products</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products, loans, cards, insurance"
          className="h-11 w-full rounded-md border border-app bg-surface pl-10 pr-3 text-sm"
        />
      </label>
      <select
        value={sort}
        onChange={(event) => setSort(event.target.value as SortKey | ProductSortKey)}
        className="h-11 rounded-md border border-app bg-surface px-3 text-sm font-medium"
        aria-label="Sort products"
      >
        {productMode ? (
          <>
            <option value="recommended">Recommended</option>
            <option value="rate_low">Interest Rate: Low to High</option>
            <option value="amount_high">Loan Amount: High to Low</option>
            <option value="newest">Newest First</option>
          </>
        ) : (
          <>
            <option value="best_match">Best Match</option>
            <option value="affordability">Most Affordable</option>
            <option value="newest">Newest</option>
            <option value="rate_low">Interest Rate: Low to High</option>
          </>
        )}
      </select>
    </div>
  );
}

function CategoryTabs({ category, setCategory }: { category: string; setCategory: (value: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Recommendation categories">
      {categoryTabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => setCategory(tab.value)}
          className={cn(
            'shrink-0 rounded-md border px-3 py-2 text-sm font-semibold',
            category === tab.value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-app bg-surface text-muted-app',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function RecommendationsExperience() {
  const [params, setParams] = useSearchParams();
  const [category, setCategoryState] = useState(params.get('category') ?? 'ALL');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('best_match');
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const dismissedIds = useSection8Store((state) => state.dismissedIds);

  function setCategory(value: string) {
    setCategoryState(value);
    setParams(value === 'ALL' ? {} : { category: value });
  }

  const visibleRecommendations = useMemo(() => {
    const query = search.toLowerCase();
    return recommendations
      .filter((rec) => !dismissedIds.includes(rec.id))
      .filter((rec) => filterByCategory(recProduct(rec), category))
      .filter((rec) => (eligibleOnly ? rec.eligibilityStatus !== 'NOT_ELIGIBLE' : true))
      .filter((rec) => `${recProduct(rec).name} ${recProduct(rec).provider} ${rec.reason}`.toLowerCase().includes(query))
      .sort((a, b) => {
        if (sort === 'affordability') return b.affordabilityScore - a.affordabilityScore;
        if (sort === 'newest') return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        if (sort === 'rate_low') return recProduct(a).interestRate - recProduct(b).interestRate;
        return b.matchScore - a.matchScore;
      });
  }, [category, dismissedIds, eligibleOnly, search, sort]);

  return (
    <div className="space-y-5 pb-24">
      <Hero />
      <LifeEventBanner />
      <CategoryTabs category={category} setCategory={setCategory} />
      <div className="flex flex-col gap-3">
        <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={(value) => setSort(value as SortKey)} />
        <label className="inline-flex items-center gap-2 text-sm font-medium text-app">
          <input type="checkbox" checked={eligibleOnly} onChange={(event) => setEligibleOnly(event.target.checked)} className="h-4 w-4" />
          Show only eligible products
        </label>
      </div>
      {visibleRecommendations.length === 0 ? (
        <EmptyState title={`No ${category === 'ALL' ? '' : 'matching '}recommendations yet`} action="Explore all products" to={ROUTES.PRODUCTS} />
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleRecommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </section>
      )}
      <RecentlyViewed />
      <ComparisonBar />
    </div>
  );
}

function RecentlyViewed() {
  const recentlyViewedIds = useSection8Store((state) => state.recentlyViewedIds);
  if (recentlyViewedIds.length === 0) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-app">Continue where you left off</h2>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {recentlyViewedIds.map((id) => (
          <Link key={id} to={routeBuilders.productDetail(id)} className="min-w-[220px] rounded-lg border border-app bg-surface p-3 hover:bg-gray-50">
            <p className="font-semibold text-app">{getProduct(id).name}</p>
            <p className="mt-1 text-sm text-muted-app">{getProduct(id).provider}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function EmptyState({ title, action, to }: { title: string; action: string; to: string }) {
  return (
    <section className="rounded-lg border border-dashed border-app bg-surface p-8 text-center">
      <Sparkles className="mx-auto h-8 w-8 text-primary-600" />
      <h2 className="mt-3 text-lg font-semibold text-app">{title}</h2>
      <p className="mt-1 text-sm text-muted-app">Your AI advisor will update suggestions as your profile evolves.</p>
      <Link to={to} className="mt-4 inline-flex rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
        {action}
      </Link>
    </section>
  );
}

export function ProductsExperience() {
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ProductSortKey>('recommended');

  const recommendedProductIds = new Set(recommendations.map((rec) => rec.productId));
  const visibleProducts = useMemo(() => {
    const query = search.toLowerCase();
    return products
      .filter((product) => filterByCategory(product, category))
      .filter((product) => `${product.name} ${product.provider} ${product.summary}`.toLowerCase().includes(query))
      .sort((a, b) => {
        if (sort === 'rate_low') return a.interestRate - b.interestRate;
        if (sort === 'amount_high') return (b.maxAmount ?? 0) - (a.maxAmount ?? 0);
        if (sort === 'newest') return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        return Number(recommendedProductIds.has(b.id)) - Number(recommendedProductIds.has(a.id));
      });
  }, [category, recommendedProductIds, search, sort]);

  return (
    <div className="space-y-5 pb-24">
      <Hero catalog />
      <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={(value) => setSort(value as ProductSortKey)} productMode />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-app">Featured Products</h2>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {products.filter((product) => product.featured).map((product) => (
            <div key={product.id} className="min-w-[280px]">
              <ProductCard product={product} recommended={recommendedProductIds.has(product.id)} />
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="bm-card h-fit p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-app">Filters</h2>
            <button type="button" onClick={() => setCategory('ALL')} className="text-xs font-semibold text-primary-700">
              Clear
            </button>
          </div>
          <CategoryTabs category={category} setCategory={setCategory} />
          <div className="mt-5 space-y-4 text-sm">
            <FilterRow label="Interest Rate" value="0% - 25%" />
            <FilterRow label="Loan Amount" value="Rs 10K - Rs 5Cr" />
            <FilterRow label="Tenure" value="Up to 20+ years" />
          </div>
        </aside>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} recommended={recommendedProductIds.has(product.id)} />
          ))}
        </section>
      </div>
      <RecentlyViewed />
      <ComparisonBar />
    </div>
  );
}

function FilterRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface-muted p-3">
      <p className="font-semibold text-app">{label}</p>
      <p className="mt-1 text-muted-app">{value}</p>
    </div>
  );
}

export function RecommendationDetailExperience() {
  const params = useParams();
  const rec = getRecommendation(params.recId);
  const product = recProduct(rec);
  const [explanationOpen, setExplanationOpen] = useState(false);
  const runEligibility = useSection8Store((state) => state.runEligibility);
  const eligibilityChecks = useSection8Store((state) => state.eligibilityChecks);
  const trackView = useSection8Store((state) => state.trackView);
  const effectiveEligibility = eligibilityChecks[product.id] ?? rec.eligibilityStatus;
  trackView(product.id);

  return (
    <div className="space-y-5 pb-24">
      <Link to={ROUTES.RECOMMENDATIONS} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
        <ArrowLeft className="h-4 w-4" /> Back to recommendations
      </Link>
      <section className="bm-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <ProductLogo product={product} />
            <div>
              <h1 className="text-2xl font-bold text-app">{product.name}</h1>
              <p className="text-muted-app">{product.provider} / {PRODUCT_CATEGORY_LABELS[product.category]}</p>
            </div>
          </div>
          <ScoreBadge score={rec.matchScore} />
        </div>
      </section>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-5">
          <Panel title="Key Metrics">
            <div className="grid gap-3 sm:grid-cols-2">
              {[...product.metrics, { label: 'Fee', value: product.fee }, { label: 'Provider', value: product.provider }].map((metric) => (
                <div key={metric.label} className="rounded-md border border-app p-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary-600" />
                    <p className="text-xs text-muted-app">{metric.label}</p>
                  </div>
                  <p className="mt-1 font-semibold text-app">{metric.value}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Product Features">
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-app">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          </Panel>
          <EligibilityChecker status={effectiveEligibility} onRun={() => runEligibility(product.id, 'LIKELY_ELIGIBLE')} />
          <Panel title="Documents Required">
            <ul className="space-y-2">
              {product.documents.map((doc) => (
                <li key={doc} className="flex items-center justify-between rounded-md bg-surface-muted p-3 text-sm">
                  <span className="font-medium text-app">{doc}</span>
                  <span className="text-muted-app">PDF or Image, max 5MB</span>
                </li>
              ))}
            </ul>
          </Panel>
          {product.category === ProductCategory.LOANS && <EMICalculator product={product} />}
          <Panel title="Key Terms">
            <div className="grid gap-3 sm:grid-cols-3">
              {product.terms.map((term) => (
                <div key={term.label} className="rounded-md bg-surface-muted p-3">
                  <p className="text-xs text-muted-app">{term.label}</p>
                  <p className="mt-1 font-semibold text-app">{term.value}</p>
                </div>
              ))}
            </div>
          </Panel>
        </main>
        <aside className="space-y-4">
          <Panel title={`Why ${rec.matchScore}% Match?`}>
            <div className="space-y-3">
              {rec.breakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-app">{item.label}</span>
                    <span className="text-muted-app">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-primary-600" style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Affordability">
            <AffordabilityIndicator score={rec.affordabilityScore} />
            <p className="mt-3 text-sm text-muted-app">Estimated EMI leaves enough disposable income for regular expenses.</p>
          </Panel>
          <Panel title="AI Explanation">
            {!explanationOpen ? (
              <button
                type="button"
                onClick={() => setExplanationOpen(true)}
                className="w-full rounded-md border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
              >
                Why is this recommended for you?
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-app">
                  <Bot className="h-4 w-4 text-primary-600" />
                  BankMate AI Explains
                </div>
                <ul className="space-y-2 text-sm text-muted-app">
                  {rec.explanation.map((line) => (
                    <li key={line} className="flex gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-app">AI-generated explanation. Not financial advice.</p>
              </div>
            )}
          </Panel>
          <div className="sticky top-20 rounded-lg border border-app bg-surface p-4 shadow-sm">
            <p className="text-sm font-semibold text-app">{product.name}</p>
            <div className="mt-2"><ScoreBadge score={rec.matchScore} /></div>
            <Link to={routeBuilders.productApply(product.id)} className="mt-4 block rounded-md bg-primary-600 px-4 py-2 text-center text-sm font-semibold text-white">
              Apply Now
            </Link>
          </div>
        </aside>
      </div>
      <ComparisonBar />
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bm-card p-4">
      <h2 className="mb-3 text-base font-semibold text-app">{title}</h2>
      {children}
    </section>
  );
}

function EligibilityChecker({ status, onRun }: { status: EligibilityStatus; onRun: () => void }) {
  const rows = [
    { label: 'Income Match', status: status === 'NOT_ELIGIBLE' ? 'Does not meet' : 'Meets criteria' },
    { label: 'Credit Score', status: status === 'MAY_NOT_QUALIFY' ? 'Below threshold' : status === 'NOT_ELIGIBLE' ? 'Does not meet' : 'Meets criteria' },
    { label: 'Employment Type', status: 'Meets criteria' },
    { label: 'Age Requirement', status: 'Meets criteria' },
  ];
  return (
    <Panel title="Eligibility Visualization">
      <div className={cn('rounded-md p-3', eligibilityClass(status))}>
        <p className="font-semibold">{eligibilityLabel(status)}</p>
        <p className="mt-1 text-sm">Soft check only. No impact on credit score.</p>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-md bg-surface-muted p-3 text-sm">
            <span className="font-medium text-app">{row.label}</span>
            <span className="text-muted-app">{row.status}</span>
          </div>
        ))}
      </div>
      {status === 'CHECK_ELIGIBILITY' && (
        <button type="button" onClick={onRun} className="mt-3 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
          Check Eligibility
        </button>
      )}
    </Panel>
  );
}

function EMICalculator({ product }: { product: Section8Product }) {
  const [amount, setAmount] = useState(Math.min(product.maxAmount ?? 1000000, 2500000));
  const [tenure, setTenure] = useState(180);
  const monthlyRate = product.interestRate / 12 / 100;
  const emi = Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));
  const total = emi * tenure;

  return (
    <Panel title="EMI Calculator">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          <span className="font-medium text-app">Loan Amount</span>
          <input type="range" min={100000} max={product.maxAmount ?? 5000000} step={100000} value={amount} onChange={(event) => setAmount(Number(event.target.value))} className="mt-2 w-full" />
          <span className="text-muted-app">Rs {amount.toLocaleString('en-IN')}</span>
        </label>
        <label className="text-sm">
          <span className="font-medium text-app">Tenure</span>
          <input type="range" min={12} max={360} step={12} value={tenure} onChange={(event) => setTenure(Number(event.target.value))} className="mt-2 w-full" />
          <span className="text-muted-app">{tenure} months</span>
        </label>
        <div className="rounded-md bg-primary-50 p-3">
          <p className="text-xs text-primary-700">Monthly EMI</p>
          <p className="mt-1 text-xl font-bold text-primary-800">Rs {emi.toLocaleString('en-IN')}</p>
          <p className="text-xs text-primary-700">Total payment Rs {total.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </Panel>
  );
}

export function ProductDetailExperience() {
  const params = useParams();
  const product = getProduct(params.productId ?? '');
  useSection8Store.getState().trackView(product.id);

  return (
    <div className="space-y-5 pb-24">
      <Link to={ROUTES.PRODUCTS} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>
      <section className="bm-card p-5">
        <div className="flex items-center gap-4">
          <ProductLogo product={product} />
          <div>
            <h1 className="text-2xl font-bold text-app">{product.name}</h1>
            <p className="text-muted-app">{product.provider} / {PRODUCT_CATEGORY_LABELS[product.category]}</p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-muted-app">{product.summary}</p>
      </section>
      <Panel title="Product Features">
        <ul className="grid gap-2 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-app">
              <Check className="h-4 w-4 text-success" /> {feature}
            </li>
          ))}
        </ul>
      </Panel>
      <EligibilityChecker status="CHECK_ELIGIBILITY" onRun={() => useSection8Store.getState().runEligibility(product.id, 'LIKELY_ELIGIBLE')} />
      <ComparisonBar />
    </div>
  );
}

export function ComparisonExperience() {
  const comparisonIds = useSection8Store((state) => state.comparisonIds);
  const removeCompare = useSection8Store((state) => state.removeCompare);
  const selected = comparisonIds.length > 0 ? comparisonIds.map(getProduct) : products.slice(0, 2);
  const selectedRecs = selected.map((product) => recommendations.find((rec) => rec.productId === product.id));
  const best = selectedRecs.filter(Boolean).sort((a, b) => (b?.matchScore ?? 0) - (a?.matchScore ?? 0))[0];

  const rows = [
    { label: 'AI Match Score', value: (product: Section8Product) => `${recommendations.find((rec) => rec.productId === product.id)?.matchScore ?? '-'}%` },
    { label: 'Eligibility', value: (product: Section8Product) => eligibilityLabel(recommendations.find((rec) => rec.productId === product.id)?.eligibilityStatus ?? 'CHECK_ELIGIBILITY') },
    { label: 'Affordability', value: (product: Section8Product) => `${recommendations.find((rec) => rec.productId === product.id)?.affordabilityScore ?? '-'}%` },
    { label: 'Interest Rate', value: (product: Section8Product) => (product.interestRate ? `${product.interestRate}% p.a.` : 'N/A') },
    { label: 'Fee', value: (product: Section8Product) => product.fee },
  ];

  return (
    <div className="space-y-5 pb-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-app">Compare Products</h1>
          <p className="text-muted-app">Side-by-side match score, affordability, eligibility, and terms.</p>
        </div>
        <Link to={ROUTES.RECOMMENDATIONS} className="inline-flex items-center gap-2 rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">
          <ArrowLeft className="h-4 w-4" /> Back to Recommendations
        </Link>
      </div>
      {best && (
        <section className="rounded-lg border border-primary-100 bg-primary-50 p-4">
          <p className="font-semibold text-primary-800">Based on your profile, {getProduct(best.productId).name} is your best match.</p>
          <p className="mt-1 text-sm text-primary-700">Powered by the Recommendation Engine.</p>
        </section>
      )}
      <div className="overflow-x-auto rounded-lg border border-app bg-surface">
        <table className="min-w-[760px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-app bg-surface-muted">
              <th className="sticky left-0 bg-surface-muted p-3 text-left font-semibold text-app">Feature</th>
              {selected.map((product) => (
                <th key={product.id} className="p-3 text-left align-top">
                  <div className="flex items-start gap-2">
                    <ProductLogo product={product} />
                    <div>
                      <p className="font-semibold text-app">{product.name}</p>
                      <button type="button" onClick={() => removeCompare(product.id)} className="mt-1 text-xs font-semibold text-error">
                        Remove
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-app">
                <td className="sticky left-0 bg-surface p-3 font-semibold text-app">{row.label}</td>
                {selected.map((product) => (
                  <td key={product.id} className="p-3 text-muted-app">{row.value(product)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="sticky left-0 bg-surface p-3 font-semibold text-app">CTA</td>
              {selected.map((product) => (
                <td key={product.id} className="p-3">
                  <Link to={routeBuilders.productApply(product.id)} className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white">
                    Apply Now
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <ComparisonBar />
    </div>
  );
}
