/**
 * UrlInput component.
 *
 * Renders an input field to enter a URL and a button.
 * Clicking the button shows an alert.
 *
 * Props:
 * - None
 */
"use client";

import React from "react";

interface UrlInputProps {
  // Props, if any
}

const UrlInput: React.FC<UrlInputProps> = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
        Enter URL:
      </label>
      <input
        type="text"
        id="url"
        name="url"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder="https://www.example.com"
      />
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleClick}
      >
        Click Me
      </button>
    </div>
  );
};

export default UrlInput;
