import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  FolderKanban,
  ListTodo,
  Mic,
  MessageCircle,
  MessageSquareHeart,
  UserPlus,
  Search,
  Zap,
  Trophy,
  LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
};

const FreelancerNavbar: React.FC<Props> = ({ onLogout }) => {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="w-[220px] min-h-screen bg-blue-900 text-white flex flex-col">
      <div className="p-4 text-lg font-semibold border-b border-blue-700">
        Freelancer Menu
      </div>

      <nav className="flex-1">
        {/* Browse */}
        <Link
          to="/freelancer/browse"
          className="p-4 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <Search size={18} />
          <span>Browse</span>
        </Link>

        {/* My Projects Dropdown */}
        <div className="border-b border-blue-700">
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className="flex items-center justify-between w-full p-4 hover:bg-blue-700"
          >
            <div className="flex items-center gap-2">
              <FolderKanban size={18} />
              <span>My Projects</span>
            </div>
            {projectsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {projectsOpen && (
            <div className="pl-6 pr-2 pb-2 flex flex-col gap-2 text-sm">
              <Link
                to="/freelancer/current-projects"
                className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Current</span>
              </Link>
              <Link
                to="/freelancer/projects/past"
                className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded cursor-pointer"
              >
                <MessageSquareHeart size={16} />
                <span>Past</span>
              </Link>
            </div>
          )}
        </div>

        {/* Tasklist */}
        <Link
          to="/freelancer/tasklists"
          className="p-4 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <ListTodo size={18} />
          <span>Tasklist</span>
        </Link>
        {/* Tasklist */}
        <Link
          to="/freelancer/ConnectF"
          className="p-4 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <MessageSquareHeart size={18} />
          <span>Connect</span>
        </Link>

        {/* Connect Dropdown
        <div className="border-b border-blue-700">
          <button
            onClick={() => setConnectOpen(!connectOpen)}
            className="flex items-center justify-between w-full p-4 hover:bg-blue-700"
          >
            <div className="flex items-center gap-2">
              <MessageSquareHeart size={18} />
              <span>Connect</span>
            </div>
            {connectOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {connectOpen && (
            <div className="pl-6 pr-2 pb-2 flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded cursor-pointer">
                <Mic size={16} />
                <span>Voice Chat</span>
              </div>
              <div className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded cursor-pointer">
                <MessageCircle size={16} />
                <span>Message</span>
              </div>
              <div className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded cursor-pointer">
                <MessageSquareHeart size={16} />
                <span>Discord</span>
              </div>
              <div className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded cursor-pointer">
                <UserPlus size={16} />
                <span>Connection Request</span>
              </div>
            </div>
          )}
        </div> */}

        {/* Urgent */}
        <Link
          to="/freelancer/urgent"
          className="p-4 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <Zap size={18} />
          <span>Urgent</span>
        </Link>

        {/* Contests */}
        <Link
          to="/freelancer/contest"
          className="p-4 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <Trophy size={18} />
          <span>Contests</span>
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="p-4 border-t border-blue-700 text-left hover:bg-blue-700 flex items-center gap-2"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default FreelancerNavbar;
