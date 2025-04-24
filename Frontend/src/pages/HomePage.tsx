import CategoryBlocks from "../components/CategoryBlocks";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import WhyUs from "../components/WhyUs";
import backgroundImage from "../assets/backgroundImage2.jpg"; // Ensure correct path

interface HomePageProps {
    onLoginClick: () => void;
    onSignUpClick: () => void;
    darkMode: boolean;  // Pass dark mode from App.tsx
}

export default function HomePage({ onLoginClick, onSignUpClick, darkMode }: HomePageProps) {
    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            
            {/* Hero Section */}
            <header 
                className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Background Overlay */}
                <div className={`absolute inset-0 ${darkMode ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50"}`}></div>  

                {/* Header Text */}
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white">AI & Blockchain-Powered Freelancing</h2>
                    <p className="text-lg mt-4 text-gray-300">Secure, Transparent, and Fair Marketplace</p>
                    <Button 
                        className="mt-6 px-6 py-2 text-lg bg-blue-600 text-white rounded-xl" 
                        onClick={onSignUpClick}
                    >
                        Get Started
                    </Button>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                    { 
                        title: "AI Arbitration", 
                        desc: "Our AI-driven arbitration system ensures unbiased, fast, and accurate dispute resolution." 
                    },
                    { 
                        title: "Blockchain Payments", 
                        desc: "Secure blockchain-based escrow payments protect both clients and freelancers." 
                    },
                    { 
                        title: "Fair Pricing", 
                        desc: "AI-driven pricing ensures transparent, fair compensation based on experience and skill." 
                    }
                ].map((feature, index) => (
                    <div key={index} className="p-6 shadow-lg rounded-lg bg-gray-200 dark:bg-gray-700">
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Categories Section */}
            <section id="categories" className="py-12 px-6">
                <CategoryBlocks />
            </section>

            <WhyUs />
            <Footer />
        </div>
    );
}
