"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex-1 text-center">
                <h1 className="text-3xl font-bold">SVG to Code Converter</h1>
                <p>Convert your SVG files to code effortlessly!</p>
            </div>
            <nav className="flex space-x-4">
                <Link href="/contact">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition">
                        Contact Us
                    </button>
                </Link>
                <Link href="/feedback">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition">
                        Feedback
                    </button>
                </Link>
            </nav>
        </header>
    );
};

export default Header; 