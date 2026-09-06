import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Building2, 
  Sparkles,
  Award,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { mockProviders } from '../../data/mockProviders';
import { Provider } from '../../types';
import { 
  parseNaturalLanguageQuery, 
  rankProviders, 
  SearchFilters 
} from '../../services/providerMatcher';
import { MatchScoreModal } from './MatchScoreModal';
import { ProviderDetailModal } from './ProviderDetailModal';
import { Badge } from '../common/Badge';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface ProviderSearchProps {
  onBookAppointment: (provider: Provider, slot: string) => void;
  onShareRecords: (provider: Provider) => void;
}

export const ProviderSearch: React.FC<ProviderSearchProps> = ({
  onBookAppointment,
  onShareRecords
}) => {
  const [searchQuery, setSearchQuery] = useState('I need an affordable diabetes specialist near me');
  const [specialty, setSpecialty] = useState('Endocrinology');
  const [costTier, setCostTier] = useState('Affordable');
  const [maxDistanceKm, setMaxDistanceKm] = useState(15);
  const [language, setLanguage] = useState('All');
  const [gender, setGender] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [facility, setFacility] = useState('All');

  const [showFilters, setShowFilters] = useState(false);
  const [selectedProviderForScore, setSelectedProviderForScore] = useState<Provider | null>(null);
  const [selectedProviderForDetail, setSelectedProviderForDetail] = useState<Provider | null>(null);

  // Handle Natural Language Search change
  const handleQueryChange = (val: string) => {
    setSearchQuery(val);
    const parsed = parseNaturalLanguageQuery(val);
    if (parsed.specialty) setSpecialty(parsed.specialty);
    if (parsed.costTier) setCostTier(parsed.costTier);
    if (parsed.maxDistanceKm) setMaxDistanceKm(parsed.maxDistanceKm);
    if (parsed.language) setLanguage(parsed.language);
    if (parsed.gender) setGender(parsed.gender);
  };

  const handleApplyPreset = (query: string) => {
    handleQueryChange(query);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSpecialty('All');
    setCostTier('All');
    setMaxDistanceKm(25);
    setLanguage('All');
    setGender('All');
    setVerifiedOnly(false);
    setFacility('All');
  };

  // Rank providers using deterministic engine
  const currentFilters: SearchFilters = {
    query: searchQuery,
    specialty,
    maxDistanceKm,
    costTier,
    language,
    gender,
    verifiedOnly,
    facility
  };

  const rankedProviders = useMemo(() => {
    return rankProviders(mockProviders, currentFilters, ['English', 'Hindi']);
  }, [currentFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Find the Right Care</h1>
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
              Deterministic 100-pt Rubric
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover verified physicians and hospital clinics matched strictly to your clinical needs and preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Zero Paid Ads / Zero Sponsored Bias</span>
          </span>
        </div>
      </div>

      {/* NATURAL LANGUAGE SEARCH BAR */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Natural Language Search:
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="e.g. I need an affordable diabetes specialist near me"
              className="w-full pl-11 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Try searching:</span>
          {[
            'I need an affordable diabetes specialist nearby',
            'Senior physician for blood pressure within 3 km',
            'Cardiologist for lipid assessment',
            'Government clinic with subsidized medicines'
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg text-slate-600 transition"
            >
              "{preset}"
            </button>
          ))}
        </div>

        {/* EXPANDABLE MULTI-DIMENSIONAL FILTERS */}
        {showFilters && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs animate-in fade-in duration-150">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Specialty</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="All">All Specialties</option>
                <option value="Endocrinology">Endocrinology (Diabetes/Thyroid)</option>
                <option value="General Medicine">General Internal Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cost Tier</label>
              <select
                value={costTier}
                onChange={(e) => setCostTier(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="All">All Tiers</option>
                <option value="Affordable">Affordable (&lt;= ₹700 or Free)</option>
                <option value="Moderate">Moderate (₹700 – ₹1200)</option>
                <option value="Premium">Premium (&gt; ₹1200)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Distance</label>
              <select
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value={3}>Within 3 km</option>
                <option value={5}>Within 5 km</option>
                <option value={10}>Within 10 km</option>
                <option value={25}>Within 25 km</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="All">Any Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Kannada">Kannada</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-4 flex items-center justify-between pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-teal-600"
                />
                <span className="font-semibold text-slate-700">Verified Credentials Only (State Medical Council)</span>
              </label>

              <button
                onClick={handleResetFilters}
                className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RESULTS HEADER & MATCH NOTICE */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Showing <strong className="text-slate-800 font-bold">{rankedProviders.length}</strong> providers matching your criteria
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-teal-800 font-medium">
          <Zap className="w-3.5 h-3.5 text-teal-600" />
          <span>Ranked by deterministic clinical compatibility score</span>
        </div>
      </div>

      {/* PROVIDERS LIST */}
      {rankedProviders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No matching providers found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try broadening your search radius or selecting "All Specialties".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rankedProviders.map(provider => (
            <div
              key={provider.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Top Row: Info & Match Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {provider.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">{provider.name}</h3>
                        <Badge variant="verified" size="sm">Verified</Badge>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">{provider.title}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{provider.distanceKm} km away • {provider.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-right flex-shrink-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 font-extrabold text-sm">
                      <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                      <span>{provider.matchScore}%</span>
                    </div>
                    <button
                      onClick={() => setSelectedProviderForScore(provider)}
                      className="block text-[10px] text-teal-700 hover:underline font-semibold mt-1"
                    >
                      Why this match?
                    </button>
                  </div>
                </div>

                {/* Badges: Cost, Languages, Facility */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                    ₹{provider.consultationFee === 0 ? 'Free' : `${provider.consultationFee}`} • {provider.costTier}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    {provider.languages.slice(0, 3).join(', ')}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-medium">
                    {provider.facilityCapabilities[0]}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {provider.about}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProviderForScore(provider)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  <span>Score Breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShareRecords(provider)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  >
                    Share Records
                  </button>
                  <button
                    onClick={() => setSelectedProviderForDetail(provider)}
                    className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-2xs"
                  >
                    View & Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}
      <MatchScoreModal
        provider={selectedProviderForScore}
        isOpen={!!selectedProviderForScore}
        onClose={() => setSelectedProviderForScore(null)}
        onAdjustPreferences={() => {
          setShowFilters(true);
        }}
      />

      <ProviderDetailModal
        provider={selectedProviderForDetail}
        isOpen={!!selectedProviderForDetail}
        onClose={() => setSelectedProviderForDetail(null)}
        onShareRecords={(p) => onShareRecords(p)}
        onBookSuccess={(p, slot) => onBookAppointment(p, slot)}
      />

      {/* Statutory Disclaimer */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl text-slate-600 text-xs leading-relaxed">
        <strong>Transparency & Compliance Note:</strong> Provider records shown are mock data formatted to demonstrate ABDM Health Facility Registry (HFR) and Healthcare Professional Registry (HPR) interoperability. Scoring is conducted deterministically using patient preferences and clinical alignment. No doctor or institution has paid for prominence.
      </div>
    </div>
  );
};
