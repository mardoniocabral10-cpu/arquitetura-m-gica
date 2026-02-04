-- =====================================================
-- MEDIA MASTER DATABASE MIGRATION - PART 5: REMAINING TABLES + FUNCTIONS
-- =====================================================

-- Admin settings
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value BOOLEAN DEFAULT false,
  updated_by UUID,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin settings history
CREATE TABLE public.admin_settings_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL,
  old_value BOOLEAN,
  new_value BOOLEAN NOT NULL,
  changed_by UUID,
  changed_at TIMESTAMPTZ DEFAULT now()
);

-- Admin text settings
CREATE TABLE public.admin_text_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT DEFAULT '',
  description TEXT,
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Account manager logs
CREATE TABLE public.account_manager_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  manager_id UUID NOT NULL,
  target_user_id UUID,
  action TEXT NOT NULL,
  action_type TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Account manager sellers
CREATE TABLE public.account_manager_sellers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  manager_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  notes TEXT,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blocked download domains
CREATE TABLE public.blocked_download_domains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  reason TEXT,
  blocked_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Catalog purchases
CREATE TABLE public.catalog_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  payment_id TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Checkout sessions
CREATE TABLE public.checkout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_type TEXT NOT NULL,
  product_id TEXT,
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Content downloads
CREATE TABLE public.content_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  source_type TEXT NOT NULL,
  source_id TEXT,
  source_url TEXT,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_bytes BIGINT,
  storage_path TEXT,
  storage_provider TEXT,
  metadata JSONB,
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content sync settings
CREATE TABLE public.content_sync_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  default_storage_provider TEXT,
  s3_config JSONB,
  r2_config JSONB,
  wasabi_config JSONB,
  auto_organize_by_type BOOLEAN DEFAULT true,
  auto_organize_by_date BOOLEAN DEFAULT false,
  auto_organize_by_group BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content sync limits
CREATE TABLE public.content_sync_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name TEXT NOT NULL UNIQUE,
  daily_downloads INTEGER DEFAULT 10,
  max_file_size_mb INTEGER DEFAULT 100,
  monthly_storage_mb INTEGER DEFAULT 1000,
  telegram_sync_enabled BOOLEAN DEFAULT false,
  url_download_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content sync logs
CREATE TABLE public.content_sync_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pixel warming configs
CREATE TABLE public.pixel_warming_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  pixel_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  access_token TEXT,
  is_active BOOLEAN DEFAULT true,
  events_sent INTEGER DEFAULT 0,
  last_warmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pixel warming logs
