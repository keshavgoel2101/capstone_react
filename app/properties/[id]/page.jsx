"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { fetchPropertyById } from "@/lib/api"
import { useApp } from "@/context/AppContext"

export default function PropertyDetailPage() {
  const params = useParams()
  const { state, dispatch } = useApp()
  const [property, setProperty] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadProperty(params.id)
    }
  }, [params.id])

  const loadProperty = async (id) => {
    setIsLoading(true)
    try {
      const data = await fetchPropertyById(id)
      setProperty(data)
    } catch (error) {
      console.error("Error loading property:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = () => {
    if (!state.user) {
      alert("Please login to add favorites")
      return
    }

    if (!property) return

    const isFavorite = state.favorites.some((p) => p.id === property.id)

    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: property })
    }
  }

  const addToCompare = () => {
    if (!property) return
    dispatch({ type: "ADD_TO_COMPARE", payload: property })
  }

  const toggleCart = () => {
    if (!state.user) {
      alert("Please login to add to cart")
      return
    }

    if (!property) return

    const isInCart = state.cart.some((item) => item.property.id === property.id)

    if (isInCart) {
      dispatch({ type: "REMOVE_FROM_CART", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_CART", payload: property })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-slate-700 rounded-full animate-spin mx-auto mb-4">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-300 text-lg">Loading property details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-slate-400 text-lg">Property not found.</p>
          </div>
        </div>
      </div>
    )
  }

  const isFavorite = state.favorites.some((p) => p.id === property.id)
  const isInCompare = state.compareList.some((p) => p.id === property.id)
  const isInCart = state.cart.some((item) => item.property.id === property.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Property Image */}
          <div className="relative">
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover"
            />
            <button
              onClick={toggleFavorite}
              className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-sm border transition-all duration-200 ${
                isFavorite 
                  ? "bg-rose-500/90 border-rose-400 text-white" 
                  : "bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700/80"
              }`}
            >
              <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-3">{property.title}</h1>
                <div className="flex items-center text-slate-400 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {property.location}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  ${property.price.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={addToCompare}
                  disabled={isInCompare}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isInCompare
                      ? "bg-emerald-500 text-white cursor-not-allowed"
                      : "bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white"
                  }`}
                >
                  {isInCompare ? "Added to Compare" : "Add to Compare"}
                </button>
                <button
                  onClick={toggleCart}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isInCart
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/25"
                  }`}
                >
                  {isInCart ? "✓ In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-white">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bedrooms:</span>
                    <span className="text-white">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bathrooms:</span>
                    <span className="text-white">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Area:</span>
                    <span className="text-white">{property.area} sqft</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Rating</h3>
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-2xl font-bold text-white">{property.rating}</span>
                </div>
                <p className="text-slate-400">{property.reviews.length} reviews</p>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span key={index} className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-sm border border-emerald-500/30">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Description</h3>
              <p className="text-slate-300 leading-relaxed">{property.description}</p>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Reviews ({property.reviews.length})</h3>
              {property.reviews.length === 0 ? (
                <p className="text-slate-400">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-white">{review.userName}</span>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 mb-2">{review.comment}</p>
                      <p className="text-sm text-slate-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}