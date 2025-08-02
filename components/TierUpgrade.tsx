'use client'

import { useState, useTransition } from 'react'
import { TierType, tierHierarchy, tierColors } from '@/lib/supabase'
import { Crown, Zap, Star } from 'lucide-react'
import clsx from 'clsx'

interface TierUpgradeProps {
  currentTier: TierType
  userId: string
}

const tierInfo = {
  free: { name: 'Free', icon: Star, price: 'Free' },
  silver: { name: 'Silver', icon: Star, price: '$9.99/month' },
  gold: { name: 'Gold', icon: Crown, price: '$19.99/month' },
  platinum: { name: 'Platinum', icon: Zap, price: '$39.99/month' }
}

export default function TierUpgrade({ currentTier, userId }: TierUpgradeProps) {
  const [isPending, startTransition] = useTransition()
  const [upgradeStatus, setUpgradeStatus] = useState<string | null>(null)

  const availableUpgrades = Object.keys(tierHierarchy).filter(
    tier => tierHierarchy[tier as TierType] > tierHierarchy[currentTier]
  ) as TierType[]

  const handleUpgrade = async (newTier: TierType) => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/upgrade-tier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, tier: newTier }),
        })

        if (response.ok) {
          setUpgradeStatus(`Successfully upgraded to ${newTier}!`)
          // Reload the page to reflect changes
          setTimeout(() => window.location.reload(), 1500)
        } else {
          setUpgradeStatus('Upgrade failed. Please try again.')
        }
      } catch (error) {
        setUpgradeStatus('An error occurred. Please try again.')
      }
    })
  }

  if (availableUpgrades.length === 0) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center mb-8">
        <Crown className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">You're at the highest tier!</h2>
        <p>Enjoy access to all premium events.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade Your Tier</h2>
        <p className="text-gray-600">
          Unlock more exclusive events with a higher tier membership
        </p>
      </div>

      {upgradeStatus && (
        <div className={clsx(
          'p-4 rounded-lg mb-6 text-center',
          upgradeStatus.includes('Successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        )}>
          {upgradeStatus}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableUpgrades.map((tier) => {
          const TierIcon = tierInfo[tier].icon
          return (
            <div
              key={tier}
              className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className={clsx('tier-badge mx-auto mb-3', tierColors[tier])}>
                <TierIcon className="w-4 h-4 inline mr-1" />
                {tierInfo[tier].name}
              </div>
              
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {tierInfo[tier].price}
              </p>
              
              <button
                onClick={() => handleUpgrade(tier)}
                disabled={isPending}
                className={clsx(
                  'w-full py-2 px-4 rounded-lg font-semibold transition-colors',
                  isPending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                )}
              >
                {isPending ? 'Upgrading...' : `Upgrade to ${tierInfo[tier].name}`}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          * This is a demo. Actual payment processing is not implemented.
        </p>
      </div>
    </div>
  )
} 