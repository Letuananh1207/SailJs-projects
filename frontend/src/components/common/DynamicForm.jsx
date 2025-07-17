// File: src/components/DynamicForm.jsx
import React, { useState } from "react";
import axios from "axios";

function DynamicForm({ config, onSubmitted }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (config?.submitApi) {
      await axios({
        method: config.method || "POST",
        url: config.submitApi,
        data: formData,
      });
      onSubmitted?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {config.fields.map((field) => (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Lưu
      </button>
    </form>
  );
}

export default DynamicForm;
