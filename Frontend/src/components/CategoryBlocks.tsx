import React from "react";
import { Laptop, Brush, Megaphone, FileText, Video, Cpu, Music, Briefcase, MessagesSquare } from "lucide-react";

const categories = [
  { name: "Programming & Tech", icon: <Laptop size={24} /> },
  { name: "Graphics & Design", icon: <Brush size={24} /> },
  { name: "Digital Marketing", icon: <Megaphone size={24} /> },
  { name: "Writing & Translation", icon: <FileText size={24} /> },
  { name: "Video & Animation", icon: <Video size={24} /> },
  { name: "AI Services", icon: <Cpu size={24} /> },
  { name: "Music & Audio", icon: <Music size={24} /> },
  { name: "Business", icon: <Briefcase size={24} /> },
  { name: "Consulting", icon: <MessagesSquare size={24} /> },
];

export default function CategoryBlocks() {
  return (
    <section id="categories" className="py-20">
      <h2 className="text-2xl font-semibold text-center mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm 
                       bg-white dark:bg-gray-800 cursor-pointer transition 
                       hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-700 
                       hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <div className="text-blue-600 dark:text-blue-400">{category.icon}</div>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
