const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ msg: "Email hoặc mật khẩu còn thiếu" });

      const user = await User.findOne({ email });
      if (!user)
        return res.status(401).json({ msg: "Người dùng không tồn tại" });

      const compareResult = await bcrypt.compare(password, user.password);
      if (!compareResult) return res.status(401).json({ msg: "Mật khẩu sai" });

      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "30d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({ msg: "Đăng nhập thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Lỗi máy chủ khi đăng nhập" });
    }
  },

  register: async function (req, res) {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username)
        return res.status(400).json({ msg: "Tất cả các trường là bắt buộc" });

      const isExist = await User.findOne({ email });
      if (isExist) return res.status(401).json({ msg: "Email đã tồn tại" });

      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({ email, password: hashPassword, username });

      res.status(201).json({ msg: "Đăng ký thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Lỗi máy chủ khi đăng ký" });
    }
  },

  getProfile: async function (req, res) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ msg: "Chưa đăng nhập" });

      const decoded = jwt.verify(token, "your_jwt_secret");
      const user = await User.findOne({ id: decoded.id }).select([
        "email",
        "username",
        "role",
        "isAdmin",
      ]);

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Lỗi máy chủ khi lấy thông tin" });
    }
  },

  logout: async function (req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      return res.status(200).json({ msg: "Đăng xuất thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Lỗi máy chủ khi đăng xuất" });
    }
  },
};
