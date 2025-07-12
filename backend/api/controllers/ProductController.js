module.exports = {
  find: async function (req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      return res.status(500).json({ error: "Lỗi server khi lấy sản phẩm" });
    }
  },

  create: async function (req, res) {
    try {
      const { name, price } = req.body;

      if (!name || price == null) {
        return res.status(400).json({ error: "Thiếu tên hoặc giá sản phẩm" });
      }

      const product = await Product.create({ name, price }).fetch();
      const newProducts = await Product.find();
      console.log(`Đã thêm sản phẩm mới: ${JSON.stringify(product)}`);
      return res.status(201).json(newProducts);
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      return res.status(500).json({ error: "Không thể thêm sản phẩm" });
    }
  },

  delete: async function (req, res) {
    try {
      const deleteId = req.params.id;

      const found = await Product.findOne({ id: deleteId }); // ✅ Đổi _id → id
      if (!found) {
        return res
          .status(404)
          .json({ error: "Không tìm thấy sản phẩm để xoá" });
      }

      await Product.destroy({ id: deleteId }); // ✅ Đổi _id → id
      const newProducts = await Product.find();
      console.log(`Đã xóa sản phẩm có ID: ${deleteId}`);
      return res.json(newProducts);
    } catch (err) {
      console.error("Lỗi khi xoá sản phẩm:", err);
      return res.status(500).json({ error: "Không thể xoá sản phẩm" });
    }
  },

  update: async function (req, res) {
    try {
      const updateId = req.params.id;
      const { name, price } = req.body;

      const found = await Product.findOne({ id: updateId }); // ✅ Đổi _id → id
      if (!found) {
        return res
          .status(404)
          .json({ error: "Không tìm thấy sản phẩm để cập nhật" });
      }

      await Product.update({ id: updateId }, { name, price }); // ✅ Đổi _id → id
      const newProducts = await Product.find();
      console.log(
        `Đã cập nhật sản phẩm ID ${updateId} thành: { name: ${name}, price: ${price} }`
      );
      return res.json(newProducts);
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      return res.status(500).json({ error: "Không thể cập nhật sản phẩm" });
    }
  },
};
