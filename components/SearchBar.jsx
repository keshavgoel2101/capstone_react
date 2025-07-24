"use client"

import { useState } from "react"

export default function SearchBar({ onSearch, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("all")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm, propertyType)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setPropertyType("all")
    onSearch("", "all")
  }

  return (
    <div className="relative mb-12">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
      
      <form onSubmit={handleSubmit} className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by location or property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 hover:border-slate-500/50"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Property Type Select */}
          <div className="relative group">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="appearance-none bg-slate-700/50 border border-slate-600/50 rounded-xl px-6 py-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 hover:border-slate-500/50 cursor-pointer min-w-[160px]"
            >
              <option value="all" className="bg-slate-800">All Types</option>
              <option value="apartment" className="bg-slate-800">Apartment</option>
              <option value="house" className="bg-slate-800">House</option>
              <option value="condo" className="bg-slate-800">Condo</option>
              <option value="penthouse" className="bg-slate-800">Penthouse</option>
              <option value="studio" className="bg-slate-800">Studio</option>
              <option value="cabin" className="bg-slate-800">Cabin</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Clear Button */}
            {(searchTerm || propertyType !== "all") && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-4 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-xl hover:bg-slate-600/50 hover:border-slate-500/50 hover:text-white transition-all duration-200 font-medium"
              >
                Clear
              </button>
            )}

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-emerald-500/25 min-w-[120px] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-2">
            <span className="text-slate-400 text-sm font-medium mr-3">Quick filters:</span>
            {["Apartment", "House", "Condo", "Penthouse"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setPropertyType(type.toLowerCase())
                  onSearch(searchTerm, type.toLowerCase())
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  propertyType === type.toLowerCase()
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-700/30 text-slate-300 border border-slate-600/30 hover:bg-slate-600/30 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}