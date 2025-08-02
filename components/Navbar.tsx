'use client'

import { UserButton } from '@clerk/nextjs'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { TierType, tierColors } from '@/lib/supabase'
import clsx from 'clsx'

interface NavbarProps {
  userTier: TierType
}

export default function Navbar({ userTier }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">EventTier</span>
          </Link>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* Tier Badge */}
            <div className={clsx('tier-badge', tierColors[userTier])}>
              {userTier}
            </div>
            
            {/* User Button */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  )
} 