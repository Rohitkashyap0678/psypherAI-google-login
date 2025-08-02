import { clerkClient } from '@clerk/nextjs'
import { TierType } from './supabase'

export async function getUserTier(userId: string): Promise<TierType> {
  try {
    const user = await clerkClient.users.getUser(userId)
    const tier = user.publicMetadata?.tier as TierType
    return tier || 'free' // Default to free tier
  } catch (error) {
    console.error('Error fetching user tier:', error)
    return 'free'
  }
}

export async function updateUserTier(userId: string, tier: TierType): Promise<void> {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        tier: tier
      }
    })
  } catch (error) {
    console.error('Error updating user tier:', error)
    throw error
  }
} 