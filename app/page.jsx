"use client"

import { useState, useEffect } from "react"
import { fetchProperties } from "@/lib/api"
import PropertyCard from "@/components/PropertyCard"

export default function HomePage() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [featuredProperties, setFeaturedProperties] = useState([])

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setIsLoading(true)
    try {
      const data = await fetchProperties()
      setProperties(data)
      setFeaturedProperties(data.slice(0, 3))
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (searchTerm, type) => {
    setIsLoading(true)
    try {
      const data = await fetchProperties(searchTerm, type)
      setProperties(data)
    } catch (error) {
      console.error("Error searching properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Find Your Dream
              </span>
              <br />
              <span className="text-white">Property</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Compare properties, read reviews, and make informed decisions with our comprehensive platform
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">{properties.length}+</div>
                <div className="text-slate-400 text-sm">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">24/7</div>
                <div className="text-slate-400 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <div className="text-slate-400 text-sm">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured Properties */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Properties</h2>
              <p className="text-slate-400">Hand-picked premium listings just for you</p>
            </div>
            <div className="hidden sm:block w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/50 rounded-2xl p-6 animate-pulse">
                  <div className="bg-slate-700 h-48 rounded-xl mb-4"></div>
                  <div className="bg-slate-700 h-4 rounded mb-2"></div>
                  <div className="bg-slate-700 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <div key={property.id} className="group">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                    <PropertyCard property={property} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Properties */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                All Properties 
                <span className="text-emerald-400 ml-2">({properties.length})</span>
              </h2>
              <p className="text-slate-400">Explore our complete collection of properties</p>
            </div>
            <div className="hidden sm:block w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-700 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-slate-300 text-lg">Loading properties...</p>
              <p className="text-slate-500 text-sm">Finding the best matches for you</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search criteria or check back later</p>
              <button 
                onClick={loadProperties}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                Refresh Properties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 animate-fade-in-up">
                    <PropertyCard property={property} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}