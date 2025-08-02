import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type TierType = 'free' | 'silver' | 'gold' | 'platinum'

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string
  tier: TierType
  created_at?: string
}

export const tierHierarchy: Record<TierType, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
}

export const tierColors: Record<TierType, string> = {
  free: 'tier-free',
  silver: 'tier-silver',
  gold: 'tier-gold',
  platinum: 'tier-platinum',
}

export function canAccessTier(userTier: TierType, eventTier: TierType): boolean {
  return tierHierarchy[userTier] >= tierHierarchy[eventTier]
} 