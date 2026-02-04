-- =====================================================
-- MEDIA MASTER DATABASE MIGRATION - PART 3: CLOAKER, SMART LINKS, INSTAGRAM
-- =====================================================

-- Cloaker links
CREATE TABLE public.cloaker_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  offer_url TEXT NOT NULL,
  safe_url TEXT NOT NULL,
  allowed_countries TEXT[],
  block_bots BOOLEAN DEFAULT true,
  block_vpn BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Cloaker clicks
CREATE TABLE public.cloaker_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID NOT NULL REFERENCES public.cloaker_links(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  is_bot BOOLEAN DEFAULT false,
  is_vpn BOOLEAN DEFAULT false,
  was_blocked BOOLEAN DEFAULT false,
  redirect_target TEXT,
  clicked_at TIMESTAMPTZ DEFAULT now()
);

-- Cloaker media
CREATE TABLE public.cloaker_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  media_type TEXT DEFAULT 'image',
  offer_url TEXT,
  offer_file_path TEXT,
  safe_url TEXT,
  safe_file_path TEXT,
  destination_url TEXT,
  allowed_countries TEXT[],
  block_bots BOOLEAN DEFAULT true,
  block_vpn BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  total_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Cloaker media views
CREATE TABLE public.cloaker_media_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  media_id UUID NOT NULL REFERENCES public.cloaker_media(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  is_bot BOOLEAN DEFAULT false,
  is_vpn BOOLEAN DEFAULT false,
  was_blocked BOOLEAN DEFAULT false,
  served_type TEXT,
  viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Smart link pages
CREATE TABLE public.smart_link_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  page_type TEXT DEFAULT 'bio',
  template TEXT,
  background_color TEXT,
  text_color TEXT,
  button_style TEXT,
  redirect_url TEXT,
  meta_pixel_id TEXT,
  google_analytics_id TEXT,
  tiktok_pixel_id TEXT,
  is_active BOOLEAN DEFAULT true,
  total_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Smart link buttons
CREATE TABLE public.smart_link_buttons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.smart_link_pages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  funnel_id UUID REFERENCES public.funnels(id),
  funnel_tag TEXT,
  event_name TEXT,
  position INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Smart link views
CREATE TABLE public.smart_link_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.smart_link_pages(id) ON DELETE CASCADE,
  referrer TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Smart link clicks
CREATE TABLE public.smart_link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.smart_link_pages(id),
  button_id UUID NOT NULL REFERENCES public.smart_link_buttons(id),
  ip_address TEXT,
  country TEXT,
  referrer TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  clicked_at TIMESTAMPTZ DEFAULT now()
);

-- Instagram accounts for sale
CREATE TABLE public.instagram_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  followers INTEGER,
  following INTEGER,
  posts_count INTEGER,
  engagement_rate NUMERIC,
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

-- Instagram engagement configs
CREATE TABLE public.instagram_engagement_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  instagram_account_id TEXT NOT NULL,
  comments JSONB DEFAULT '[]',
  auto_variations BOOLEAN DEFAULT false,
  use_emojis BOOLEAN DEFAULT true,
  randomize_order BOOLEAN DEFAULT true,
  daily_limit INTEGER DEFAULT 50,
  daily_count INTEGER DEFAULT 0,
  min_delay_seconds INTEGER DEFAULT 60,
  max_delay_seconds INTEGER DEFAULT 300,
  start_hour INTEGER DEFAULT 8,
  end_hour INTEGER DEFAULT 22,
  status TEXT DEFAULT 'active',
  is_active BOOLEAN DEFAULT true,
  last_comment_at TIMESTAMPTZ,
  consecutive_errors INTEGER DEFAULT 0,
  cooldown_until TIMESTAMPTZ,
  cooldown_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Instagram engagement targets
CREATE TABLE public.instagram_engagement_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID NOT NULL REFERENCES public.instagram_engagement_configs(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL,
  target_value TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Instagram engagement logs
CREATE TABLE public.instagram_engagement_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_id UUID NOT NULL REFERENCES public.instagram_engagement_configs(id),
  instagram_account_id TEXT NOT NULL,
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  post_url TEXT,
  comment_text TEXT,
  target_type TEXT,
  target_value TEXT,
  error_message TEXT,
  execution_time_ms INTEGER,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Instagram engagement limits per plan
CREATE TABLE public.instagram_engagement_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_type TEXT NOT NULL UNIQUE,
  max_accounts INTEGER DEFAULT 1,
  max_daily_comments INTEGER DEFAULT 50,
  min_delay_seconds INTEGER DEFAULT 60,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Instagram engagement blocked
CREATE TABLE public.instagram_engagement_blocked (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  instagram_account_id TEXT,
  blocked_by UUID NOT NULL,
  reason TEXT NOT NULL,
  blocked_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cloaker_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloaker_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloaker_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloaker_media_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_link_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_link_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_link_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_engagement_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_engagement_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_engagement_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_engagement_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_engagement_blocked ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own cloaker links" ON public.cloaker_links FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Link clicks accessible to link owner" ON public.cloaker_clicks FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.cloaker_links WHERE id = link_id AND user_id = auth.uid()));
CREATE POLICY "Users can manage own cloaker media" ON public.cloaker_media FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Media views accessible to owner" ON public.cloaker_media_views FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.cloaker_media WHERE id = media_id AND user_id = auth.uid()));
CREATE POLICY "Users can manage own smart link pages" ON public.smart_link_pages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own smart link buttons" ON public.smart_link_buttons FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Page views accessible to owner" ON public.smart_link_views FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.smart_link_pages WHERE id = page_id AND user_id = auth.uid()));
CREATE POLICY "Button clicks accessible to owner" ON public.smart_link_clicks FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.smart_link_pages WHERE id = page_id AND user_id = auth.uid()));
CREATE POLICY "Anyone can view available instagram accounts" ON public.instagram_accounts FOR SELECT USING (is_sold = false);
CREATE POLICY "Users can manage own engagement configs" ON public.instagram_engagement_configs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Targets accessible via config owner" ON public.instagram_engagement_targets FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.instagram_engagement_configs WHERE id = config_id AND user_id = auth.uid()));
CREATE POLICY "Users can view own engagement logs" ON public.instagram_engagement_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view engagement limits" ON public.instagram_engagement_limits FOR SELECT USING (true);
CREATE POLICY "Blocked entries visible to related user" ON public.instagram_engagement_blocked FOR SELECT USING (auth.uid() = user_id);