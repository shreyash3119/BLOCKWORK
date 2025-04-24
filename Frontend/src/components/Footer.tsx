export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white py-6">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 text-sm">
                    <div>
                        <h3 className="font-semibold">About Us</h3>
                        <ul className="space-y-2 mt-2">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Feedback</a></li>
                            <li><a href="#" className="hover:underline">Trust, Safety & Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Help & Support</h3>
                        <ul className="space-y-2 mt-2">
                            <li><a href="#" className="hover:underline">Help & Support</a></li>
                            <li><a href="#" className="hover:underline">Upwork Foundation</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Privacy</h3>
                        <ul className="space-y-2 mt-2">
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">CA Notice at Collection</a></li>
                            <li><a href="#" className="hover:underline">Cookie Settings</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">More</h3>
                        <ul className="space-y-2 mt-2">
                            <li><a href="#" className="hover:underline">Accessibility</a></li>
                            <li><a href="#" className="hover:underline">Desktop App</a></li>
                            <li><a href="#" className="hover:underline">Enterprise Solutions</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 mt-6 pt-4">
                    <div className="flex space-x-4">
                        <a href="#" className="hover:opacity-75"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="hover:opacity-75"><i className="fab fa-linkedin"></i></a>
                        <a href="#" className="hover:opacity-75"><i className="fab fa-x-twitter"></i></a>
                        <a href="#" className="hover:opacity-75"><i className="fab fa-youtube"></i></a>
                        <a href="#" className="hover:opacity-75"><i className="fab fa-instagram"></i></a>
                    </div>
                    <div className="text-sm mt-4 md:mt-0">&copy; 2025 FreelanceAI. All rights reserved.</div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#"><i className="fab fa-apple"></i></a>
                        <a href="#"><i className="fab fa-android"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
