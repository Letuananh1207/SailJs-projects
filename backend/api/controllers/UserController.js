module.exports = {
  // GET /api/users
  find: async function (req, res) {
    try {
      const users = await User.find(); // role giờ là json, không cần populate
      return res.json(users);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách user:", err);
      return res.status(500).json({ msg: "Lỗi server" });
    }
  },

  // PUT /api/users/:id/permissions
  updatePermissions: async function (req, res) {
    try {
      const userId = req.params.id;
      const { role } = req.body;

      if (!Array.isArray(role)) {
        return res.status(400).json({ msg: "Trường 'role' phải là mảng" });
      }

      // Kiểm tra dữ liệu hợp lệ (optional)
      const isValid = role.every(
        (r) =>
          typeof r.resource === "string" &&
          Array.isArray(r.permission) &&
          r.permission.every((p) =>
            ["create", "read", "update", "delete"].includes(p)
          )
      );

      if (!isValid) {
        return res.status(400).json({ msg: "Cấu trúc quyền không hợp lệ" });
      }

      const user = await User.updateOne({ id: userId }).set({ role });
      return res.json({ msg: "Cập nhật quyền thành công", user });
    } catch (err) {
      console.error("Lỗi khi cập nhật quyền:", err);
      return res.status(500).json({ msg: "Lỗi server" });
    }
  },

  removePermission: async function (req, res) {
    try {
      const userId = req.params.id;
      const resourceToRemove = req.params.resource;

      const user = await User.findOne({ id: userId });
      if (!user) return res.status(404).json({ msg: "User không tồn tại" });

      const updatedRole = (user.role || []).filter(
        (r) => r.resource !== resourceToRemove
      );

      const updated = await User.updateOne({ id: userId }).set({
        role: updatedRole,
      });

      return res.json({ msg: "Đã xóa quyền thành công", user: updated });
    } catch (err) {
      console.error("Lỗi khi xóa quyền:", err);
      return res.status(500).json({ msg: "Lỗi server" });
    }
  },
};
