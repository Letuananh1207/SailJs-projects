module.exports = {
  attributes: {
    pageName: { type: "string", required: true },
    buttons: { type: "json", columnType: "array", defaultsTo: [] },
    form: { type: "json", columnType: "object" },
    table: { type: "json", columnType: "object" },
  },
};
