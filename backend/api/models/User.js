module.exports = {
  attributes: {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    username: { type: "string", required: true },

    // Trường phân quyền
    role: {
      type: "json", // mỗi phần tử là { resource, permission }
      defaultsTo: [],
    },

    // ✅ Trường kiểm tra admin
    isAdmin: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
