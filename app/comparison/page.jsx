"use client"

import { useApp } from "@/context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function ComparisonPage() {
  const { state, dispatch } = useApp()

  const removeFromCompare = (id) => {
    dispatch({ type: "REMOVE_FROM_COMPARE", payload: id })
  }

  const clearAll = () => {
    dispatch({ type: "CLEAR_COMPARE" })
  }

  if (state.compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Property Comparison</h1>
            <p className="text-xl text-slate-400 mb-2">No properties to compare yet</p>
            <p className="text-slate-500 mb-8">Add properties from the listings to compare them side by side</p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Property Comparison
              <span className="text-emerald-400 ml-3">({state.compareList.length})</span>
            </h1>
            <p className="text-slate-400">Compare properties side by side</p>
          </div>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300 px-6 py-3 rounded-xl font-medium transition-all duration-200 border border-rose-500/30 hover:border-rose-500/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header with Property Images */}
              <thead className="bg-slate-700/50 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider min-w-32">
                    Property
                  </th>
                  {state.compareList.map((property) => (
                    <th key={property.id} className="px-6 py-6 text-center min-w-64">
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-xl">
                          <Image
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <button
                          onClick={() => removeFromCompare(property.id)}
                          className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <h3 className="font-semibold text-white text-sm mt-3 line-clamp-2">{property.title}</h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700/50">
                {/* Price Row */}
                <tr className="hover:bg-slate-700/20 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Price</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        ${property.price.toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Location Row */}
                <tr className="bg-slate-700/20 hover:bg-slate-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Location</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center text-sm text-slate-300">
                      <div className="flex items-center justify-center gap-1">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {property.location}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Type Row */}
                <tr className="hover:bg-slate-700/20 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Type</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center">
                      <span className="bg-slate-600/50 text-slate-300 px-3 py-1 rounded-lg text-sm">
                        {property.type}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Bedrooms Row */}
                <tr className="bg-slate-700/20 hover:bg-slate-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Bedrooms</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center text-white font-medium">
                      {property.bedrooms}
                    </td>
                  ))}
                </tr>

                {/* Bathrooms Row */}
                <tr className="hover:bg-slate-700/20 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Bathrooms</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center text-white font-medium">
                      {property.bathrooms}
                    </td>
                  ))}
                </tr>

                {/* Area Row */}
                <tr className="bg-slate-700/20 hover:bg-slate-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Area (sqft)</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center text-white font-medium">
                      {property.area.toLocaleString()}
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr className="hover:bg-slate-700/20 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Rating</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center bg-amber-500/20 px-3 py-1 rounded-lg mx-auto w-fit">
                        <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-amber-400 font-medium">{property.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Features Row */}
                <tr className="bg-slate-700/20 hover:bg-slate-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">Features</td>
                  {state.compareList.map((property) => (
                    <td key={property.id} className="px-6 py-4 text-center">
                      <div className="flex flex-wrap gap-1 justify-center max-w-48 mx-auto">
                        {property.features.map((feature, index) => (
                          <span key={index} className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs border border-emerald-500/30">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add More Properties
          </Link>
        </div>
      </div>
    </div>
  )
}