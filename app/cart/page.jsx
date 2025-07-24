"use client"

import { useApp } from "@/context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useApp()

  const removeFromCart = (propertyId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: propertyId })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalValue = () => {
    return state.cart.reduce((total, item) => total + item.property.price, 0)
  }

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Shopping Cart</h1>
            <p className="text-xl text-slate-400 mb-8">Please login to view your cart</p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-slate-400 mb-8">Start exploring our amazing properties</p>
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
              Shopping Cart
              <span className="text-emerald-400 ml-3">({state.cart.length})</span>
            </h1>
            <p className="text-slate-400">Manage your selected properties</p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300 px-6 py-3 rounded-xl font-medium transition-all duration-200 border border-rose-500/30 hover:border-rose-500/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.cart.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Property Image */}
                  <div className="md:w-56 relative overflow-hidden rounded-xl">
                    <Image
                      src={item.property.image || "/placeholder.svg"}
                      alt={item.property.title}
                      width={224}
                      height={168}
                      className="w-full h-42 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">
                          {item.property.title}
                        </h3>
                        <div className="flex items-center text-slate-400 text-sm mb-3">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {item.property.location}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.property.id)}
                        className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300 rounded-lg transition-all duration-200 hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        ${item.property.price.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-sm ml-2">/ month</span>
                    </div>

                    {/* Property Stats */}
                    <div className="flex justify-between items-center mb-4 p-3 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <div className="text-center">
                        <div className="text-white font-semibold">{item.property.bedrooms}</div>
                        <div className="text-slate-400 text-xs">Beds</div>
                      </div>
                      <div className="w-px h-8 bg-slate-600"></div>
                      <div className="text-center">
                        <div className="text-white font-semibold">{item.property.bathrooms}</div>
                        <div className="text-slate-400 text-xs">Baths</div>
                      </div>
                      <div className="w-px h-8 bg-slate-600"></div>
                      <div className="text-center">
                        <div className="text-white font-semibold">{item.property.area}</div>
                        <div className="text-slate-400 text-xs">Sqft</div>
                      </div>
                    </div>

                    {/* Rating and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center bg-amber-500/20 px-3 py-1 rounded-lg">
                        <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-amber-400 font-medium text-sm">{item.property.rating}</span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        Added: {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`/properties/${item.property.id}`}
                      className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Cart Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
                  <span className="text-slate-300">Items:</span>
                  <span className="text-white font-semibold">{state.cart.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-500/20">
                  <span className="text-white font-semibold">Total Value:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    ${getTotalValue().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Link 
                  href="/properties" 
                  className="w-full py-4 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              {/* Features Section */}
              <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cart Benefits
                </h3>
                <ul className="space-y-2">
                  {[
                    "Save properties for later",
                    "Compare multiple properties",
                    "Track property prices",
                    "Easy checkout process",
                    "Secure payment options"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Secure & Protected</div>
                    <div className="text-slate-400 text-xs">Your data is safe with us</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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