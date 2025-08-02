import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { updateUserTier } from '@/lib/clerk'
import { TierType } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { userId: authUserId } = auth()
    const { userId, tier } = await req.json()

    // Verify the authenticated user matches the requested user
    if (authUserId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate tier
    const validTiers: TierType[] = ['free', 'silver', 'gold', 'platinum']
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    // Update user tier in Clerk
    await updateUserTier(userId, tier)

    return NextResponse.json({ 
      success: true, 
      message: `Tier updated to ${tier}` 
    })

  } catch (error) {
    console.error('Error updating tier:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 