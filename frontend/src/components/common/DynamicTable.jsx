// File: src/components/DynamicTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function DynamicTable({ config }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (config?.api) {
      axios.get(config.api).then((res) => setData(res.data));
    }
  }, [config]);

  return (
    <table className="border w-full mt-4">
      <thead>
        <tr>
          {config.columns.map((col) => (
            <th key={col.field} className="border p-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {config.columns.map((col) => (
              <td key={col.field} className="border p-2">
                {item[col.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;
