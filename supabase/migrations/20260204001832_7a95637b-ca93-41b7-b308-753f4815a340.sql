-- =====================================================
-- MEDIA MASTER DATABASE MIGRATION - PART 2: MORE TABLES
-- =====================================================

-- Funnel nodes
CREATE TABLE public.funnel_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID NOT NULL REFERENCES public.funnels(id) ON DELETE CASCADE,
  node_type TEXT DEFAULT 'message',
  content JSONB,
  position_x NUMERIC DEFAULT 0,
  position_y NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel edges
CREATE TABLE public.funnel_edges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID NOT NULL REFERENCES public.funnels(id) ON DELETE CASCADE,
  source_node_id UUID NOT NULL REFERENCES public.funnel_nodes(id) ON DELETE CASCADE,
  target_node_id UUID NOT NULL REFERENCES public.funnel_nodes(id) ON DELETE CASCADE,
  source_handle TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel products
CREATE TABLE public.funnel_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID NOT NULL REFERENCES public.funnels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'BRL',
  product_type TEXT DEFAULT 'digital',
  payment_method TEXT DEFAULT 'pix',
  provider TEXT DEFAULT 'mercadopago',
  provider_product_id TEXT,
  delivery_type TEXT DEFAULT 'message',
  delivery_content TEXT,
  delivery_message TEXT,
  group_invite_link TEXT,
  group_chat_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel payments
CREATE TABLE public.funnel_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID NOT NULL REFERENCES public.funnels(id),
  product_id UUID REFERENCES public.funnel_products(id),
  user_id UUID NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT DEFAULT 'pending',
  provider TEXT DEFAULT 'mercadopago',
  provider_payment_id TEXT,
  pix_code TEXT,
  pix_qrcode TEXT,
  pix_expiration TIMESTAMPTZ,
  lead_name TEXT,
  lead_chat_id TEXT,
  paid_at TIMESTAMPTZ,
  reminded_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  delivery_status TEXT,
  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Telegram sessions
CREATE TABLE public.telegram_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID NOT NULL REFERENCES public.funnels(id),
  chat_id TEXT NOT NULL,
  telegram_user_id TEXT,
  current_node_id TEXT,
  variables JSONB,
  history JSONB,
  is_finished BOOLEAN DEFAULT false,
  last_message_at TIMESTAMPTZ,
  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Telegram logs
CREATE TABLE public.telegram_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id UUID REFERENCES public.funnels(id),
  session_id UUID REFERENCES public.telegram_sessions(id),
  node_id TEXT,
  event_type TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel templates
CREATE TABLE public.funnel_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  nodes JSONB DEFAULT '[]',
  edges JSONB DEFAULT '[]',
  variables JSONB,
  schema_version INTEGER DEFAULT 1,
  template_version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  is_free BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Deliveries
CREATE TABLE public.deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  transaction_id UUID REFERENCES public.transactions(id),
  product_id TEXT NOT NULL,
  product_type TEXT NOT NULL,
  delivery_data JSONB,
  delivered_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Integrations (MercadoPago, etc.)
CREATE TABLE public.integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  provider TEXT DEFAULT 'mercadopago',
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  api_token TEXT,
  token_expires_at TIMESTAMPTZ,
  provider_user_id TEXT,
  provider_name TEXT,
  provider_email TEXT,
  environment TEXT DEFAULT 'production',
  status TEXT DEFAULT 'active',
  tracking_enabled BOOLEAN DEFAULT false,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  image_url TEXT,
  link_url TEXT,
  link_text TEXT,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User notification reads
CREATE TABLE public.user_notification_reads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  notification_id UUID NOT NULL REFERENCES public.notifications(id),
  read_at TIMESTAMPTZ DEFAULT now()
);

-- Dashboard banners
CREATE TABLE public.dashboard_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.funnel_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notification_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_banners ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage funnel nodes via funnel" ON public.funnel_nodes FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.funnels WHERE id = funnel_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage funnel edges via funnel" ON public.funnel_edges FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.funnels WHERE id = funnel_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage funnel products" ON public.funnel_products FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage funnel payments" ON public.funnel_payments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Funnel sessions are accessible via funnel owner" ON public.telegram_sessions FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.funnels WHERE id = funnel_id AND user_id = auth.uid()));

CREATE POLICY "Funnel logs are accessible via funnel owner" ON public.telegram_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.funnels WHERE id = funnel_id AND user_id = auth.uid()));

CREATE POLICY "Anyone can view active templates" ON public.funnel_templates FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view own deliveries" ON public.deliveries FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own integrations" ON public.integrations FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active notifications" ON public.notifications FOR SELECT USING (is_active = true);

CREATE POLICY "Users can manage own notification reads" ON public.user_notification_reads FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active banners" ON public.dashboard_banners FOR SELECT USING (is_active = true);