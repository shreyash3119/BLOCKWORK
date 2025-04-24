  import React, { useState } from "react";
  import {
    Routes,
    Route,
    Navigate,
    useLocation, 
    useNavigate,
  } from "react-router-dom";

  import LoginModal from "./components/LoginModal";
  import Navbar from "./components/Navbar";
  import SignUpModal from "./components/SignUpModal";

  import AboutPage from "./pages/AboutPage";
  import ClientLayout from "./pages/Client/ClientLayout";
  import ClientDashboard from "./pages/ClientDashboard";
  import SmartSourcing from "./pages/Client/SmartSourcing";
  import Analytics from "./pages/Client/analytics";
  import ConnectClient from "./pages/Client/ConnectC";
  import InterviewPage from "./pages/Client/InterviewPage";
  import CurrentClient from "./pages/Client/CurrentClient";
  import PastClient from "./pages/Client/PastClient";
  import UrgentBrowse from "./pages/Client/UrgentBrowse";
  import UrgentMyProjects from "./pages/Client/UrgentMyProjects";
  import NewlancerHubBrowse from "./pages/Client/NewlancerHubBrowse";
  import NewlancerHubProjects from "./pages/Client/NewlancerHubProjects";
  import Client_tasklist from "./pages/Client/Clienttasklist";
  import Files from "./pages/Client/Files";

  import FreelancerLayout from "./pages/Freelancer/FreelancerLayout";
  import FreelancerDashboard from "./pages/FreelancerDashboard";
  import Browse from "./pages/Freelancer/Browse";
  import ConnectFreelancer from "./pages/Freelancer/ConnectF";
  import Contest from "./pages/Freelancer/Contest";
  import CurrentProjects from "./pages/Freelancer/CurrentProjects";
  import Messages from "./pages/Freelancer/Messages";
  import PastProjects from "./pages/Freelancer/PastProjects";
  import Tasklists from "./pages/Freelancer/Tasklists";
  import Urgent from "./pages/Freelancer/Urgent";
  import Profile from "./pages/Profile";

  import HomePage from "./pages/HomePage";
  import TestBackend from './pages/TestBackend';

  const DashboardLayout: React.FC<{
    children: React.ReactNode;
    userRole: "client" | "freelancer";
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    onLogout: () => void;
  }> = ({ children, userRole, darkMode, setDarkMode, onLogout }) => {
    if (userRole === "freelancer") {
      return (
        <FreelancerLayout darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout}>
          {children}
        </FreelancerLayout>
      );
    }

    return (
      <ClientLayout darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout}>
        {children}
      </ClientLayout>
    );
  };

  // ... (imports stay the same)

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [userRole, setUserRole] = useState<"client" | "freelancer" | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.includes("dashboard");

  const handleLogout = () => {
    setUserRole(null);
    navigate("/");
  };

  const handleLogin = (role: "client" | "freelancer") => {
    setUserRole(role);
    setIsLoginOpen(false);
    navigate(role === "client" ? "/client-dashboard" : "/freelancer-dashboard");
  };

  const handleSignUp = (role: "client" | "freelancer") => {
    setUserRole(role);
    setIsSignUpOpen(false);
    navigate(role === "client" ? "/client-dashboard" : "/freelancer-dashboard");
  };

  return (
    <>
      {!isDashboard && !userRole && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLoginClick={() => setIsLoginOpen(true)}
          onSignUpClick={() => setIsSignUpOpen(true)}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} onLoginClick={() => setIsLoginOpen(true)} onSignUpClick={() => setIsSignUpOpen(true)} />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Client Routes */}
        <Route path="/client-dashboard" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><ClientDashboard /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/smart-sourcing" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><SmartSourcing /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/analytics" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Analytics /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/connect" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><ConnectClient /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/interview" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><InterviewPage /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/currentclient" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><CurrentClient /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/pastclient" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><PastClient /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/urgentbrowse" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><UrgentBrowse /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/urgentmyprojects" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><UrgentMyProjects /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/newproject" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><NewlancerHubProjects /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/newbrowse" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><NewlancerHubBrowse /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/tasklists" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Client_tasklist /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/files" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Files /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/client/profile" element={userRole === "client" ? <DashboardLayout userRole="client" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Profile /></DashboardLayout> : <Navigate to="/" />} />

        {/* Freelancer Routes */}
        <Route path="/freelancer-dashboard" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><FreelancerDashboard /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/browse" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Browse /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/connectF" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><ConnectFreelancer /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/urgent" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Urgent /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/projects/past" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><PastProjects /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/tasklists" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Tasklists /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/current-projects" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><CurrentProjects /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/connect/messages" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Messages /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/contest" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Contest /></DashboardLayout> : <Navigate to="/" />} />
        <Route path="/freelancer/profile" element={userRole === "freelancer" ? <DashboardLayout userRole="freelancer" darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}><Profile /></DashboardLayout> : <Navigate to="/" />} />

        {/* Test Backend */}
        <Route path="/test-backend" element={<TestBackend />} />
      </Routes>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} onSignUp={handleSignUp} />
    </>
  );
};

export default App;