CREATE TABLE public.pixel_warming_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_id UUID NOT NULL REFERENCES public.pixel_warming_configs(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  status TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Scheduled posts
CREATE TABLE public.scheduled_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  media_urls JSONB,
  platforms TEXT[] NOT NULL,
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Post platform logs
CREATE TABLE public.post_platform_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.scheduled_posts(id),
  platform TEXT NOT NULL,
  platform_post_id TEXT,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  posted_at TIMESTAMPTZ,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social accounts
CREATE TABLE public.social_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  platform TEXT NOT NULL,
  platform_user_id TEXT,
  account_username TEXT,
  account_name TEXT,
  account_avatar_url TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  is_connected BOOLEAN DEFAULT true,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Telegram groups for sale
CREATE TABLE public.telegram_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_name TEXT NOT NULL,
  group_username TEXT,
  group_type TEXT,
  description TEXT,
  image_url TEXT,
  members_count INTEGER,
  niche TEXT,
  is_verified BOOLEAN DEFAULT false,
  price_cents INTEGER NOT NULL,
  is_sold BOOLEAN DEFAULT false,
  sold_at TIMESTAMPTZ,
  sold_to_user_id UUID,
  created_by UUID,
  deliverable_invite_link TEXT,
  deliverable_info TEXT,
  deliverable_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TikTok accounts for sale
CREATE TABLE public.tiktok_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  followers INTEGER,
  likes INTEGER,
  niche TEXT,
  is_verified BOOLEAN DEFAULT false,
  price_cents INTEGER NOT NULL,
  is_sold BOOLEAN DEFAULT false,
  sold_at TIMESTAMPTZ,
  sold_to_user_id UUID,
  created_by UUID,
  deliverable_login TEXT,
  deliverable_password TEXT,
  deliverable_email TEXT,
  deliverable_info TEXT,
  deliverable_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Models for sale
CREATE TABLE public.models_for_sale (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  category TEXT,
  niche TEXT,
  assets JSONB,
  scripts JSONB,
  funnel_json JSONB,
  price_cents INTEGER NOT NULL,
  is_sold BOOLEAN DEFAULT false,
  sold_at TIMESTAMPTZ,
  sold_to_user_id UUID,
  created_by UUID,
  deliverable_link TEXT,
  deliverable_info TEXT,
  deliverable_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Telegram MTProto accounts
CREATE TABLE public.telegram_mtproto_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phone_number TEXT NOT NULL,
  session_data TEXT,
  is_connected BOOLEAN DEFAULT false,
  last_connected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Telegram sync sources
CREATE TABLE public.telegram_sync_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  account_id UUID NOT NULL REFERENCES public.telegram_mtproto_accounts(id),
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_name TEXT NOT NULL,
  media_types TEXT[] DEFAULT ARRAY['photo', 'video'],
  keywords TEXT[],
  sync_mode TEXT DEFAULT 'manual',
  date_from TIMESTAMPTZ,
  date_to TIMESTAMPTZ,
  max_file_size_mb INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- UTM pixels
CREATE TABLE public.utm_pixels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  pixel_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- UTM events
CREATE TABLE public.utm_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pixel_id TEXT NOT NULL,
  event_type TEXT DEFAULT 'PageView',
  event_value NUMERIC,
  event_data JSONB,
  session_id TEXT,
  page_url TEXT,
  referrer TEXT,
  ip_address TEXT,
  user_agent TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  country TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User activity
CREATE TABLE public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User events
CREATE TABLE public.user_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User metrics
CREATE TABLE public.user_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  media_sent INTEGER DEFAULT 0,
  total_actions INTEGER DEFAULT 0,
  telegram_integrations_active INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Vendor sales
CREATE TABLE public.vendor_sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL,
  buyer_id UUID NOT NULL,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  sale_amount_cents INTEGER NOT NULL,
  platform_fee_cents INTEGER NOT NULL,
  vendor_commission_cents INTEGER NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Referral role commissions
CREATE TABLE public.referral_role_commissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_name TEXT NOT NULL UNIQUE,
  commission_percent NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Referral allowed roles
CREATE TABLE public.referral_allowed_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Referral audit logs
CREATE TABLE public.referral_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User referral commissions
CREATE TABLE public.user_referral_commissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  commission_percent NUMERIC DEFAULT 10,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all remaining tables
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_text_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_manager_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_manager_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_download_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sync_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sync_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pixel_warming_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pixel_warming_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_platform_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiktok_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models_for_sale ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_mtproto_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_sync_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utm_pixels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utm_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_role_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_allowed_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_referral_commissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for remaining tables
CREATE POLICY "Authenticated can read admin settings" ON public.admin_settings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can read admin text settings" ON public.admin_text_settings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can read blocked domains" ON public.blocked_download_domains FOR SELECT USING (true);
CREATE POLICY "Users can manage own catalog purchases" ON public.catalog_purchases FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own checkout sessions" ON public.checkout_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own content downloads" ON public.content_downloads FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own content sync settings" ON public.content_sync_settings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view content sync limits" ON public.content_sync_limits FOR SELECT USING (true);
CREATE POLICY "Users can view own content sync logs" ON public.content_sync_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own pixel configs" ON public.pixel_warming_configs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own pixel logs" ON public.pixel_warming_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own scheduled posts" ON public.scheduled_posts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Post logs accessible via post owner" ON public.post_platform_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.scheduled_posts WHERE id = post_id AND user_id = auth.uid()));
CREATE POLICY "Users can manage own social accounts" ON public.social_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view available telegram groups" ON public.telegram_groups FOR SELECT USING (is_sold = false);
CREATE POLICY "Anyone can view available tiktok accounts" ON public.tiktok_accounts FOR SELECT USING (is_sold = false);
CREATE POLICY "Anyone can view available models" ON public.models_for_sale FOR SELECT USING (is_sold = false);
CREATE POLICY "Users can manage own mtproto accounts" ON public.telegram_mtproto_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own sync sources" ON public.telegram_sync_sources FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own utm pixels" ON public.utm_pixels FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public insert on utm events" ON public.utm_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own activity" ON public.user_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own events" ON public.user_events FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own metrics" ON public.user_metrics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Vendors can view own sales" ON public.vendor_sales FOR SELECT USING (auth.uid() = vendor_id);
CREATE POLICY "Anyone can view role commissions" ON public.referral_role_commissions FOR SELECT USING (true);
CREATE POLICY "Anyone can view allowed roles" ON public.referral_allowed_roles FOR SELECT USING (true);
CREATE POLICY "Users can view own referral commission" ON public.user_referral_commissions FOR SELECT USING (auth.uid() = user_id);

-- Helper function: has_role
CREATE OR REPLACE FUNCTION public.has_role(_role public.app_role, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

-- Helper function: can_access_referrals
CREATE OR REPLACE FUNCTION public.can_access_referrals(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.referral_allowed_roles rar ON ur.role::text = rar.role_name
    WHERE ur.user_id = p_user_id
  )
$$;

-- Helper function: generate_referral_code
CREATE OR REPLACE FUNCTION public.generate_referral_code(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_code TEXT;
BEGIN
  new_code := upper(substr(md5(p_user_id::text || now()::text), 1, 8));
  RETURN new_code;
END;
$$;

-- Trigger function: update_updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to tables that need it
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_funnels_updated_at BEFORE UPDATE ON public.funnels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_telegram_integrations_updated_at BEFORE UPDATE ON public.telegram_integrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();