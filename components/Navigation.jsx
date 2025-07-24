"use client"

import Link from "next/link"
import { useApp } from "@/context/AppContext"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const { state, dispatch } = useApp()
  const pathname = usePathname()

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
  }

  const isActive = (path) => pathname === path

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">NP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Newton Properties
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/") 
                  ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/properties") 
                  ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Properties
            </Link>
            <Link
              href="/comparison"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive("/comparison") 
                  ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span>Compare</span>
              {state.compareList.length > 0 && (
                <span className="bg-cyan-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {state.compareList.length}
                </span>
              )}
            </Link>
            <Link 
              href="/cart" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive("/cart") 
                  ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span>Cart</span>
              {state.cart.length > 0 && (
                <span className="bg-cyan-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {state.cart.length}
                </span>
              )}
            </Link>
            <Link 
              href="/reviews" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/reviews") 
                  ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Reviews
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {state.user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-3">
                  <span className="text-slate-300 text-sm">
                    Welcome, <span className="text-white font-medium">{state.user.name}</span>
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700 hover:border-slate-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}