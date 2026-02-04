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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
