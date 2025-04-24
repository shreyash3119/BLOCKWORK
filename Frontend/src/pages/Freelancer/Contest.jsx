import React from "react";

const featuredContests = [
  {
    title: "Weekly Contest 291",
    date: "Ended May 1, 2022",
    image: "/contest1.png", // Public folder reference
  },
  {
    title: "Weekly Contest 290",
    date: "Ended Apr 24, 2022",
    image: "/contest2.png",
  },
  {
    title: "Biweekly Contest 85",
    date: "Ended Aug 20, 2022",
    image: "/contest3.png",
  },
];

const pastContests = [
  { title: "Weekly Contest 445", date: "Apr 13, 2025 8:00 AM GMT+5:30" },
  { title: "Biweekly Contest 154", date: "Apr 12, 2025 8:00 PM GMT+5:30" },
  { title: "Weekly Contest 444", date: "Apr 6, 2025 8:00 AM GMT+5:30" },
  { title: "Weekly Contest 443", date: "Mar 30, 2025 8:00 AM GMT+5:30" },
];

const leaderboard = [
  { name: "Miruu", rating: 3703, attended: 26, avatar: "https://i.imgur.com/4M34hi2.png" },
  { name: "Neal Wu", rating: 3686, attended: 51, avatar: "https://i.imgur.com/1ZQZ1Zm.png" },
  { name: "Yawn Sean", rating: 3645, attended: 84, avatar: "https://i.imgur.com/MnN9HJD.png" },
];

const Contest = () => {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Featured Contests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {featuredContests.map((contest, idx) => (
          <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md border">
            <img src={contest.image} alt={contest.title} className="w-full h-36 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{contest.title}</h2>
              <p className="text-sm text-gray-500">{contest.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Past Contests */}
        <div className="bg-white rounded-lg p-4 shadow-md border flex-1">
          <div className="flex gap-4 mb-4">
            <button className="text-gray-800 font-semibold">Past Contests</button>
            <button className="text-gray-500 hover:text-gray-800">My Contests</button>
          </div>
          <div className="space-y-4">
            {pastContests.map((contest, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div>
                  <p className="font-semibold">{contest.title}</p>
                  <p className="text-sm text-gray-500">{contest.date}</p>
                </div>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Virtual</span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="bg-white rounded-lg p-4 shadow-md border w-full lg:w-80">
          <h2 className="font-semibold text-xl mb-4">🌍 Global Ranking</h2>
          <ol className="space-y-3">
            {leaderboard.map((user, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="text-lg font-bold w-6">{idx + 1}</span>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-500">
                    Rating: {user.rating} • Attended: {user.attended}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Contest;
