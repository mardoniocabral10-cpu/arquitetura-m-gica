-- =====================================================
-- MEDIA MASTER DATABASE MIGRATION - PART 1: ENUMS
-- =====================================================

-- Create custom ENUM types
CREATE TYPE public.app_role AS ENUM (
  'admin',
  'user',
  'vendor',
  'vendor_instagram',
  'vendor_tiktok',
  'vendor_model',
  'indicador',
  'gerente_contas'
);

CREATE TYPE public.plan_type AS ENUM (
  'free',
  'basic',
  'pro',
  'agency'
);

CREATE TYPE public.subscription_status AS ENUM (
  'active',
  'pending',
  'cancelled',
  'expired'
);

CREATE TYPE public.transaction_status AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded'
);

-- =====================================================
-- CORE TABLES (no foreign key dependencies)
-- =====================================================

-- Profiles table (core user data)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  current_plan public.plan_type DEFAULT 'free',
  is_online BOOLEAN DEFAULT false,
  is_suspended BOOLEAN DEFAULT false,
  last_seen_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role public.app_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Plans
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug public.plan_type NOT NULL,
  description TEXT,
  price_cents INTEGER DEFAULT 0,
  features JSONB,
  max_destinations INTEGER,
  max_funnels INTEGER,
  max_media_per_month INTEGER,
  has_scheduling BOOLEAN DEFAULT false,
  has_ai_models BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  status public.subscription_status DEFAULT 'pending',
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Transactions
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  external_id TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  net_amount_cents INTEGER,
  status public.transaction_status DEFAULT 'pending',
  payment_method TEXT,
  product_type TEXT,
  product_id TEXT,
  buyer_name TEXT,
  buyer_email TEXT,
  buyer_phone TEXT,
  buyer_document TEXT,
  pix_code TEXT,
  pix_qrcode_base64 TEXT,
  buckpay_id TEXT,
  is_admin_granted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Telegram integrations
CREATE TABLE public.telegram_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  bot_token TEXT NOT NULL,
  bot_name TEXT,
  bot_username TEXT,
  chat_id TEXT,
  chat_title TEXT,
  is_connected BOOLEAN DEFAULT false,
  is_validated BOOLEAN DEFAULT false,
  last_validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Destinations
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  chat_title TEXT,
  chat_type TEXT,
  telegram_integration_id UUID REFERENCES public.telegram_integrations(id),
  members_count INTEGER,
  status TEXT DEFAULT 'active',
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin media packs
CREATE TABLE public.admin_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  media_files JSONB,
  file_count INTEGER,
  pack_type TEXT DEFAULT 'video',
  min_plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Funnels
CREATE TABLE public.funnels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  channel TEXT,
  telegram_integration_id UUID REFERENCES public.telegram_integrations(id),
  is_active BOOLEAN DEFAULT true,
  trigger_keywords TEXT[],
  webhook_url TEXT,
  webhook_registered BOOLEAN DEFAULT false,
  schema_version INTEGER DEFAULT 1,
  -- Principal content
  principal_content TEXT,
  principal_media_url TEXT,
  principal_media_type TEXT,
  principal_cta_enabled BOOLEAN DEFAULT false,
  principal_cta_text TEXT,
  principal_cta_above_text TEXT,
  -- Upsell
  upsell_enabled BOOLEAN DEFAULT false,
  upsell_content TEXT,
  upsell_media_url TEXT,
  upsell_mode TEXT,
  -- Downsell
  downsell_enabled BOOLEAN DEFAULT false,
  downsell_content TEXT,
  downsell_media_url TEXT,
  downsell_mode TEXT,
  -- Order bump
  orderbump_enabled BOOLEAN DEFAULT false,
  orderbump_type TEXT,
  orderbump_call_text TEXT,
  orderbump_media_url TEXT,
  orderbump_delivery_timing TEXT,
  -- Remarketing
  remarketing_enabled BOOLEAN DEFAULT false,
  remarketing_content TEXT,
  remarketing_delay_minutes INTEGER,
  remarketing_mode TEXT,
  auto_remarketing_enabled BOOLEAN DEFAULT false,
  auto_remarketing_message TEXT,
  -- Disparos
  disparos_enabled BOOLEAN DEFAULT false,
  disparos_content TEXT,
  disparos_interval_hours INTEGER,
  disparos_mode TEXT,
  -- Payment
  payment_reminder_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Campaigns
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  destination_id UUID REFERENCES public.destinations(id),
  media_pack_id UUID REFERENCES public.admin_media(id),
  caption TEXT,
  status TEXT DEFAULT 'draft',
  send_mode TEXT,
  pack_size INTEGER,
  delay_seconds INTEGER,
  scheduled_start TIMESTAMPTZ,
  scheduled_end TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  total_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0,
  avg_send_time_ms INTEGER,
  error_message TEXT,
  errors_log JSONB,
  runner_lock_token TEXT,
  runner_lock_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for plans (public read)
CREATE POLICY "Anyone can view plans" ON public.plans FOR SELECT USING (true);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for telegram_integrations
CREATE POLICY "Users can manage own telegram integrations" ON public.telegram_integrations FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for destinations
CREATE POLICY "Users can manage own destinations" ON public.destinations FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for admin_media (public read)
CREATE POLICY "Anyone can view media packs" ON public.admin_media FOR SELECT USING (true);

-- RLS Policies for funnels
CREATE POLICY "Users can manage own funnels" ON public.funnels FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for campaigns
CREATE POLICY "Users can manage own campaigns" ON public.campaigns FOR ALL USING (auth.uid() = user_id);