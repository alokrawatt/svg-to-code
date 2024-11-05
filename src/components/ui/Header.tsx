"use client"; // Ensure this is a client component

import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold">SVG to Code Converter</h1>
            <p>Convert your SVG files to code effortlessly!</p>
        </header>
    );
};

export default Header; 