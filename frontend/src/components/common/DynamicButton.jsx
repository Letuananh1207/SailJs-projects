// File: src/components/DynamicButton.jsx
import React from "react";

function DynamicButton({ buttonConfig, onAction }) {
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded mr-2"
      onClick={() => onAction(buttonConfig.action)}
    >
      {buttonConfig.label}
    </button>
  );
}

export default DynamicButton;
