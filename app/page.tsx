import { UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Calendar, Star, Users, Zap } from 'lucide-react'

export default async function Home() {
  const user = await currentUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">EventTier</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                href="/events" 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                View Events
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-purple-400 hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Exclusive Events for
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Every Tier
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover premium events tailored to your membership level. From free community gatherings 
            to platinum VIP experiences.
          </p>
          
          {user ? (
            <Link 
              href="/events"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Explore Events
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                <Star className="w-5 h-5 mr-2" />
                Get Started
              </button>
            </SignUpButton>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Tier-Based Access</h3>
            <p className="text-gray-300">Events curated for your membership level and below</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Premium Events</h3>
            <p className="text-gray-300">Exclusive access to high-value networking opportunities</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Easy Upgrades</h3>
            <p className="text-gray-300">Seamlessly upgrade your tier to unlock more events</p>
          </div>
        </div>
      </div>
    </div>
  )
} 