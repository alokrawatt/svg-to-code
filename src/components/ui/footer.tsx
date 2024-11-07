"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react'; // Updated icon import

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 mt-8 flex justify-center">
          
                <Link href="https://github.com/alokrawatt/svg-to-code" target="_blank" rel="noopener noreferrer">
                    <button className="bg-gray-600 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition flex items-center mr-2">
                        <Github className="mr-1" />
                    </button>
                </Link>

                <Link href="https://x.com/alokrawatt" target="_blank" rel="noopener noreferrer">
                    <button className="bg-gray-600 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition flex items-center">
                        <Twitter className="mr-1" />
                    </button>
                </Link>
        
        </footer>
    );
};

export default Footer;
