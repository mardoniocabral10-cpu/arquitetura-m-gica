-- =====================================================
-- SECURITY FIXES - Missing RLS Policies + Function search_path
-- =====================================================

-- Fix missing RLS policies for admin settings history (admin-only)
CREATE POLICY "Only admins can read settings history" ON public.admin_settings_history 
FOR SELECT USING (public.is_admin());

-- Fix missing RLS policies for account_manager_logs (managers only)
CREATE POLICY "Managers can view own logs" ON public.account_manager_logs 
FOR SELECT USING (auth.uid() = manager_id);

-- Fix missing RLS policies for account_manager_sellers (managers only)
CREATE POLICY "Managers can manage own sellers" ON public.account_manager_sellers 
FOR ALL USING (auth.uid() = manager_id);

-- Fix missing RLS policies for referral_audit_logs (admin-only)
CREATE POLICY "Only admins can read audit logs" ON public.referral_audit_logs 
FOR SELECT USING (public.is_admin());

-- Fix the update_updated_at_column function to have search_path set
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;