import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to <strong>AI & Blockchain-Based Freelancing Platform</strong>, the next-generation
          freelancing marketplace powered by <strong>Artificial Intelligence</strong> and
          <strong> Blockchain Technology</strong>.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          Our goal is to empower freelancers and businesses through AI-driven smart matching
          and blockchain-based smart contracts. We ensure secure transactions, transparency,
          and efficiency like never before.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>
        <ul className="text-gray-600 text-left mb-6 list-disc list-inside">
          <li><strong>AI-Powered Matching</strong> – Find the best projects or freelancers effortlessly.</li>
          <li><strong>Blockchain-Based Contracts</strong> – Ensuring secure and transparent transactions.</li>
          <li><strong>Decentralized & Transparent</strong> – No middlemen, no hidden fees.</li>
          <li><strong>Escrow Protection</strong> – Secure payments held and released upon project completion.</li>
        </ul>

        <p className="text-lg font-semibold text-gray-700">Join us in redefining the freelancing industry with cutting-edge technology! 🚀</p>
      </div>
    </div>
  );
};

export default AboutPage;
