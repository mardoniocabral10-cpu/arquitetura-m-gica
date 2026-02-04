export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      account_manager_logs: {
        Row: {
          action: string
          action_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          manager_id: string
          target_user_id: string | null
        }
        Insert: {
          action: string
          action_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          manager_id: string
          target_user_id?: string | null
        }
        Update: {
          action?: string
          action_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          manager_id?: string
          target_user_id?: string | null
        }
        Relationships: []
      }
      account_manager_sellers: {
        Row: {
          assigned_at: string | null
          created_at: string | null
          id: string
          manager_id: string
          notes: string | null
          seller_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          created_at?: string | null
          id?: string
          manager_id: string
          notes?: string | null
          seller_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          created_at?: string | null
          id?: string
          manager_id?: string
          notes?: string | null
          seller_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_engagement_accounts: {
        Row: {
          consecutive_errors: number | null
          context_id: string | null
          cooldown_reason: string | null
          cooldown_until: string | null
          created_at: string | null
          created_by: string | null
          daily_comment_count: number | null
          error_message: string | null
          id: string
          instagram_id: string | null
          is_available: boolean | null
          last_login_at: string | null
          last_used_at: string | null
          last_used_by: string | null
          login_status: string | null
          notes: string | null
          password: string | null
          password_encrypted: string | null
          proxy_id: string | null
          session_data: Json | null
          status: string | null
          total_comment_count: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          consecutive_errors?: number | null
          context_id?: string | null
          cooldown_reason?: string | null
          cooldown_until?: string | null
          created_at?: string | null
          created_by?: string | null
          daily_comment_count?: number | null
          error_message?: string | null
          id?: string
          instagram_id?: string | null
          is_available?: boolean | null
          last_login_at?: string | null
          last_used_at?: string | null
          last_used_by?: string | null
          login_status?: string | null
          notes?: string | null
          password?: string | null
          password_encrypted?: string | null
          proxy_id?: string | null
          session_data?: Json | null
          status?: string | null
          total_comment_count?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          consecutive_errors?: number | null
          context_id?: string | null
          cooldown_reason?: string | null
          cooldown_until?: string | null
          created_at?: string | null
          created_by?: string | null
          daily_comment_count?: number | null
          error_message?: string | null
          id?: string
          instagram_id?: string | null
          is_available?: boolean | null
          last_login_at?: string | null
          last_used_at?: string | null
          last_used_by?: string | null
          login_status?: string | null
          notes?: string | null
          password?: string | null
          password_encrypted?: string | null
          proxy_id?: string | null
          session_data?: Json | null
          status?: string | null
          total_comment_count?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_engagement_accounts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_engagement_accounts_last_used_by_fkey"
            columns: ["last_used_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_engagement_accounts_proxy_id_fkey"
            columns: ["proxy_id"]
            isOneToOne: false
            referencedRelation: "multilogin_proxies"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_media: {
        Row: {
          created_at: string | null
          description: string | null
          file_count: number | null
          id: string
          image_url: string | null
          media_files: Json | null
          min_plan: string | null
          name: string
          pack_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_count?: number | null
          id?: string
          image_url?: string | null
          media_files?: Json | null
          min_plan?: string | null
          name: string
          pack_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_count?: number | null
          id?: string
          image_url?: string | null
          media_files?: Json | null
          min_plan?: string | null
          name?: string
          pack_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      admin_settings_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          new_value: boolean
          old_value: boolean | null
          setting_key: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_value: boolean
          old_value?: boolean | null
          setting_key: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_value?: boolean
          old_value?: boolean | null
          setting_key?: string
        }
        Relationships: []
      }
      admin_text_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      blocked_download_domains: {
        Row: {
          blocked_by: string | null
          created_at: string | null
          domain: string
          id: string
          reason: string | null
        }
        Insert: {
          blocked_by?: string | null
          created_at?: string | null
          domain: string
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_by?: string | null
          created_at?: string | null
          domain?: string
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          avg_send_time_ms: number | null
          caption: string | null
          completed_at: string | null
          created_at: string | null
          delay_seconds: number | null
          destination_id: string | null
          error_count: number | null
          error_message: string | null
          errors_log: Json | null
          id: string
          media_pack_id: string | null
          name: string
          pack_size: number | null
          progress: number | null
          runner_lock_expires_at: string | null
          runner_lock_token: string | null
          scheduled_end: string | null
          scheduled_start: string | null
          send_mode: string | null
          sent_count: number | null
          started_at: string | null
          status: string | null
          success_count: number | null
          total_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avg_send_time_ms?: number | null
          caption?: string | null
          completed_at?: string | null
          created_at?: string | null
          delay_seconds?: number | null
          destination_id?: string | null
          error_count?: number | null
          error_message?: string | null
          errors_log?: Json | null
          id?: string
          media_pack_id?: string | null
          name: string
          pack_size?: number | null
          progress?: number | null
          runner_lock_expires_at?: string | null
          runner_lock_token?: string | null
          scheduled_end?: string | null
          scheduled_start?: string | null
          send_mode?: string | null
          sent_count?: number | null
          started_at?: string | null
          status?: string | null
          success_count?: number | null
          total_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avg_send_time_ms?: number | null
          caption?: string | null
          completed_at?: string | null
          created_at?: string | null
          delay_seconds?: number | null
          destination_id?: string | null
          error_count?: number | null
          error_message?: string | null
          errors_log?: Json | null
          id?: string
          media_pack_id?: string | null
          name?: string
          pack_size?: number | null
          progress?: number | null
          runner_lock_expires_at?: string | null
          runner_lock_token?: string | null
          scheduled_end?: string | null
          scheduled_start?: string | null
          send_mode?: string | null
          sent_count?: number | null
          started_at?: string | null
          status?: string | null
          success_count?: number | null
          total_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_media_pack_id_fkey"
            columns: ["media_pack_id"]
            isOneToOne: false
            referencedRelation: "admin_media"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_purchases: {
        Row: {
          amount_cents: number
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          payment_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          payment_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          payment_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      checkout_sessions: {
        Row: {
          amount_cents: number
          created_at: string | null
          expires_at: string | null
          id: string
          product_id: string | null
          product_type: string
          status: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          product_id?: string | null
          product_type: string
          status?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          product_id?: string | null
          product_type?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cloaker_clicks: {
        Row: {
          browser: string | null
          city: string | null
          clicked_at: string | null
          country: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          is_bot: boolean | null
          is_vpn: boolean | null
          link_id: string
          os: string | null
          redirect_target: string | null
          referrer: string | null
          user_agent: string | null
          was_blocked: boolean | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          clicked_at?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_bot?: boolean | null
          is_vpn?: boolean | null
          link_id: string
          os?: string | null
          redirect_target?: string | null
          referrer?: string | null
          user_agent?: string | null
          was_blocked?: boolean | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          clicked_at?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_bot?: boolean | null
          is_vpn?: boolean | null
          link_id?: string
          os?: string | null
          redirect_target?: string | null
          referrer?: string | null
          user_agent?: string | null
          was_blocked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "cloaker_clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "cloaker_links"
            referencedColumns: ["id"]
          },
        ]
      }
      cloaker_links: {
        Row: {
          allowed_countries: string[] | null
          block_bots: boolean | null
          block_vpn: boolean | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          offer_url: string
          safe_url: string
          slug: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allowed_countries?: string[] | null
          block_bots?: boolean | null
          block_vpn?: boolean | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          offer_url: string
          safe_url: string
          slug: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allowed_countries?: string[] | null
          block_bots?: boolean | null
          block_vpn?: boolean | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          offer_url?: string
          safe_url?: string
          slug?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cloaker_media: {
        Row: {
          allowed_countries: string[] | null
          block_bots: boolean | null
          block_vpn: boolean | null
          created_at: string | null
          destination_url: string | null
          id: string
          is_active: boolean | null
          media_type: string | null
          name: string
          offer_file_path: string | null
          offer_url: string | null
          safe_file_path: string | null
          safe_url: string | null
          slug: string
          total_views: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allowed_countries?: string[] | null
          block_bots?: boolean | null
          block_vpn?: boolean | null
          created_at?: string | null
          destination_url?: string | null
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          name: string
          offer_file_path?: string | null
          offer_url?: string | null
          safe_file_path?: string | null
          safe_url?: string | null
          slug: string
          total_views?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allowed_countries?: string[] | null
          block_bots?: boolean | null
          block_vpn?: boolean | null
          created_at?: string | null
          destination_url?: string | null
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          name?: string
          offer_file_path?: string | null
          offer_url?: string | null
          safe_file_path?: string | null
          safe_url?: string | null
          slug?: string
          total_views?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cloaker_media_views: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          is_bot: boolean | null
          is_vpn: boolean | null
          media_id: string
          os: string | null
          referrer: string | null
          served_type: string | null
          user_agent: string | null
          viewed_at: string | null
          was_blocked: boolean | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_bot?: boolean | null
          is_vpn?: boolean | null
          media_id: string
          os?: string | null
          referrer?: string | null
          served_type?: string | null
          user_agent?: string | null
          viewed_at?: string | null
          was_blocked?: boolean | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_bot?: boolean | null
          is_vpn?: boolean | null
          media_id?: string
          os?: string | null
          referrer?: string | null
          served_type?: string | null
          user_agent?: string | null
          viewed_at?: string | null
          was_blocked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "cloaker_media_views_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "cloaker_media"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          amount_cents: number
          commission_cents: number
          commission_percent: number
          created_at: string | null
          id: string
          notes: string | null
          paid_at: string | null
          paid_by: string | null
          referral_id: string
          referred_id: string
          referrer_id: string
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_cents: number
          commission_cents: number
          commission_percent: number
          created_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          paid_by?: string | null
          referral_id: string
          referred_id: string
          referrer_id: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_cents?: number
          commission_cents?: number
          commission_percent?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          paid_by?: string | null
          referral_id?: string
          referred_id?: string
          referrer_id?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      content_downloads: {
        Row: {
          created_at: string | null
          error_message: string | null
          file_name: string
          file_size_bytes: number | null
          file_type: string
          id: string
          metadata: Json | null
          progress: number | null
          source_id: string | null
          source_type: string
          source_url: string | null
          status: string | null
          storage_path: string | null
          storage_provider: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          file_name: string
          file_size_bytes?: number | null
          file_type: string
          id?: string
          metadata?: Json | null
          progress?: number | null
          source_id?: string | null
          source_type: string
          source_url?: string | null
          status?: string | null
          storage_path?: string | null
          storage_provider?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string
          id?: string
          metadata?: Json | null
          progress?: number | null
          source_id?: string | null
          source_type?: string
          source_url?: string | null
          status?: string | null
          storage_path?: string | null
          storage_provider?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      content_sync_limits: {
        Row: {
          created_at: string | null
          daily_downloads: number | null
          id: string
          max_file_size_mb: number | null
          monthly_storage_mb: number | null
          plan_name: string
          telegram_sync_enabled: boolean | null
          updated_at: string | null
          url_download_enabled: boolean | null
        }
        Insert: {
          created_at?: string | null
          daily_downloads?: number | null
          id?: string
          max_file_size_mb?: number | null
          monthly_storage_mb?: number | null
          plan_name: string
          telegram_sync_enabled?: boolean | null
          updated_at?: string | null
          url_download_enabled?: boolean | null
        }
        Update: {
          created_at?: string | null
          daily_downloads?: number | null
          id?: string
          max_file_size_mb?: number | null
          monthly_storage_mb?: number | null
          plan_name?: string
          telegram_sync_enabled?: boolean | null
          updated_at?: string | null
          url_download_enabled?: boolean | null
        }
        Relationships: []
      }
      content_sync_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      content_sync_settings: {
        Row: {
          auto_organize_by_date: boolean | null
          auto_organize_by_group: boolean | null
          auto_organize_by_type: boolean | null
          created_at: string | null
          default_storage_provider: string | null
          id: string
          r2_config: Json | null
          s3_config: Json | null
          updated_at: string | null
          user_id: string
          wasabi_config: Json | null
        }
        Insert: {
          auto_organize_by_date?: boolean | null
          auto_organize_by_group?: boolean | null
          auto_organize_by_type?: boolean | null
          created_at?: string | null
          default_storage_provider?: string | null
          id?: string
          r2_config?: Json | null
          s3_config?: Json | null
          updated_at?: string | null
          user_id: string
          wasabi_config?: Json | null
        }
        Update: {
          auto_organize_by_date?: boolean | null
          auto_organize_by_group?: boolean | null
          auto_organize_by_type?: boolean | null
          created_at?: string | null
          default_storage_provider?: string | null
          id?: string
          r2_config?: Json | null
          s3_config?: Json | null
          updated_at?: string | null
          user_id?: string
          wasabi_config?: Json | null
        }
        Relationships: []
      }
      dashboard_banners: {
        Row: {
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          link_text: string | null
          link_url: string | null
          priority: number | null
          starts_at: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          link_text?: string | null
          link_url?: string | null
          priority?: number | null
          starts_at?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          link_text?: string | null
          link_url?: string | null
          priority?: number | null
          starts_at?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          created_at: string | null
          delivered_at: string | null
          delivery_data: Json | null
          id: string
          product_id: string
          product_type: string
          transaction_id: string | null
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_at?: string | null
          delivery_data?: Json | null
          id?: string
          product_id: string
          product_type: string
          transaction_id?: string | null
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_at?: string | null
          delivery_data?: Json | null
          id?: string
          product_id?: string
          product_type?: string
          transaction_id?: string | null
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          chat_id: string
          chat_title: string | null
          chat_type: string | null
          created_at: string | null
          id: string
          last_sent_at: string | null
          members_count: number | null
          name: string
          status: string | null
          telegram_integration_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chat_id: string
          chat_title?: string | null
          chat_type?: string | null
          created_at?: string | null
          id?: string
          last_sent_at?: string | null
          members_count?: number | null
          name: string
          status?: string | null
          telegram_integration_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chat_id?: string
          chat_title?: string | null
          chat_type?: string | null
          created_at?: string | null
          id?: string
          last_sent_at?: string | null
          members_count?: number | null
          name?: string
          status?: string | null
          telegram_integration_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "destinations_telegram_integration_id_fkey"
            columns: ["telegram_integration_id"]
            isOneToOne: false
            referencedRelation: "telegram_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      engagement_account_usage: {
        Row: {
          account_id: string
          comment_text: string | null
          config_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          status: string | null
          target_url: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          comment_text?: string | null
          config_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          status?: string | null
          target_url?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          comment_text?: string | null
          config_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          status?: string | null
          target_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagement_account_usage_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "admin_engagement_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_account_usage_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "instagram_engagement_configs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_account_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      funnel_edges: {
        Row: {
          created_at: string | null
          funnel_id: string
          id: string
          source_handle: string | null
          source_node_id: string
          target_node_id: string
        }
        Insert: {
          created_at?: string | null
          funnel_id: string
          id?: string
          source_handle?: string | null
          source_node_id: string
          target_node_id: string
        }
        Update: {
          created_at?: string | null
          funnel_id?: string
          id?: string
          source_handle?: string | null
          source_node_id?: string
          target_node_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funnel_edges_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "funnel_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "funnel_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_nodes: {
        Row: {
          content: Json | null
          created_at: string | null
          funnel_id: string
          id: string
          node_type: string | null
          position_x: number | null
          position_y: number | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          funnel_id: string
          id?: string
          node_type?: string | null
          position_x?: number | null
          position_y?: number | null
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          funnel_id?: string
          id?: string
          node_type?: string | null
          position_x?: number | null
          position_y?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_nodes_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_payments: {
        Row: {
          amount_cents: number
          created_at: string | null
          currency: string | null
          delivered_at: string | null
          delivery_status: string | null
          fbclid: string | null
          funnel_id: string
          gclid: string | null
          id: string
          lead_chat_id: string | null
          lead_name: string | null
          paid_at: string | null
          pix_code: string | null
          pix_expiration: string | null
          pix_qrcode: string | null
          product_id: string | null
          provider: string | null
          provider_payment_id: string | null
          reminded_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          currency?: string | null
          delivered_at?: string | null
          delivery_status?: string | null
          fbclid?: string | null
          funnel_id: string
          gclid?: string | null
          id?: string
          lead_chat_id?: string | null
          lead_name?: string | null
          paid_at?: string | null
          pix_code?: string | null
          pix_expiration?: string | null
          pix_qrcode?: string | null
          product_id?: string | null
          provider?: string | null
          provider_payment_id?: string | null
          reminded_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          currency?: string | null
          delivered_at?: string | null
          delivery_status?: string | null
          fbclid?: string | null
          funnel_id?: string
          gclid?: string | null
          id?: string
          lead_chat_id?: string | null
          lead_name?: string | null
          paid_at?: string | null
          pix_code?: string | null
          pix_expiration?: string | null
          pix_qrcode?: string | null
          product_id?: string | null
          provider?: string | null
          provider_payment_id?: string | null
          reminded_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_payments_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_payments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "funnel_products"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_products: {
        Row: {
          created_at: string | null
          currency: string | null
          delivery_content: string | null
          delivery_message: string | null
          delivery_type: string | null
          description: string | null
          funnel_id: string
          group_chat_id: string | null
          group_invite_link: string | null
          id: string
          is_active: boolean | null
          name: string
          payment_method: string | null
          price_cents: number
          product_type: string | null
          provider: string | null
          provider_product_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          delivery_content?: string | null
          delivery_message?: string | null
          delivery_type?: string | null
          description?: string | null
          funnel_id: string
          group_chat_id?: string | null
          group_invite_link?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          payment_method?: string | null
          price_cents: number
          product_type?: string | null
          provider?: string | null
          provider_product_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          delivery_content?: string | null
          delivery_message?: string | null
          delivery_type?: string | null
          description?: string | null
          funnel_id?: string
          group_chat_id?: string | null
          group_invite_link?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          payment_method?: string | null
          price_cents?: number
          product_type?: string | null
          provider?: string | null
          provider_product_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funnel_products_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_templates: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          edges: Json | null
          id: string
          is_active: boolean | null
          is_free: boolean | null
          name: string
          nodes: Json | null
          schema_version: number | null
          template_version: number | null
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          edges?: Json | null
          id?: string
          is_active?: boolean | null
          is_free?: boolean | null
          name: string
          nodes?: Json | null
          schema_version?: number | null
          template_version?: number | null
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          edges?: Json | null
          id?: string
          is_active?: boolean | null
          is_free?: boolean | null
          name?: string
          nodes?: Json | null
          schema_version?: number | null
          template_version?: number | null
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      funnels: {
        Row: {
          auto_remarketing_enabled: boolean | null
          auto_remarketing_message: string | null
          channel: string | null
          created_at: string | null
          description: string | null
          disparos_content: string | null
          disparos_enabled: boolean | null
          disparos_interval_hours: number | null
          disparos_mode: string | null
          downsell_content: string | null
          downsell_enabled: boolean | null
          downsell_media_url: string | null
          downsell_mode: string | null
          id: string
          is_active: boolean | null
          name: string
          orderbump_call_text: string | null
          orderbump_delivery_timing: string | null
          orderbump_enabled: boolean | null
          orderbump_media_url: string | null
          orderbump_type: string | null
          payment_reminder_minutes: number | null
          principal_content: string | null
          principal_cta_above_text: string | null
          principal_cta_enabled: boolean | null
          principal_cta_text: string | null
          principal_media_type: string | null
          principal_media_url: string | null
          remarketing_content: string | null
          remarketing_delay_minutes: number | null
          remarketing_enabled: boolean | null
          remarketing_mode: string | null
          schema_version: number | null
          telegram_integration_id: string | null
          trigger_keywords: string[] | null
          updated_at: string | null
          upsell_content: string | null
          upsell_enabled: boolean | null
          upsell_media_url: string | null
          upsell_mode: string | null
          user_id: string
          webhook_registered: boolean | null
          webhook_url: string | null
        }
        Insert: {
          auto_remarketing_enabled?: boolean | null
          auto_remarketing_message?: string | null
          channel?: string | null
          created_at?: string | null
          description?: string | null
          disparos_content?: string | null
          disparos_enabled?: boolean | null
          disparos_interval_hours?: number | null
          disparos_mode?: string | null
          downsell_content?: string | null
          downsell_enabled?: boolean | null
          downsell_media_url?: string | null
          downsell_mode?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          orderbump_call_text?: string | null
          orderbump_delivery_timing?: string | null
          orderbump_enabled?: boolean | null
          orderbump_media_url?: string | null
          orderbump_type?: string | null
          payment_reminder_minutes?: number | null
          principal_content?: string | null
          principal_cta_above_text?: string | null
          principal_cta_enabled?: boolean | null
          principal_cta_text?: string | null
          principal_media_type?: string | null
          principal_media_url?: string | null
          remarketing_content?: string | null
          remarketing_delay_minutes?: number | null
          remarketing_enabled?: boolean | null
          remarketing_mode?: string | null
          schema_version?: number | null
          telegram_integration_id?: string | null
          trigger_keywords?: string[] | null
          updated_at?: string | null
          upsell_content?: string | null
          upsell_enabled?: boolean | null
          upsell_media_url?: string | null
          upsell_mode?: string | null
          user_id: string
          webhook_registered?: boolean | null
          webhook_url?: string | null
        }
        Update: {
          auto_remarketing_enabled?: boolean | null
          auto_remarketing_message?: string | null
          channel?: string | null
          created_at?: string | null
          description?: string | null
          disparos_content?: string | null
          disparos_enabled?: boolean | null
          disparos_interval_hours?: number | null
          disparos_mode?: string | null
          downsell_content?: string | null
          downsell_enabled?: boolean | null
          downsell_media_url?: string | null
          downsell_mode?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          orderbump_call_text?: string | null
          orderbump_delivery_timing?: string | null
          orderbump_enabled?: boolean | null
          orderbump_media_url?: string | null
          orderbump_type?: string | null
          payment_reminder_minutes?: number | null
          principal_content?: string | null
          principal_cta_above_text?: string | null
          principal_cta_enabled?: boolean | null
          principal_cta_text?: string | null
          principal_media_type?: string | null
          principal_media_url?: string | null
          remarketing_content?: string | null
          remarketing_delay_minutes?: number | null
          remarketing_enabled?: boolean | null
          remarketing_mode?: string | null
          schema_version?: number | null
          telegram_integration_id?: string | null
          trigger_keywords?: string[] | null
          updated_at?: string | null
          upsell_content?: string | null
          upsell_enabled?: boolean | null
          upsell_media_url?: string | null
          upsell_mode?: string | null
          user_id?: string
          webhook_registered?: boolean | null
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnels_telegram_integration_id_fkey"
            columns: ["telegram_integration_id"]
            isOneToOne: false
            referencedRelation: "telegram_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_accounts: {
        Row: {
          created_at: string | null
          created_by: string | null
          deliverable_email: string | null
          deliverable_info: string | null
          deliverable_login: string | null
          deliverable_notes: string | null
          deliverable_password: string | null
          description: string | null
          engagement_rate: number | null
          followers: number | null
          following: number | null
          id: string
          image_url: string | null
          is_sold: boolean | null
          is_verified: boolean | null
          niche: string | null
          posts_count: number | null
          price_cents: number
          sold_at: string | null
          sold_to_user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deliverable_email?: string | null
          deliverable_info?: string | null
          deliverable_login?: string | null
          deliverable_notes?: string | null
          deliverable_password?: string | null
          description?: string | null
          engagement_rate?: number | null
          followers?: number | null
          following?: number | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          is_verified?: boolean | null
          niche?: string | null
          posts_count?: number | null
          price_cents: number
          sold_at?: string | null
          sold_to_user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deliverable_email?: string | null
          deliverable_info?: string | null
          deliverable_login?: string | null
          deliverable_notes?: string | null
          deliverable_password?: string | null
          description?: string | null
          engagement_rate?: number | null
          followers?: number | null
          following?: number | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          is_verified?: boolean | null
          niche?: string | null
          posts_count?: number | null
          price_cents?: number
          sold_at?: string | null
          sold_to_user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      instagram_engagement_blocked: {
        Row: {
          blocked_at: string | null
          blocked_by: string
          id: string
          instagram_account_id: string | null
          reason: string
          user_id: string | null
        }
        Insert: {
          blocked_at?: string | null
          blocked_by: string
          id?: string
          instagram_account_id?: string | null
          reason: string
          user_id?: string | null
        }
        Update: {
          blocked_at?: string | null
          blocked_by?: string
          id?: string
          instagram_account_id?: string | null
          reason?: string
          user_id?: string | null
        }
        Relationships: []
      }
      instagram_engagement_configs: {
        Row: {
          auto_variations: boolean | null
          comments: Json | null
          consecutive_errors: number | null
          cooldown_reason: string | null
          cooldown_until: string | null
          created_at: string | null
          daily_count: number | null
          daily_limit: number | null
          end_hour: number | null
          id: string
          instagram_account_id: string
          is_active: boolean | null
          last_comment_at: string | null
          max_delay_seconds: number | null
          min_delay_seconds: number | null
          randomize_order: boolean | null
          start_hour: number | null
          status: string | null
          updated_at: string | null
          use_emojis: boolean | null
          user_id: string
        }
        Insert: {
          auto_variations?: boolean | null
          comments?: Json | null
          consecutive_errors?: number | null
          cooldown_reason?: string | null
          cooldown_until?: string | null
          created_at?: string | null
          daily_count?: number | null
          daily_limit?: number | null
          end_hour?: number | null
          id?: string
          instagram_account_id: string
          is_active?: boolean | null
          last_comment_at?: string | null
          max_delay_seconds?: number | null
          min_delay_seconds?: number | null
          randomize_order?: boolean | null
          start_hour?: number | null
          status?: string | null
          updated_at?: string | null
          use_emojis?: boolean | null
          user_id: string
        }
        Update: {
          auto_variations?: boolean | null
          comments?: Json | null
          consecutive_errors?: number | null
          cooldown_reason?: string | null
          cooldown_until?: string | null
          created_at?: string | null
          daily_count?: number | null
          daily_limit?: number | null
          end_hour?: number | null
          id?: string
          instagram_account_id?: string
          is_active?: boolean | null
          last_comment_at?: string | null
          max_delay_seconds?: number | null
          min_delay_seconds?: number | null
          randomize_order?: boolean | null
          start_hour?: number | null
          status?: string | null
          updated_at?: string | null
          use_emojis?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      instagram_engagement_limits: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          max_accounts: number | null
          max_daily_comments: number | null
          min_delay_seconds: number | null
          plan_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          max_accounts?: number | null
          max_daily_comments?: number | null
          min_delay_seconds?: number | null
          plan_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          max_accounts?: number | null
          max_daily_comments?: number | null
          min_delay_seconds?: number | null
          plan_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      instagram_engagement_logs: {
        Row: {
          action: string
          comment_text: string | null
          config_id: string
          created_at: string | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          instagram_account_id: string
          ip_address: string | null
          post_url: string | null
          status: string
          target_type: string | null
          target_value: string | null
          user_id: string
        }
        Insert: {
          action: string
          comment_text?: string | null
          config_id: string
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          instagram_account_id: string
          ip_address?: string | null
          post_url?: string | null
          status: string
          target_type?: string | null
          target_value?: string | null
          user_id: string
        }
        Update: {
          action?: string
          comment_text?: string | null
          config_id?: string
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          instagram_account_id?: string
          ip_address?: string | null
          post_url?: string | null
          status?: string
          target_type?: string | null
          target_value?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_engagement_logs_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "instagram_engagement_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_engagement_targets: {
        Row: {
          config_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          priority: number | null
          target_type: string
          target_value: string
        }
        Insert: {
          config_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          target_type: string
          target_value: string
        }
        Update: {
          config_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          target_type?: string
          target_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_engagement_targets_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "instagram_engagement_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          access_token: string
          api_token: string | null
          created_at: string | null
          environment: string | null
          id: string
          last_sync_at: string | null
          provider: string | null
          provider_email: string | null
          provider_name: string | null
          provider_user_id: string | null
          refresh_token: string | null
          status: string | null
          token_expires_at: string | null
          tracking_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          api_token?: string | null
          created_at?: string | null
          environment?: string | null
          id?: string
          last_sync_at?: string | null
          provider?: string | null
          provider_email?: string | null
          provider_name?: string | null
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          token_expires_at?: string | null
          tracking_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          api_token?: string | null
          created_at?: string | null
          environment?: string | null
          id?: string
          last_sync_at?: string | null
          provider?: string | null
          provider_email?: string | null
          provider_name?: string | null
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          token_expires_at?: string | null
          tracking_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      models_for_sale: {
        Row: {
          assets: Json | null
          bio: string | null
          category: string | null
          created_at: string | null
          created_by: string | null
          deliverable_info: string | null
          deliverable_link: string | null
          deliverable_notes: string | null
          funnel_json: Json | null
          id: string
          image_url: string | null
          is_sold: boolean | null
          name: string
          niche: string | null
          price_cents: number
          scripts: Json | null
          sold_at: string | null
          sold_to_user_id: string | null
        }
        Insert: {
          assets?: Json | null
          bio?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          deliverable_info?: string | null
          deliverable_link?: string | null
          deliverable_notes?: string | null
          funnel_json?: Json | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          name: string
          niche?: string | null
          price_cents: number
          scripts?: Json | null
          sold_at?: string | null
          sold_to_user_id?: string | null
        }
        Update: {
          assets?: Json | null
          bio?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          deliverable_info?: string | null
          deliverable_link?: string | null
          deliverable_notes?: string | null
          funnel_json?: Json | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          name?: string
          niche?: string | null
          price_cents?: number
          scripts?: Json | null
          sold_at?: string | null
          sold_to_user_id?: string | null
        }
        Relationships: []
      }
      multilogin_facebook_accounts: {
        Row: {
          access_token: string
          avatar_url: string | null
          business_manager_id: string | null
          business_manager_name: string | null
          context_id: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          error_message: string | null
          facebook_user_id: string
          id: string
          last_used_at: string | null
          permissions: string[] | null
          proxy_id: string | null
          status: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          avatar_url?: string | null
          business_manager_id?: string | null
          business_manager_name?: string | null
          context_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          error_message?: string | null
          facebook_user_id: string
          id?: string
          last_used_at?: string | null
          permissions?: string[] | null
          proxy_id?: string | null
          status?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          avatar_url?: string | null
          business_manager_id?: string | null
          business_manager_name?: string | null
          context_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          error_message?: string | null
          facebook_user_id?: string
          id?: string
          last_used_at?: string | null
          permissions?: string[] | null
          proxy_id?: string | null
          status?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "multilogin_facebook_accounts_proxy_id_fkey"
            columns: ["proxy_id"]
            isOneToOne: false
            referencedRelation: "multilogin_proxies"
            referencedColumns: ["id"]
          },
        ]
      }
      multilogin_google_accounts: {
        Row: {
          access_token: string
          avatar_url: string | null
          context_id: string | null
          created_at: string | null
          display_name: string | null
          email: string
          error_message: string | null
          id: string
          last_used_at: string | null
          proxy_id: string | null
          refresh_token: string | null
          scopes: string[] | null
          status: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          avatar_url?: string | null
          context_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          error_message?: string | null
          id?: string
          last_used_at?: string | null
          proxy_id?: string | null
          refresh_token?: string | null
          scopes?: string[] | null
          status?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          avatar_url?: string | null
          context_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          error_message?: string | null
          id?: string
          last_used_at?: string | null
          proxy_id?: string | null
          refresh_token?: string | null
          scopes?: string[] | null
          status?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "multilogin_google_accounts_proxy_id_fkey"
            columns: ["proxy_id"]
            isOneToOne: false
            referencedRelation: "multilogin_proxies"
            referencedColumns: ["id"]
          },
        ]
      }
      multilogin_instagram_accounts: {
        Row: {
          access_token: string | null
          avatar_url: string | null
          context_id: string | null
          created_at: string | null
          display_name: string | null
          error_message: string | null
          facebook_account_id: string | null
          id: string
          instagram_id: string
          last_used_at: string | null
          page_id: string | null
          page_name: string | null
          proxy_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          access_token?: string | null
          avatar_url?: string | null
          context_id?: string | null
          created_at?: string | null
          display_name?: string | null
          error_message?: string | null
          facebook_account_id?: string | null
          id?: string
          instagram_id: string
          last_used_at?: string | null
          page_id?: string | null
          page_name?: string | null
          proxy_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          access_token?: string | null
          avatar_url?: string | null
          context_id?: string | null
          created_at?: string | null
          display_name?: string | null
          error_message?: string | null
          facebook_account_id?: string | null
          id?: string
          instagram_id?: string
          last_used_at?: string | null
          page_id?: string | null
          page_name?: string | null
          proxy_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "multilogin_instagram_accounts_facebook_account_id_fkey"
            columns: ["facebook_account_id"]
            isOneToOne: false
            referencedRelation: "multilogin_facebook_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "multilogin_instagram_accounts_proxy_id_fkey"
            columns: ["proxy_id"]
            isOneToOne: false
            referencedRelation: "multilogin_proxies"
            referencedColumns: ["id"]
          },
        ]
      }
      multilogin_logs: {
        Row: {
          account_id: string | null
          account_type: string | null
          action: string
          country: string | null
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          ip_used: string | null
          message: string | null
          proxy_id: string | null
          status: string | null
          user_id: string
          worker_id: string | null
        }
        Insert: {
          account_id?: string | null
          account_type?: string | null
          action: string
          country?: string | null
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_used?: string | null
          message?: string | null
          proxy_id?: string | null
          status?: string | null
          user_id: string
          worker_id?: string | null
        }
        Update: {
          account_id?: string | null
          account_type?: string | null
          action?: string
          country?: string | null
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_used?: string | null
          message?: string | null
          proxy_id?: string | null
          status?: string | null
          user_id?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "multilogin_logs_proxy_id_fkey"
            columns: ["proxy_id"]
            isOneToOne: false
            referencedRelation: "multilogin_proxies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "multilogin_logs_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "multilogin_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      multilogin_proxies: {
        Row: {
          country: string | null
          created_at: string | null
          detected_ip: string | null
          host: string
          id: string
          is_active: boolean | null
          last_test_success: boolean | null
          last_tested_at: string | null
          name: string
          password: string | null
          port: number
          protocol: string
          test_error: string | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          detected_ip?: string | null
          host: string
          id?: string
          is_active?: boolean | null
          last_test_success?: boolean | null
          last_tested_at?: string | null
          name: string
          password?: string | null
          port: number
          protocol: string
          test_error?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          detected_ip?: string | null
          host?: string
          id?: string
          is_active?: boolean | null
          last_test_success?: boolean | null
          last_tested_at?: string | null
          name?: string
          password?: string | null
          port?: number
          protocol?: string
          test_error?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      multilogin_workers: {
        Row: {
          account_id: string
          account_type: string
          config: Json | null
          created_at: string | null
          error_count: number | null
          id: string
          is_active: boolean | null
          last_error: string | null
          last_run_at: string | null
          name: string
          next_run_at: string | null
          proxy_id: string | null
          run_count: number | null
          schedule_cron: string | null
          status: string | null
          task_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          account_type: string
          config?: Json | null
          created_at?: string | null
          error_count?: number | null
          id?: string
          is_active?: boolean | null
          last_error?: string | null
          last_run_at?: string | null
          name: string
          next_run_at?: string | null
          proxy_id?: string | null
          run_count?: number | null
          schedule_cron?: string | null
          status?: string | null
          task_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          account_type?: string
          config?: Json | null
          created_at?: string | null
          error_count?: number | null
          id?: string
          is_active?: boolean | null
          last_error?: string | null
          last_run_at?: string | null
          name?: string
          next_run_at?: string | null
          proxy_id?: string | null
          run_count?: number | null
          schedule_cron?: string | null
          status?: string | null
          task_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "multilogin_workers_proxy_id_fkey"
            columns: ["proxy_id"]
            isOneToOne: false
            referencedRelation: "multilogin_proxies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link_text: string | null
          link_url: string | null
          message: string
          priority: number | null
          starts_at: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_text?: string | null
          link_url?: string | null
          message: string
          priority?: number | null
          starts_at?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_text?: string | null
          link_url?: string | null
          message?: string
          priority?: number | null
          starts_at?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pixel_warming_configs: {
        Row: {
          access_token: string | null
          created_at: string | null
          events_sent: number | null
          id: string
          is_active: boolean | null
          last_warmed_at: string | null
          pixel_id: string
          platform: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          events_sent?: number | null
          id?: string
          is_active?: boolean | null
          last_warmed_at?: string | null
          pixel_id: string
          platform: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          events_sent?: number | null
          id?: string
          is_active?: boolean | null
          last_warmed_at?: string | null
          pixel_id?: string
          platform?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pixel_warming_logs: {
        Row: {
          config_id: string
          created_at: string | null
          error_message: string | null
          event_data: Json | null
          event_type: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          config_id: string
          created_at?: string | null
          error_message?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          config_id?: string
          created_at?: string | null
          error_message?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pixel_warming_logs_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "pixel_warming_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json | null
          has_ai_models: boolean | null
          has_scheduling: boolean | null
          id: string
          is_active: boolean | null
          max_destinations: number | null
          max_funnels: number | null
          max_media_per_month: number | null
          name: string
          price_cents: number | null
          slug: Database["public"]["Enums"]["plan_type"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          has_ai_models?: boolean | null
          has_scheduling?: boolean | null
          id?: string
          is_active?: boolean | null
          max_destinations?: number | null
          max_funnels?: number | null
          max_media_per_month?: number | null
          name: string
          price_cents?: number | null
          slug: Database["public"]["Enums"]["plan_type"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          has_ai_models?: boolean | null
          has_scheduling?: boolean | null
          id?: string
          is_active?: boolean | null
          max_destinations?: number | null
          max_funnels?: number | null
          max_media_per_month?: number | null
          name?: string
          price_cents?: number | null
          slug?: Database["public"]["Enums"]["plan_type"]
        }
        Relationships: []
      }
      post_platform_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          platform: string
          platform_post_id: string | null
          post_id: string
          posted_at: string | null
          retry_count: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          platform: string
          platform_post_id?: string | null
          post_id: string
          posted_at?: string | null
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          platform?: string
          platform_post_id?: string | null
          post_id?: string
          posted_at?: string | null
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_platform_logs_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "scheduled_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_plan: Database["public"]["Enums"]["plan_type"] | null
          email: string
          full_name: string | null
          id: string
          is_online: boolean | null
          is_suspended: boolean | null
          last_seen_at: string | null
          onboarding_completed: boolean | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_plan?: Database["public"]["Enums"]["plan_type"] | null
          email: string
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          is_suspended?: boolean | null
          last_seen_at?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_plan?: Database["public"]["Enums"]["plan_type"] | null
          email?: string
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          is_suspended?: boolean | null
          last_seen_at?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referral_allowed_roles: {
        Row: {
          created_at: string | null
          id: string
          role_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role_name?: string
        }
        Relationships: []
      }
      referral_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      referral_role_commissions: {
        Row: {
          commission_percent: number
          created_at: string | null
          id: string
          role_name: string
          updated_at: string | null
        }
        Insert: {
          commission_percent: number
          created_at?: string | null
          id?: string
          role_name: string
          updated_at?: string | null
        }
        Update: {
          commission_percent?: number
          created_at?: string | null
          id?: string
          role_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_settings: {
        Row: {
          commission_type: string | null
          cookie_duration_days: number | null
          created_at: string | null
          default_commission_percent: number | null
          id: string
          is_enabled: boolean | null
          min_payout_cents: number | null
          referral_base_url: string | null
          updated_at: string | null
        }
        Insert: {
          commission_type?: string | null
          cookie_duration_days?: number | null
          created_at?: string | null
          default_commission_percent?: number | null
          id?: string
          is_enabled?: boolean | null
          min_payout_cents?: number | null
          referral_base_url?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_type?: string | null
          cookie_duration_days?: number | null
          created_at?: string | null
          default_commission_percent?: number | null
          id?: string
          is_enabled?: boolean | null
          min_payout_cents?: number | null
          referral_base_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string
          referred_id: string
          referrer_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code: string
          referred_id: string
          referrer_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_id?: string
          referrer_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          media_urls: Json | null
          platforms: string[]
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          media_urls?: Json | null
          platforms: string[]
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          media_urls?: Json | null
          platforms?: string[]
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      smart_link_buttons: {
        Row: {
          click_count: number | null
          created_at: string | null
          event_name: string | null
          funnel_id: string | null
          funnel_tag: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          page_id: string
          position: number | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          click_count?: number | null
          created_at?: string | null
          event_name?: string | null
          funnel_id?: string | null
          funnel_tag?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          page_id: string
          position?: number | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          click_count?: number | null
          created_at?: string | null
          event_name?: string | null
          funnel_id?: string | null
          funnel_tag?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          page_id?: string
          position?: number | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "smart_link_buttons_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smart_link_buttons_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "smart_link_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_link_clicks: {
        Row: {
          button_id: string
          clicked_at: string | null
          country: string | null
          id: string
          ip_address: string | null
          page_id: string
          referrer: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          button_id: string
          clicked_at?: string | null
          country?: string | null
          id?: string
          ip_address?: string | null
          page_id: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          button_id?: string
          clicked_at?: string | null
          country?: string | null
          id?: string
          ip_address?: string | null
          page_id?: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smart_link_clicks_button_id_fkey"
            columns: ["button_id"]
            isOneToOne: false
            referencedRelation: "smart_link_buttons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smart_link_clicks_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "smart_link_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_link_pages: {
        Row: {
          avatar_url: string | null
          background_color: string | null
          button_style: string | null
          created_at: string | null
          description: string | null
          google_analytics_id: string | null
          id: string
          is_active: boolean | null
          meta_pixel_id: string | null
          page_type: string | null
          redirect_url: string | null
          slug: string
          template: string | null
          text_color: string | null
          tiktok_pixel_id: string | null
          title: string
          total_views: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          background_color?: string | null
          button_style?: string | null
          created_at?: string | null
          description?: string | null
          google_analytics_id?: string | null
          id?: string
          is_active?: boolean | null
          meta_pixel_id?: string | null
          page_type?: string | null
          redirect_url?: string | null
          slug: string
          template?: string | null
          text_color?: string | null
          tiktok_pixel_id?: string | null
          title: string
          total_views?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          background_color?: string | null
          button_style?: string | null
          created_at?: string | null
          description?: string | null
          google_analytics_id?: string | null
          id?: string
          is_active?: boolean | null
          meta_pixel_id?: string | null
          page_type?: string | null
          redirect_url?: string | null
          slug?: string
          template?: string | null
          text_color?: string | null
          tiktok_pixel_id?: string | null
          title?: string
          total_views?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      smart_link_views: {
        Row: {
          id: string
          page_id: string
          referrer: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          page_id: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          page_id?: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smart_link_views_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "smart_link_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          access_token: string | null
          account_avatar_url: string | null
          account_name: string | null
          account_username: string | null
          created_at: string | null
          id: string
          is_connected: boolean | null
          last_used_at: string | null
          platform: string
          platform_user_id: string | null
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_avatar_url?: string | null
          account_name?: string | null
          account_username?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          last_used_at?: string | null
          platform: string
          platform_user_id?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_avatar_url?: string | null
          account_name?: string | null
          account_username?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          last_used_at?: string | null
          platform?: string
          platform_user_id?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          plan_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_groups: {
        Row: {
          created_at: string | null
          created_by: string | null
          deliverable_info: string | null
          deliverable_invite_link: string | null
          deliverable_notes: string | null
          description: string | null
          group_name: string
          group_type: string | null
          group_username: string | null
          id: string
          image_url: string | null
          is_sold: boolean | null
          is_verified: boolean | null
          members_count: number | null
          niche: string | null
          price_cents: number
          sold_at: string | null
          sold_to_user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deliverable_info?: string | null
          deliverable_invite_link?: string | null
          deliverable_notes?: string | null
          description?: string | null
          group_name: string
          group_type?: string | null
          group_username?: string | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          is_verified?: boolean | null
          members_count?: number | null
          niche?: string | null
          price_cents: number
          sold_at?: string | null
          sold_to_user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deliverable_info?: string | null
          deliverable_invite_link?: string | null
          deliverable_notes?: string | null
          description?: string | null
          group_name?: string
          group_type?: string | null
          group_username?: string | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          is_verified?: boolean | null
          members_count?: number | null
          niche?: string | null
          price_cents?: number
          sold_at?: string | null
          sold_to_user_id?: string | null
        }
        Relationships: []
      }
      telegram_integrations: {
        Row: {
          bot_name: string | null
          bot_token: string
          bot_username: string | null
          chat_id: string | null
          chat_title: string | null
          created_at: string | null
          id: string
          is_connected: boolean | null
          is_validated: boolean | null
          last_validated_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bot_name?: string | null
          bot_token: string
          bot_username?: string | null
          chat_id?: string | null
          chat_title?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          is_validated?: boolean | null
          last_validated_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bot_name?: string | null
          bot_token?: string
          bot_username?: string | null
          chat_id?: string | null
          chat_title?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          is_validated?: boolean | null
          last_validated_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      telegram_logs: {
        Row: {
          created_at: string | null
          event_type: string
          funnel_id: string | null
          id: string
          node_id: string | null
          payload: Json | null
          session_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          funnel_id?: string | null
          id?: string
          node_id?: string | null
          payload?: Json | null
          session_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          funnel_id?: string | null
          id?: string
          node_id?: string | null
          payload?: Json | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "telegram_logs_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telegram_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "telegram_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_mtproto_accounts: {
        Row: {
          created_at: string | null
          id: string
          is_connected: boolean | null
          last_connected_at: string | null
          phone_number: string
          session_data: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          last_connected_at?: string | null
          phone_number: string
          session_data?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          last_connected_at?: string | null
          phone_number?: string
          session_data?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      telegram_sessions: {
        Row: {
          chat_id: string
          created_at: string | null
          current_node_id: string | null
          fbclid: string | null
          funnel_id: string
          gclid: string | null
          history: Json | null
          id: string
          is_finished: boolean | null
          last_message_at: string | null
          telegram_user_id: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          variables: Json | null
        }
        Insert: {
          chat_id: string
          created_at?: string | null
          current_node_id?: string | null
          fbclid?: string | null
          funnel_id: string
          gclid?: string | null
          history?: Json | null
          id?: string
          is_finished?: boolean | null
          last_message_at?: string | null
          telegram_user_id?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          variables?: Json | null
        }
        Update: {
          chat_id?: string
          created_at?: string | null
          current_node_id?: string | null
          fbclid?: string | null
          funnel_id?: string
          gclid?: string | null
          history?: Json | null
          id?: string
          is_finished?: boolean | null
          last_message_at?: string | null
          telegram_user_id?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "telegram_sessions_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_sync_sources: {
        Row: {
          account_id: string
          created_at: string | null
          date_from: string | null
          date_to: string | null
          id: string
          is_active: boolean | null
          keywords: string[] | null
          max_file_size_mb: number | null
          media_types: string[] | null
          source_id: string
          source_name: string
          source_type: string
          sync_mode: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          created_at?: string | null
          date_from?: string | null
          date_to?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          max_file_size_mb?: number | null
          media_types?: string[] | null
          source_id: string
          source_name: string
          source_type: string
          sync_mode?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          created_at?: string | null
          date_from?: string | null
          date_to?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          max_file_size_mb?: number | null
          media_types?: string[] | null
          source_id?: string
          source_name?: string
          source_type?: string
          sync_mode?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_sync_sources_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "telegram_mtproto_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      tiktok_accounts: {
        Row: {
          created_at: string | null
          created_by: string | null
          deliverable_email: string | null
          deliverable_info: string | null
          deliverable_login: string | null
          deliverable_notes: string | null
          deliverable_password: string | null
          description: string | null
          followers: number | null
          id: string
          image_url: string | null
          is_sold: boolean | null
          is_verified: boolean | null
          likes: number | null
          niche: string | null
          price_cents: number
          sold_at: string | null
          sold_to_user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deliverable_email?: string | null
          deliverable_info?: string | null
          deliverable_login?: string | null
          deliverable_notes?: string | null
          deliverable_password?: string | null
          description?: string | null
          followers?: number | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          is_verified?: boolean | null
          likes?: number | null
          niche?: string | null
          price_cents: number
          sold_at?: string | null
          sold_to_user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deliverable_email?: string | null
          deliverable_info?: string | null
          deliverable_login?: string | null
          deliverable_notes?: string | null
          deliverable_password?: string | null
          description?: string | null
          followers?: number | null
          id?: string
          image_url?: string | null
          is_sold?: boolean | null
          is_verified?: boolean | null
          likes?: number | null
          niche?: string | null
          price_cents?: number
          sold_at?: string | null
          sold_to_user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_cents: number
          buckpay_id: string | null
          buyer_document: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          created_at: string | null
          external_id: string
          id: string
          is_admin_granted: boolean | null
          net_amount_cents: number | null
          payment_method: string | null
          pix_code: string | null
          pix_qrcode_base64: string | null
          product_id: string | null
          product_type: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          buckpay_id?: string | null
          buyer_document?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          created_at?: string | null
          external_id: string
          id?: string
          is_admin_granted?: boolean | null
          net_amount_cents?: number | null
          payment_method?: string | null
          pix_code?: string | null
          pix_qrcode_base64?: string | null
          product_id?: string | null
          product_type?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          buckpay_id?: string | null
          buyer_document?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          created_at?: string | null
          external_id?: string
          id?: string
          is_admin_granted?: boolean | null
          net_amount_cents?: number | null
          payment_method?: string | null
          pix_code?: string | null
          pix_qrcode_base64?: string | null
          product_id?: string | null
          product_type?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_metrics: {
        Row: {
          created_at: string | null
          id: string
          last_activity_at: string | null
          media_sent: number | null
          telegram_integrations_active: number | null
          total_actions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          media_sent?: number | null
          telegram_integrations_active?: number | null
          total_actions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          media_sent?: number | null
          telegram_integrations_active?: number | null
          total_actions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_notification_reads: {
        Row: {
          id: string
          notification_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          notification_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          notification_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notification_reads_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_referral_commissions: {
        Row: {
          commission_percent: number | null
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          commission_percent?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          commission_percent?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string
        }
        Relationships: []
      }
      utm_events: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          event_data: Json | null
          event_type: string | null
          event_value: number | null
          fbclid: string | null
          gclid: string | null
          id: string
          ip_address: string | null
          os: string | null
          page_url: string | null
          pixel_id: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_data?: Json | null
          event_type?: string | null
          event_value?: number | null
          fbclid?: string | null
          gclid?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_url?: string | null
          pixel_id: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_data?: Json | null
          event_type?: string | null
          event_value?: number | null
          fbclid?: string | null
          gclid?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_url?: string | null
          pixel_id?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      utm_pixels: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          pixel_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pixel_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pixel_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vendor_sales: {
        Row: {
          buyer_id: string
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          paid_at: string | null
          platform_fee_cents: number
          sale_amount_cents: number
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          vendor_commission_cents: number
          vendor_id: string
        }
        Insert: {
          buyer_id: string
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          paid_at?: string | null
          platform_fee_cents: number
          sale_amount_cents: number
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          vendor_commission_cents: number
          vendor_id: string
        }
        Update: {
          buyer_id?: string
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          paid_at?: string | null
          platform_fee_cents?: number
          sale_amount_cents?: number
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          vendor_commission_cents?: number
          vendor_id?: string
        }
        Relationships: []
      }
      wpp_accounts: {
        Row: {
          access_token: string
          business_name: string | null
          created_at: string | null
          id: string
          is_connected: boolean | null
          last_validated_at: string | null
          phone_display: string | null
          phone_number_id: string
          status: string | null
          updated_at: string | null
          user_id: string
          waba_id: string
          webhook_verify_token: string | null
        }
        Insert: {
          access_token: string
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          last_validated_at?: string | null
          phone_display?: string | null
          phone_number_id: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          waba_id: string
          webhook_verify_token?: string | null
        }
        Update: {
          access_token?: string
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          last_validated_at?: string | null
          phone_display?: string | null
          phone_number_id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
          waba_id?: string
          webhook_verify_token?: string | null
        }
        Relationships: []
      }
      wpp_contacts: {
        Row: {
          created_at: string | null
          id: string
          last_seen_at: string | null
          name: string | null
          opt_in_status: string | null
          phone: string
          profile_name: string | null
          updated_at: string | null
          user_id: string
          wa_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_seen_at?: string | null
          name?: string | null
          opt_in_status?: string | null
          phone: string
          profile_name?: string | null
          updated_at?: string | null
          user_id: string
          wa_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_seen_at?: string | null
          name?: string | null
          opt_in_status?: string | null
          phone?: string
          profile_name?: string | null
          updated_at?: string | null
          user_id?: string
          wa_id?: string
        }
        Relationships: []
      }
      wpp_conversations: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          id: string
          last_message_at: string | null
          pricing_category: string | null
          updated_at: string | null
          user_id: string
          wa_id: string
          window_open_until: string | null
          wpp_account_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          pricing_category?: string | null
          updated_at?: string | null
          user_id: string
          wa_id: string
          window_open_until?: string | null
          wpp_account_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          pricing_category?: string | null
          updated_at?: string | null
          user_id?: string
          wa_id?: string
          window_open_until?: string | null
          wpp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wpp_conversations_wpp_account_id_fkey"
            columns: ["wpp_account_id"]
            isOneToOne: false
            referencedRelation: "wpp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wpp_logs: {
        Row: {
          created_at: string | null
          event_type: string
          funnel_id: string | null
          id: string
          node_id: string | null
          payload: Json | null
          session_id: string | null
          user_id: string
          wpp_account_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          funnel_id?: string | null
          id?: string
          node_id?: string | null
          payload?: Json | null
          session_id?: string | null
          user_id: string
          wpp_account_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          funnel_id?: string | null
          id?: string
          node_id?: string | null
          payload?: Json | null
          session_id?: string | null
          user_id?: string
          wpp_account_id?: string | null
        }
        Relationships: []
      }
      wpp_messages: {
        Row: {
          created_at: string | null
          direction: string | null
          error_message: string | null
          id: string
          message_id: string | null
          message_type: string | null
          payload: Json | null
          status: string | null
          updated_at: string | null
          user_id: string
          wa_id: string
          wpp_account_id: string | null
        }
        Insert: {
          created_at?: string | null
          direction?: string | null
          error_message?: string | null
          id?: string
          message_id?: string | null
          message_type?: string | null
          payload?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          wa_id: string
          wpp_account_id?: string | null
        }
        Update: {
          created_at?: string | null
          direction?: string | null
          error_message?: string | null
          id?: string
          message_id?: string | null
          message_type?: string | null
          payload?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          wa_id?: string
          wpp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wpp_messages_wpp_account_id_fkey"
            columns: ["wpp_account_id"]
            isOneToOne: false
            referencedRelation: "wpp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wpp_sessions: {
        Row: {
          chat_id: string
          created_at: string | null
          current_node_id: string | null
          funnel_id: string | null
          history: Json | null
          id: string
          is_finished: boolean | null
          last_message_at: string | null
          updated_at: string | null
          user_id: string
          variables: Json | null
          wa_id: string
          wpp_account_id: string | null
        }
        Insert: {
          chat_id: string
          created_at?: string | null
          current_node_id?: string | null
          funnel_id?: string | null
          history?: Json | null
          id?: string
          is_finished?: boolean | null
          last_message_at?: string | null
          updated_at?: string | null
          user_id: string
          variables?: Json | null
          wa_id: string
          wpp_account_id?: string | null
        }
        Update: {
          chat_id?: string
          created_at?: string | null
          current_node_id?: string | null
          funnel_id?: string | null
          history?: Json | null
          id?: string
          is_finished?: boolean | null
          last_message_at?: string | null
          updated_at?: string | null
          user_id?: string
          variables?: Json | null
          wa_id?: string
          wpp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wpp_sessions_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wpp_sessions_wpp_account_id_fkey"
            columns: ["wpp_account_id"]
            isOneToOne: false
            referencedRelation: "wpp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wpp_templates: {
        Row: {
          category: string | null
          components: Json | null
          created_at: string | null
          id: string
          language: string | null
          status: string | null
          template_id: string | null
          template_name: string
          updated_at: string | null
          user_id: string
          variables: Json | null
          wpp_account_id: string | null
        }
        Insert: {
          category?: string | null
          components?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          status?: string | null
          template_id?: string | null
          template_name: string
          updated_at?: string | null
          user_id: string
          variables?: Json | null
          wpp_account_id?: string | null
        }
        Update: {
          category?: string | null
          components?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          status?: string | null
          template_id?: string | null
          template_name?: string
          updated_at?: string | null
          user_id?: string
          variables?: Json | null
          wpp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wpp_templates_wpp_account_id_fkey"
            columns: ["wpp_account_id"]
            isOneToOne: false
            referencedRelation: "wpp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_referrals: { Args: { p_user_id: string }; Returns: boolean }
      generate_referral_code: { Args: { p_user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role:
        | "admin"
        | "user"
        | "vendor"
        | "vendor_instagram"
        | "vendor_tiktok"
        | "vendor_model"
        | "indicador"
        | "gerente_contas"
      plan_type: "free" | "basic" | "pro" | "agency"
      subscription_status: "active" | "pending" | "cancelled" | "expired"
      transaction_status: "pending" | "paid" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "user",
        "vendor",
        "vendor_instagram",
        "vendor_tiktok",
        "vendor_model",
        "indicador",
        "gerente_contas",
      ],
      plan_type: ["free", "basic", "pro", "agency"],
      subscription_status: ["active", "pending", "cancelled", "expired"],
      transaction_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const
