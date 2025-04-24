
import React from "react";


const Browse: React.FC = () => {
  const jobList = [
    {
      title: "Develop crypto wallet, exchange wallet, and blockchain app",
      price: "₹5,800",
      tags: ["bitcoin", "cryptocurrency"],
    },
    {
      title: "7 Android Installs, 5 Star Ratings & Descriptive Reviews",
      price: "₹830",
      tags: ["android", "app promotion"],
    },
    {
      title: "1000 Real Android App Installs",
      price: "₹23,500",
      tags: ["app reviews", "android"],
    },
  ];

  return (
    <div className="p-6 space-y-6">
        
      {/* Search Bar */}
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search projects, clients..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-6">
        {/* Filter Sidebar */}
        <aside className="w-1/5 bg-white p-4 border border-gray-200 rounded-lg shadow text-sm space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Delivery Time</h4>
            <ul className="space-y-1">
              <li><input type="radio" name="delivery" /> Within 1 day</li>
              <li><input type="radio" name="delivery" /> Within 2 days</li>
              <li><input type="radio" name="delivery" /> Within 3 days</li>
              <li><input type="radio" name="delivery" /> Within 4 days</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Freelancer Country</h4>
            <input type="text" placeholder="Enter country" className="w-full p-2 border rounded" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Price</h4>
            <ul className="space-y-1">
              <li><input type="radio" name="price" /> Under $20</li>
              <li><input type="radio" name="price" /> $20 to $50</li>
              <li><input type="radio" name="price" /> $50 to $100</li>
              <li><input type="radio" name="price" /> Over $100</li>
            </ul>
          </div>
        </aside>

        {/* Job Posts */}
        <section className="flex-1 grid grid-cols-2 gap-4">
          {jobList.map((job, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <h4 className="text-md font-semibold">{job.title}</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 font-bold text-green-600">{job.price}</div>
            </div>
          ))}
        </section>

        {/* Earnings Sidebar Placeholder */}
        <aside className="w-1/4 bg-white p-4 border border-gray-200 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Earnings Overview</h3>
          <p className="text-gray-600">Graphical breakdown of your income.</p>
          <div className="mt-4 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Chart Component
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Browse;
