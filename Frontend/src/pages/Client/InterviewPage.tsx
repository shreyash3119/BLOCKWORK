import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CalendarDays, Clock, Briefcase, MapPin, Wallet } from 'lucide-react';

const data = [
  { name: 'Completed', value: 3 },
  { name: 'Upcoming', value: 1 },
];
const COLORS = ['#4ade80', '#60a5fa'];

const InterviewPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6 p-4">
      {/* Interview Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Interview Details</h1>

        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span>Graphic Designer</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-green-500" />
            <span>₹10,000/month</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            <span>Remote</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-yellow-500" />
            <span>Part-time • 1 year exp</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-red-500" />
            <span>10 April 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>10:30 AM</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition">
          Join Interview
        </button>
      </div>

      {/* Chart + Status */}
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Interview Stats</h2>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2" />Completed Interviews: 3</p>
          <p><span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2" />Upcoming Interviews: 1</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
