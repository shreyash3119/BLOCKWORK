import React from "react";
import { HandCoins, FileCheck, Bitcoin, Users, Star, Clock } from "lucide-react";

const features = [
  {
    icon: <HandCoins size={48} className="text-green-600" />,
    title: "Low fees",
    description:
      "Our decentralized freelance market ecosystem lowers fees by directly connecting Clients and Freelancers P2P. By skipping 3rd party fees, Clients and Freelancers pay only up to 3%.",
  },
  {
    icon: <FileCheck size={48} className="text-green-600" />,
    title: "Escrow",
    description:
      "With escrow, Freelancers have the guarantee of payment for their services, while the Client’s funds are safe until the Freelancer produces the expected work.",
  },
  {
    icon: <Bitcoin size={48} className="text-green-600" />,
    title: "Option of paying with crypto",
    description:
      "Building a global community with an option to use global currency, we create better economic opportunities for Clients and Freelancers from all over the world.",
  },
  {
    icon: <Users size={48} className="text-green-600" />,
    title: "Strong Community",
    description:
      "We have a thriving community of professionals and clients, ensuring a seamless experience with support and collaboration.",
  },
  {
    icon: <Star size={48} className="text-green-600" />,
    title: "Verified Reviews",
    description:
      "We ensure transparency with verified freelancer reviews, so clients can make informed hiring decisions.",
  },
  {
    icon: <Clock size={48} className="text-green-600" />,
    title: "On-Time Payments",
    description:
      "With our secure payment system, freelancers receive their payments on time without delays or disputes.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Why Us</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
