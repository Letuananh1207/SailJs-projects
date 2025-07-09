module.exports = {
  attributes: {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    username: { type: "string", required: true },
    role: { type: "json", defaultsTo: ["view"] },
  },
};
