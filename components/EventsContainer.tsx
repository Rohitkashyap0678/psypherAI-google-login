'use client'

import { Event, TierType, canAccessTier } from '@/lib/supabase'
import EventCard from './EventCard'

interface EventsContainerProps {
  events: Event[]
  restrictedEvents: Event[]
  userTier: TierType
  title: string
}

export default function EventsContainer({ 
  events, 
  restrictedEvents, 
  userTier, 
  title 
}: EventsContainerProps) {
  const allEvents = [...events, ...restrictedEvents]

  if (allEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No events available at the moment.</p>
        <p className="text-gray-500 mt-2">Check back soon for new events!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Available Events */}
      {events.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {title} ({events.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAccessible={true}
                userTier={userTier}
              />
            ))}
          </div>
        </section>
      )}

      {/* Restricted Events */}
      {restrictedEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Premium Events ({restrictedEvents.length})
          </h2>
          <p className="text-gray-600 mb-6">
            Upgrade your tier to unlock these exclusive events
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restrictedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAccessible={false}
                userTier={userTier}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 