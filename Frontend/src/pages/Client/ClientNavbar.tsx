import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  FolderKanban,
  MessageCircle,
  MessageSquareHeart,
  Users,
  Star,
  Video,
  BarChart3,
  LogOut,
  Network,
  ListChecks,
  UserPlus,
  Mic,
  ListTodo,
  AlarmClock,
  FileText,
  Image,
  FileSearch,
  CalendarClock,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
};

{
  /* <Link to="/client/files">Project Files</Link> */
}

const ClientNavbar: React.FC<Props> = ({ onLogout }) => {
  const { pathname } = useLocation();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [urgentOpen, setUrgentOpen] = useState(false);
  const [newLancersOpen, setNewLancersOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const navItemClasses = (activePath: string) =>
    `flex items-center gap-2 px-4 py-3 hover:bg-gray-700 ${
      pathname === activePath ? "bg-gray-700" : ""
    }`;

  return (
    <div className="w-[220px] min-h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-semibold border-b border-gray-700">
        Client Menu
      </div>
      <nav className="flex-1">
        {/* My Projects Dropdown */}
        <div className="border-b border-gray-700">
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className="flex items-center justify-between w-full p-4 hover:bg-gray-700"
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
                to="/client/currentclient"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Current</span>
              </Link>
              <Link
                to="/client/pastclient"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <MessageSquareHeart size={16} />
                <span>Past</span>
              </Link>
            </div>
          )}
        </div>

        {/* Tasklist */}
        <Link
          to="/Client/tasklists"
          className="p-4 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <ListTodo size={18} />
          <span>Tasklist</span>
        </Link>

        {/* Smart Sourcing */}
        <Link
          to="/client/smart-sourcing"
          className={navItemClasses("/client/smart-sourcing")}
        >
          <ClipboardList size={18} />
          <span>Smart Sourcing</span>
        </Link>

        {/* Connect */}
        <Link
          to="/client/connect"
          className="border-b border-gray-700 px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
        >
          <UserPlus size={18} />
          <span>Connect</span>
        </Link>

        {/* Interviews */}
        <div className="border-b border-gray-700">
          <Link
            to="/client/interview"
            className="cursor-pointer hover:bg-gray-700"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <CalendarClock size={18} />
              <span>Interviews</span>
            </div>
          </Link>
        </div>

        {/* Urgent Dropdown */}
        <div className="border-b border-gray-700">
          <button
            onClick={() => setUrgentOpen(!urgentOpen)}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <AlarmClock size={18} />
              <span>Urgent</span>
            </div>
            {urgentOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {urgentOpen && (
            <div className="pl-6 pr-2 pb-2 flex flex-col gap-2 text-sm">
              <Link
                to="/client/urgentmyprojects"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <FolderKanban size={16} />
                <span>My Projects</span>
              </Link>
              <Link
                to="/client/urgentbrowse"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <Network size={16} />
                <span>Browse</span>
              </Link>
            </div>
          )}
        </div>

        {/* NewLancers Hub Dropdown */}
        <div className="border-b border-gray-700">
          <button
            onClick={() => setNewLancersOpen(!newLancersOpen)}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>NewLancers Hub</span>
            </div>
            {newLancersOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {newLancersOpen && (
            <div className="pl-6 pr-2 pb-2 flex flex-col gap-2 text-sm">
              <Link
                to="/client/newproject"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <FolderKanban size={16} />
                <span>My Project</span>
              </Link>
              <Link
                to="/client/newbrowse"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <Network size={16} />
                <span>Browse</span>
              </Link>
            </div>
          )}
        </div>

        {/* AI Arbitor Dropdown */}
        <div className="border-t border-b border-gray-700">
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <FolderKanban size={18} />
              <span>AI Arbitor</span>
            </div>
            {aiOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {aiOpen && (
            <div className="pl-6 pr-2 pb-2 flex flex-col gap-2 text-sm">
              <Link
                to="/client/image-comparator"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <Image size={16} />
                <span>Image Comparator</span>
              </Link>
              <Link
                to="/client/requirement-analyzer"
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <FileSearch size={16} />
                <span>Requirement Analyzer</span>
              </Link>
            </div>
          )}
        </div>

        {/* Analytics */}
        <Link
          to="/client/analytics"
          className={navItemClasses("/client/analytics")}
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </Link>
        <Link
          to="/contract"
          className={navItemClasses("/client/contract")}
        >
          <FileText size={18} />
          <span>Contract</span>
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="p-4 border-t border-gray-700 text-left hover:bg-gray-700 flex items-center gap-2"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ClientNavbar;
