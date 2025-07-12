// api/models/User.js
module.exports = {
  attributes: {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    username: { type: "string", required: true },

    // Mảng quyền theo resource
    role: {
      type: "json", // mỗi phần tử là { resource, permission }
      defaultsTo: [],
    },
  },
};
