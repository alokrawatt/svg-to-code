import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-3xl font-bold text-center">SVG to Code Converter</h1>
            <p className="text-center">Convert your SVG files to code effortlessly!</p>
            <nav className="flex justify-center mt-4">
                <Link href="/contact">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition">
                        Contact Us
                    </button>
                </Link>
                <Link href="/feedback" className="ml-4">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition">
                        Feedback
                    </button>
                </Link>
            </nav>
        </header>
    );
};

export default Header; 