"use client";

import React from 'react';
import Link from 'next/link';

interface FooterProps {
    onCopyDValues: () => void; // Function to copy "d" values
}

const Footer: React.FC<FooterProps> = ({ onCopyDValues }) => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <p className="text-center">© 2023 Your Company Name. All rights reserved.</p>
            <div className="flex justify-center mt-4">
                <Link href="/contact">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-2">
                        Contact Us
                    </button>
                </Link>
                <Link href="/feedback">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-2">
                        Feedback
                    </button>
                </Link>
                <button 
                    onClick={onCopyDValues} 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-2"
                >
                    Copy SVG Code
                </button>
            </div>
        </footer>
    );
};

export default Footer; 