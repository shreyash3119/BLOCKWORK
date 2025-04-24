// Messages.jsx

import { Search } from 'lucide-react';

const Messages = () => {
  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-2xl">•••</span>
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
        <div className="text-gray-400 text-sm text-center mt-10">
          Conversations will appear here
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <img
          src="/message2.jpg" // replace with your local image or use illustration component
          alt="Messages Illustration"
          className="w-90 mb-6"
        />
        <h2 className="text-xl font-semibold mb-2">Welcome to Messages</h2>
        <p className="text-gray-500 mb-4">
          Once you connect with a client, you'll be able to chat and collaborate here
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          Search for jobs
        </button>
      </div>
    </div>
  );
};

export default Messages;
