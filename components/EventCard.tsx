'use client'

import Image from 'next/image'
import { Calendar, MapPin, Lock } from 'lucide-react'
import { Event, TierType, tierColors } from '@/lib/supabase'
import clsx from 'clsx'

interface EventCardProps {
  event: Event
  isAccessible: boolean
  userTier: TierType
}

export default function EventCard({ event, isAccessible, userTier }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={clsx(
      'bg-white rounded-xl shadow-lg overflow-hidden card-hover',
      !isAccessible && 'opacity-75 relative'
    )}>
      {/* Locked Overlay */}
      {!isAccessible && (
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
          <div className="text-center text-white">
            <Lock className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-semibold mb-2">Tier Locked</p>
            <p className="text-sm">Upgrade to {event.tier} to access</p>
          </div>
        </div>
      )}

      {/* Event Image */}
      <div className="relative h-48 w-full">
        <Image
          src={event.image_url || '/api/placeholder/400/300'}
          alt={event.title}
          fill
          className="object-cover"
        />
        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <span className={clsx('tier-badge', tierColors[event.tier as TierType])}>
            {event.tier}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Virtual Event</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          {isAccessible ? (
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Register Now
            </button>
          ) : (
            <button 
              disabled 
              className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
            >
              Upgrade Required
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 