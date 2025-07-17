module.exports = {
  // GET /api/page-config
  // GET /api/page-config
  get: async function (req, res) {
    try {
      const configList = await PageConfig.find().select(["id", "pageName"]);
      return res.json(configList);
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching configs",
        error: err,
      });
    }
  },

  // GET /api/page-config/:id
  findOne: async function (req, res) {
    try {
      const config = await PageConfig.findOne({ id: req.params.id });
      if (!config) {
        return res.status(404).json({ message: "Config not found" });
      }
      return res.json(config);
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  // POST /api/page-config
  create: async function (req, res) {
    try {
      const created = await PageConfig.create(req.body).fetch();
      return res.json(created);
    } catch (err) {
      return res.status(400).json({ message: "Create failed", error: err });
    }
  },

  // PUT /api/page-config/:id
  update: async function (req, res) {
    try {
      const updated = await PageConfig.updateOne({ id: req.params.id }).set(
        req.body
      );
      if (!updated) {
        return res.status(404).json({ message: "Config not found to update" });
      }
      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ message: "Update failed", error: err });
    }
  },

  // GET /api/page-config/all (lấy toàn bộ page config)
  getAll: async function (req, res) {
    try {
      const all = await PageConfig.find();
      return res.json(all);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error fetching configs", error: err });
    }
  },
};
