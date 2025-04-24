import React, { useState } from 'react';

import {
  Bell,
  ChevronDown,
  Calendar,
  CircleAlert,
  Download,
  Filter,
  HelpCircle,
  List,
  Mail,
  Star,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";

const AnalyticsOverview = () => {
  const [dateRange, setDateRange] = useState('01/04/2025 – 18/04/2025');
  const [showSavedViews, setShowSavedViews] = useState(false);

  const analyticsData = {
    sponsoredJobs: 0.00,
    smartSourcing: 0.00,
    interviews: 0.00,
    employerBranding: 0.00,
    total: 0.00
  };

  return (
    <div className="p-6 flex-1">
      
    
      <div className="bg-white rounded-lg shadow mt-4">
        {/* Header Section */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Analytics overview</h1>
              <button className="ml-2 text-blue-600 text-sm">Copy link</button>
            </div>
           
            <div className="flex items-center space-x-4">
              <div className="border rounded-lg p-2">
                <div className="text-sm text-gray-600">Date range</div>
                <div className="flex items-center">
                  <span>{dateRange}</span>
                  <Calendar className="ml-2 w-5 h-5" />
                </div>
              </div>
              
              <button className="flex items-center text-blue-600">
                <HelpCircle className="w-5 h-5 mr-2" />
                Compare to date range
              </button>
            </div>
          </div>

          <p className="text-gray-500 mt-1">Monitor and analyse performance to optimise your spend across products</p>
          
          <div className="flex justify-end mt-4">
            <div className="flex items-center border rounded-lg p-2">
              <span className="mr-2">Is this page helpful?</span>
              <button className="text-gray-500 hover:text-blue-600">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="text-gray-500 hover:text-blue-600 ml-2">
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gray-50 p-4 flex justify-end space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            New
            <HelpCircle className="w-4 h-4 ml-1" />
          </button>
          
          <div className="relative">
            <button 
              className="border bg-white px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowSavedViews(!showSavedViews)}
            >
              Saved views
              <svg 
                className={`w-4 h-4 ml-2 transform ${showSavedViews ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSavedViews && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <div className="p-2">No saved views</div>
              </div>
            )}
          </div>
        </div>

        {/* Spend Snapshot Section */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Spend snapshot</h2>
            <div className="flex space-x-2">
              <button className="border p-2 rounded">
                <List className="w-5 h-5" />
              </button>
              <button className="border p-2 rounded">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-500 mb-6">Showing spend for {dateRange}</p>

          <div className="flex flex-col md:flex-row">
            {/* Donut Chart */}
            <div className="flex justify-center items-center mb-6 md:mb-0">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <span className="text-2xl font-bold">₹{analyticsData.total}</span>
                  <span className="text-gray-500">Total</span>
                </div>
              </div>
            </div>
            
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow ml-0 md:ml-8">
              <div className="flex items-start">
                <div className="w-3 h-3 rounded-full bg-blue-800 mt-2 mr-2"></div>
                <div>
                  <div className="flex items-center">
                    <span>Sponsored Jobs</span>
                  </div>
                  <p className="text-xl font-bold">₹{analyticsData.sponsoredJobs}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 mr-2"></div>
                <div>
                  <div className="flex items-center">
                    <span>Smart Sourcing</span>
                    <HelpCircle className="w-4 h-4 ml-1 text-gray-500" />
                  </div>
                  <p className="text-xl font-bold">₹{analyticsData.smartSourcing}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 rounded-full bg-purple-400 mt-2 mr-2"></div>
                <div>
                  <div className="flex items-center">
                    <span>Interviews and events</span>
                  </div>
                  <p className="text-xl font-bold">₹{analyticsData.interviews}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 rounded-full bg-purple-800 mt-2 mr-2"></div>
                <div>
                  <div className="flex items-center">
                    <span>Employer Branding Ads</span>
                  </div>
                  <p className="text-xl font-bold">₹{analyticsData.employerBranding}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <p className="text-gray-500">This is not an invoice. To view your charges, 
            <a href="#/billing" className="text-blue-600 ml-1">go to billing</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;