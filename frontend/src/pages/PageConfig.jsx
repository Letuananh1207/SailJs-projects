import { useState } from "react";

function PageConfig() {
  const [configs, setConfigs] = useState([
    {
      key: "form",
      config: {
        formFields: [
          { label: "Họ tên", name: "fullName", type: "text" },
          { label: "Email", name: "email", type: "email" },
        ],
        api: "https://httpbin.org/post",
      },
    },
    {
      key: "table",
      config: {
        tableColumns: [
          { header: "Tên", accessor: "name" },
          { header: "Tuổi", accessor: "age" },
        ],
        tableData: [
          { name: "Nguyễn Văn A", age: 25 },
          { name: "Trần Thị B", age: 30 },
        ],
        tableActions: [],
      },
    },
    {
      key: "button",
      config: {
        buttons: [
          { label: "Gửi", api: "https://httpbin.org/post" },
          { label: "Hủy", api: "https://httpbin.org/delete" },
        ],
      },
    },
  ]);

  const [activeTab, setActiveTab] = useState("form");

  const currentConfigObj = configs.find((item) => item.key === activeTab);
  if (!currentConfigObj) return null;

  const updateCurrentConfig = (newSubConfig) => {
    const newConfigs = configs.map((item) =>
      item.key === activeTab ? { ...item, config: newSubConfig } : item
    );
    setConfigs(newConfigs);
  };

  const handleSave = () => {
    alert("Đã lưu cấu hình!");
    console.log("Cấu hình hiện tại:", configs);
  };

  const { config } = currentConfigObj;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar chọn loại cấu hình */}
      <div style={{ width: "200px", background: "#f0f0f0", padding: "1rem" }}>
        <h3>Cấu hình</h3>
        {configs.map(({ key }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "6px",
              padding: "6px 8px",
              fontSize: "14px",
              backgroundColor: activeTab === key ? "#d0d0d0" : "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Nội dung chỉnh sửa */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <h2>Chỉnh sửa: {activeTab.toUpperCase()}</h2>

        {"api" in config && (
          <div style={{ marginBottom: "1rem" }}>
            <label>API Endpoint:</label>
            <input
              type="text"
              value={config.api || ""}
              onChange={(e) =>
                updateCurrentConfig({ ...config, api: e.target.value })
              }
              style={{ width: "100%" }}
              placeholder="https://api.example.com"
            />
          </div>
        )}

        {"formFields" in config && (
          <div>
            <h3>Form Fields</h3>
            {config.formFields.map((field, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
              >
                <input
                  placeholder="label"
                  value={field.label}
                  onChange={(e) => {
                    const updated = [...config.formFields];
                    updated[idx].label = e.target.value;
                    updateCurrentConfig({ ...config, formFields: updated });
                  }}
                />
                <input
                  placeholder="name"
                  value={field.name}
                  onChange={(e) => {
                    const updated = [...config.formFields];
                    updated[idx].name = e.target.value;
                    updateCurrentConfig({ ...config, formFields: updated });
                  }}
                />
                <input
                  placeholder="type"
                  value={field.type}
                  onChange={(e) => {
                    const updated = [...config.formFields];
                    updated[idx].type = e.target.value;
                    updateCurrentConfig({ ...config, formFields: updated });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {"tableColumns" in config && (
          <div>
            <h3>Table Columns</h3>
            {config.tableColumns.map((col, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
              >
                <input
                  placeholder="header"
                  value={col.header}
                  onChange={(e) => {
                    const updated = [...config.tableColumns];
                    updated[idx].header = e.target.value;
                    updateCurrentConfig({ ...config, tableColumns: updated });
                  }}
                />
                <input
                  placeholder="accessor"
                  value={col.accessor}
                  onChange={(e) => {
                    const updated = [...config.tableColumns];
                    updated[idx].accessor = e.target.value;
                    updateCurrentConfig({ ...config, tableColumns: updated });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {"buttons" in config && (
          <div>
            <h3>Buttons</h3>
            {config.buttons.map((btn, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
              >
                <input
                  placeholder="label"
                  value={btn.label}
                  onChange={(e) => {
                    const updated = [...config.buttons];
                    updated[idx].label = e.target.value;
                    updateCurrentConfig({ ...config, buttons: updated });
                  }}
                />
                <input
                  placeholder="api"
                  value={btn.api}
                  onChange={(e) => {
                    const updated = [...config.buttons];
                    updated[idx].api = e.target.value;
                    updateCurrentConfig({ ...config, buttons: updated });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <button onClick={handleSave}>💾 Lưu cấu hình</button>
        </div>
      </div>
    </div>
  );
}

export default PageConfig;
