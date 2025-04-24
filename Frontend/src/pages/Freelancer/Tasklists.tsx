import { ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";


export default function TasklistsPage() {
  return (
    <div className="p-6 space-y-4">
      
      <h1 className="text-2xl font-semibold">@yourUsername's Tasklist</h1>

      <div className="border p-4 rounded-lg bg-white shadow-md flex flex-col items-center justify-center text-center space-y-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9068/9068647.png"
          alt="tasklist"
          className="w-32 h-32"
        />
        <p className="text-gray-600">No tasks yet</p>
        <p className="text-sm text-gray-500">
          Create tasks and assign them to people to help keep your team on track.
        </p>
        <Link
          to="/freelancer/tasks/create"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowRightCircle size={18} /> Start your first task
        </Link>
      </div>
    </div>
  );
}
