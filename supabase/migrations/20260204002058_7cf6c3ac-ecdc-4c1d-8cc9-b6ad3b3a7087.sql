-- =====================================================
-- MEDIA MASTER DATABASE MIGRATION - PART 4: MULTILOGIN, WHATSAPP, REFERRALS
-- =====================================================

-- Multilogin proxies
CREATE TABLE public.multilogin_proxies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  protocol TEXT NOT NULL,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT,
  password TEXT,
  country TEXT,
  is_active BOOLEAN DEFAULT true,
  detected_ip TEXT,
  last_tested_at TIMESTAMPTZ,
  last_test_success BOOLEAN,
  test_error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin engagement accounts
CREATE TABLE public.admin_engagement_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT,
  password_encrypted TEXT,
  instagram_id TEXT,
  context_id TEXT,
  proxy_id UUID REFERENCES public.multilogin_proxies(id),
  status TEXT DEFAULT 'active',
  login_status TEXT,
  session_data JSONB,
  is_available BOOLEAN DEFAULT true,
  daily_comment_count INTEGER DEFAULT 0,
  total_comment_count INTEGER DEFAULT 0,
  consecutive_errors INTEGER DEFAULT 0,
  error_message TEXT,
  cooldown_until TIMESTAMPTZ,
  cooldown_reason TEXT,
  last_used_at TIMESTAMPTZ,
  last_used_by UUID REFERENCES public.profiles(user_id),
  last_login_at TIMESTAMPTZ,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Engagement account usage
CREATE TABLE public.engagement_account_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id),
  account_id UUID NOT NULL REFERENCES public.admin_engagement_accounts(id),
  config_id UUID REFERENCES public.instagram_engagement_configs(id),
  target_url TEXT,
  comment_text TEXT,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Multilogin Facebook accounts
CREATE TABLE public.multilogin_facebook_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  facebook_user_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  display_name TEXT,
  email TEXT,
  avatar_url TEXT,
  business_manager_id TEXT,
  business_manager_name TEXT,
  permissions TEXT[],
  context_id TEXT,
  proxy_id UUID REFERENCES public.multilogin_proxies(id),
  status TEXT DEFAULT 'active',
  error_message TEXT,
  token_expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Multilogin Google accounts
CREATE TABLE public.multilogin_google_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  display_name TEXT,
  avatar_url TEXT,
  scopes TEXT[],
  context_id TEXT,
  proxy_id UUID REFERENCES public.multilogin_proxies(id),
  status TEXT DEFAULT 'active',
  error_message TEXT,
  token_expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Multilogin Instagram accounts
CREATE TABLE public.multilogin_instagram_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  instagram_id TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  access_token TEXT,
  facebook_account_id UUID REFERENCES public.multilogin_facebook_accounts(id),
  page_id TEXT,
  page_name TEXT,
  context_id TEXT,
  proxy_id UUID REFERENCES public.multilogin_proxies(id),
  status TEXT DEFAULT 'active',
  error_message TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Multilogin workers
CREATE TABLE public.multilogin_workers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  account_type TEXT NOT NULL,
  task_type TEXT NOT NULL,
  config JSONB,
  proxy_id UUID REFERENCES public.multilogin_proxies(id),
  schedule_cron TEXT,
  status TEXT DEFAULT 'idle',
  is_active BOOLEAN DEFAULT true,
  run_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Multilogin logs
CREATE TABLE public.multilogin_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  worker_id UUID REFERENCES public.multilogin_workers(id),
  proxy_id UUID REFERENCES public.multilogin_proxies(id),
  account_id TEXT,
  account_type TEXT,
  action TEXT NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT,
  message TEXT,
  details JSONB,
  ip_used TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp accounts
CREATE TABLE public.wpp_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phone_number_id TEXT NOT NULL,
  waba_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  webhook_verify_token TEXT DEFAULT gen_random_uuid()::text,
  phone_display TEXT,
  business_name TEXT,
  status TEXT DEFAULT 'pending',
  is_connected BOOLEAN DEFAULT false,
  last_validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp contacts
CREATE TABLE public.wpp_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wa_id TEXT NOT NULL,
  phone TEXT NOT NULL,
  name TEXT,
  profile_name TEXT,
  opt_in_status TEXT,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp conversations
CREATE TABLE public.wpp_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wpp_account_id UUID REFERENCES public.wpp_accounts(id),
  wa_id TEXT NOT NULL,
  conversation_id TEXT,
  pricing_category TEXT,
  window_open_until TIMESTAMPTZ,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp messages
CREATE TABLE public.wpp_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wpp_account_id UUID REFERENCES public.wpp_accounts(id),
  wa_id TEXT NOT NULL,
  message_id TEXT,
  direction TEXT DEFAULT 'outbound',
  message_type TEXT,
  payload JSONB,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp sessions
CREATE TABLE public.wpp_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wpp_account_id UUID REFERENCES public.wpp_accounts(id),
  funnel_id UUID REFERENCES public.funnels(id),
  chat_id TEXT NOT NULL,
  wa_id TEXT NOT NULL,
  current_node_id TEXT,
  variables JSONB,
  history JSONB,
  is_finished BOOLEAN DEFAULT false,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp templates
CREATE TABLE public.wpp_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wpp_account_id UUID REFERENCES public.wpp_accounts(id),
  template_id TEXT,
  template_name TEXT NOT NULL,
  category TEXT,
  language TEXT,
  components JSONB,
  variables JSONB,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp logs
CREATE TABLE public.wpp_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wpp_account_id UUID,
  funnel_id UUID,
  session_id TEXT,
  node_id TEXT,
  event_type TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Referrals
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL,
  referred_id UUID NOT NULL,
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Commissions
CREATE TABLE public.commissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_id UUID NOT NULL REFERENCES public.referrals(id),
  referrer_id UUID NOT NULL,
  referred_id UUID NOT NULL,
  transaction_id UUID REFERENCES public.transactions(id),
  amount_cents INTEGER NOT NULL,
  commission_percent NUMERIC NOT NULL,
  commission_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  paid_at TIMESTAMPTZ,
  paid_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Referral settings
CREATE TABLE public.referral_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  is_enabled BOOLEAN DEFAULT true,
  default_commission_percent NUMERIC DEFAULT 10,
  commission_type TEXT DEFAULT 'percentage',
  min_payout_cents INTEGER DEFAULT 5000,
  cookie_duration_days INTEGER DEFAULT 30,
  referral_base_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.multilogin_proxies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_engagement_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_account_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multilogin_facebook_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multilogin_google_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multilogin_instagram_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multilogin_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multilogin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wpp_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own proxies" ON public.multilogin_proxies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin accounts readable by authenticated" ON public.admin_engagement_accounts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can view own usage" ON public.engagement_account_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert usage" ON public.engagement_account_usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage own facebook accounts" ON public.multilogin_facebook_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own google accounts" ON public.multilogin_google_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own instagram accounts" ON public.multilogin_instagram_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own workers" ON public.multilogin_workers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own multilogin logs" ON public.multilogin_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wpp accounts" ON public.wpp_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wpp contacts" ON public.wpp_contacts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wpp conversations" ON public.wpp_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wpp messages" ON public.wpp_messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wpp sessions" ON public.wpp_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wpp templates" ON public.wpp_templates FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own wpp logs" ON public.wpp_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view referrals they are part of" ON public.referrals FOR SELECT 
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);
CREATE POLICY "Users can view their commissions" ON public.commissions FOR SELECT 
  USING (auth.uid() = referrer_id);
CREATE POLICY "Anyone can read referral settings" ON public.referral_settings FOR SELECT USING (true);