import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

//Components
import Time from '../components/Time';

const Admin = ({ time }) => {
  const [contactForms, setContactForms] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('contacts') // 'contacts', 'addPackage', or 'managePackages'
  const navigate = useNavigate()
  
  // Package form state
  const [packageForm, setPackageForm] = useState({
    name: '',
    days: '',
    cost: '',
    departure: '',
    departureDate: '',
    image: ''
  })
  
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingPackageId, setEditingPackageId] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const adminToken = localStorage.getItem('adminToken')
      const token = localStorage.getItem('token')
      
      if (!adminToken && !token) {
        navigate('/login', { replace: true })
        return false
      }
      return true
    }

    if (!checkAuth()) {
      return
    }
  }, [navigate])

  // Fetch all contact forms
  const fetchContactForms = async () => {
    try {
      console.log('Fetching contact forms...')
      const response = await axios.get('http://localhost:5500/api/user/contact')
      console.log('Contact forms response:', response.data)
      setContactForms(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching contact forms:', error)
      setLoading(false)
    }
  }

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/user/addpackages')
      setPackages(response.data)
    } catch (error) {
      console.error('Error fetching packages:', error)
    }
  }

  // Delete a contact form
  const deleteContactForm = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/user/contact/${id}`)
      setContactForms(contactForms.filter(form => form._id !== id))
      alert('Contact form deleted successfully!')
    } catch (error) {
      console.error('Error deleting contact form:', error)
      alert('Error deleting contact form')
    }
  }

  // Package form handlers
  const handlePackageChange = (e) => {
    setPackageForm({
      ...packageForm,
      [e.target.name]: e.target.value
    })
  }

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }
      
      // Convert to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setPackageForm({
          ...packageForm,
          image: reader.result
        })
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const handleRemoveImage = () => {
    setPackageForm({
      ...packageForm,
      image: ''
    })
    setImagePreview(null)
  }

  const handlePackageSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditMode) {
        // Update existing package
        await axios.put(`http://localhost:5500/api/user/updatepackage/${editingPackageId}`, packageForm)
        alert('Package updated successfully!')
        setIsEditMode(false)
        setEditingPackageId(null)
      } else {
        // Add new package - make sure we don't send any _id
        const { _id, ...packageDataWithoutId } = packageForm;
        await axios.post('http://localhost:5500/api/user/addpackage', packageDataWithoutId)
        alert('Package added successfully!')
      }
      
      // Reset form and refresh packages
      setPackageForm({
        name: '',
        days: '',
        cost: '',
        departure: '',
        departureDate: '',
        image: ''
      })
      setImagePreview(null)
      fetchPackages()
      setActiveTab('managePackages')
    } catch (error) {
      console.error('Error saving package:', error)
      console.error('Full error details:', error.response?.data)
      alert(`Error ${isEditMode ? 'updating' : 'adding'} package: ${error.response?.data?.details || error.message}`)
    }
  }

  // Edit package - populate form with existing data
  const handleEditPackage = (pkg) => {
    // Format date for input field (YYYY-MM-DD)
    const formattedDate = pkg.departureDate ? new Date(pkg.departureDate).toISOString().split('T')[0] : ''
    
    setPackageForm({
      name: pkg.name,
      days: pkg.days,
      cost: pkg.cost,
      departure: pkg.departure,
      departureDate: formattedDate,
      image: pkg.image || ''
    })
    setImagePreview(pkg.image || null)
    setIsEditMode(true)
    setEditingPackageId(pkg._id)
    setActiveTab('addPackage')
  }

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditMode(false)
    setEditingPackageId(null)
    setImagePreview(null)
    setPackageForm({
      name: '',
      days: '',
      cost: '',
      departure: '',
      departureDate: '',
      image: ''
    })
  }

  // Delete package
  const handleDeletePackage = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`http://localhost:5500/api/user/deletepackage/${id}`)
        alert('Package deleted successfully!')
        fetchPackages()
      } catch (error) {
        console.error('Error deleting package:', error)
        alert('Error deleting package')
      }
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    fetchContactForms()
    fetchPackages()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Al-Hateem Admin
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                📊 Manage your packages and contact forms efficiently
              </p>
            </div>
            
            {time && (
              <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-lg border border-green-200">
                {time}
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-green-800">Admin</span>
              </div>
              <Link
                to="/"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">Contact Forms</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{contactForms.length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">Total Packages</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{packages.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">Active Tab</p>
                <p className="text-3xl font-bold text-gray-800 mt-1 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Forms ({contactForms.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('managePackages')
                handleCancelEdit()
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'managePackages'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Manage Packages ({packages.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('addPackage')
                if (!isEditMode) handleCancelEdit()
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'addPackage'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isEditMode ? '✏️ Edit Package' : '➕ Add Package'}
            </button>
          </div>
        </div>

        {/* Add/Edit Package Tab */}
      {activeTab === 'addPackage' && (
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {isEditMode ? '✏️ Edit Package' : '➕ Create New Package'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">Fill in the details below</p>
            </div>
            {isEditMode && (
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            )}
          </div>
          <form onSubmit={handlePackageSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-green-600">📦</span> Package Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={packageForm.name}
                onChange={handlePackageChange}
                placeholder="e.g., Umrah Special Package"
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="days" className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">📅</span> Duration (Days)
                </label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  value={packageForm.days}
                  onChange={handlePackageChange}
                  placeholder="e.g., 14"
                  required
                  min="1"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300"
                />
              </div>

              <div className="relative">
                <label htmlFor="cost" className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="text-yellow-600">💰</span> Cost
                </label>
                <input
                  type="text"
                  id="cost"
                  name="cost"
                  value={packageForm.cost}
                  onChange={handlePackageChange}
                  placeholder="e.g., $2,500"
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="departure" className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-red-600">✈️</span> Departure City
              </label>
              <input
                type="text"
                id="departure"
                name="departure"
                value={packageForm.departure}
                onChange={handlePackageChange}
                placeholder="e.g., New York, USA"
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300"
              />
            </div>

            <div className="relative">
              <label htmlFor="departureDate" className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-purple-600">📆</span> Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={packageForm.departureDate}
                onChange={handlePackageChange}
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300"
              />
            </div>

            {/* Image Upload Field */}
            <div className="relative">
              <label className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-pink-600">🖼️</span> Package Image
              </label>
              
              {!imagePreview ? (
                <div className="relative">
                  <input
                    type="file"
                    id="packageImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="packageImage"
                    className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600 font-semibold">Click to upload image</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById('packageImage').click()}
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              {isEditMode ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Package
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Package
                </>
              )}
            </button>
          </form>
        </div>
      )}

        {/* Manage Packages Tab */}
        {activeTab === 'managePackages' && (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                📦 All Packages
              </h2>
              <button
                onClick={fetchPackages}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            {packages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-gray-600 text-xl mb-6">No packages found.</p>
                <button
                  onClick={() => setActiveTab('addPackage')}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your First Package
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="bg-white shadow-xl rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Package Image */}
                    {pkg.image ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
                          <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-500 p-4">
                          <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⏱️</span>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">{pkg.days}</span> days
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💰</span>
                        <p className="text-gray-700">
                          <span className="font-semibold text-green-600 text-lg">{pkg.cost}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✈️</span>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">{pkg.departure}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📅</span>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">
                            {pkg.departureDate ? new Date(pkg.departureDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'TBA'}
                          </span>
                        </p>
                      </div>
                    </div>
                    </div>
                    <div className="flex gap-3 p-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📧 Contact Forms
              </h2>
              <button
                onClick={fetchContactForms}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            {contactForms.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-xl">No contact forms found.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {contactForms.map((form) => (
                  <div key={form._id} className="bg-white shadow-xl rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                          {form.fName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {form.fName}
                          </h3>
                          <p className="text-sm text-gray-500">ID: #{form._id.slice(-8)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteContactForm(form._id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <label className="block text-sm font-semibold text-blue-800 mb-1">👤 Name</label>
                        <p className="text-gray-900 font-medium">{form.fName}</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-xl">
                        <label className="block text-sm font-semibold text-green-800 mb-1">📱 Phone</label>
                        <p className="text-gray-900 font-medium">{form.phone}</p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-xl">
                        <label className="block text-sm font-semibold text-purple-800 mb-1">🏙️ City</label>
                        <p className="text-gray-900 font-medium">{form.city || 'Not provided'}</p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <label className="block text-sm font-semibold text-orange-800 mb-1">📅 Submitted</label>
                        <p className="text-gray-900 font-medium text-sm">
                          {new Date(form.created).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin