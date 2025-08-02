import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { supabase, canAccessTier, TierType } from '@/lib/supabase'
import EventsContainer from '@/components/EventsContainer'
import Navbar from '@/components/Navbar'
import TierUpgrade from '@/components/TierUpgrade'

async function getEvents() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return events || []
}

export default async function EventsPage() {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect('/')
  }

  const userTier = (user.publicMetadata?.tier as TierType) || 'free'
  const allEvents = await getEvents()

  // Separate accessible and restricted events
  const accessibleEvents = allEvents.filter(event => 
    canAccessTier(userTier, event.tier as TierType)
  )
  
  const restrictedEvents = allEvents.filter(event => 
    !canAccessTier(userTier, event.tier as TierType)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar userTier={userTier} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore events curated for your {userTier} membership and unlock more with tier upgrades.
          </p>
        </div>

        {/* Tier Upgrade Component */}
        <TierUpgrade currentTier={userTier} userId={userId} />

        {/* Available Events */}
        <EventsContainer 
          events={accessibleEvents}
          restrictedEvents={restrictedEvents}
          userTier={userTier}
          title="Available Events"
        />
      </div>
    </div>
  )
} 