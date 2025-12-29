import React from "react";

const FooterAdmin = () => {


    return (
        <footer className="bg-[#001F5C] text-white p-6 mt-24">

            {/* Footer content in one row */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Left: Company Info */}
                <div className="flex-shrink-0">
                    <span className="font-semibold">© 2025 YourCompany. All rights reserved.</span>
                </div>

                {/* Center: Quick Links */}
                <div className="flex gap-6">
                    <a href="#" className="hover:text-blue-400 text-lg">Help</a>
                    <a href="#" className="hover:text-blue-400 text-lg">Settings</a>
                    <a href="#" className="hover:text-blue-400 text-lg">Privacy</a>
                </div>

                {/* Right: Stats */}
                <div className="flex gap-4">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shaheer.kas08@gmail.com&su=Dashboard%20Query&body=Hi%20Supervisor,"
                        target="_blank"
                        rel="noopener noreferrer" className="hover:text-blue-400 font-medium">Contact Admin</a>
                </div>

            </div>
        </footer>

    );
};

export default FooterAdmin;
