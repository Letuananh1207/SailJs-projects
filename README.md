# 🛒 Product CMS (Quản lý sản phẩm)

Ứng dụng web giúp quản lý sản phẩm cơ bản với các chức năng:
- ✅ Thêm, sửa, xoá sản phẩm
- 🔍 Tìm kiếm theo tên
- 📄 Phân trang danh sách sản phẩm
- 🌙 Chế độ tối (Dark mode)
- 📦 Dữ liệu được lưu trữ và xử lý qua API (backend)

---

## 🔧 Công nghệ sử dụng

- Frontend: React.js + Vite
- Backend: Sails.js (Node.js framework)
- HTTP client: Axios
- CSS: Tùy chỉnh / thuần CSS
- State: React hook (useState, useEffect, useMemo)

---

## 🚀 Hướng dẫn chạy dự án

### 1. Clone dự án

git clone https://github.com/yourusername/product-cms.git
cd product-cms

### 2. Cài đặt backend

cd backend
npm install
sails lift

> Mặc định chạy ở http://localhost:1337

### 3. Cài đặt frontend

cd ../frontend
npm install
npm run dev

> Mặc định chạy ở http://localhost:5173

---

## 🧪 Chức năng đã hoàn thành

- CRUD: Thêm, sửa, xoá sản phẩm qua form và danh sách
- Tìm kiếm: theo tên sản phẩm với input lọc
- Phân trang: Hiển thị 5 sản phẩm / trang, có nút chuyển trang
- Dark mode: Lưu theme (light / dark) vào localStorage, chuyển đổi bằng nút
- Giao diện cơ bản: Responsive, bố cục sidebar - content - footer

---

## 💡 Gợi ý phát triển tiếp

- ✅ Xác thực người dùng (login, phân quyền)
- ✅ Thêm hình ảnh sản phẩm (upload file)
- ✅ Giao diện chi tiết sản phẩm
- ✅ Export danh sách sang Excel / PDF
- ✅ Lọc theo giá, danh mục
- ✅ Tích hợp database thực tế (MongoDB, PostgreSQL...)
- ✅ Thêm chức năng ghi lại lịch sử thao tác (audit log)

---

## 🐞 Debug & DevTools

- Sử dụng DevTools tab Network để theo dõi các request tới API /api/product
- Kiểm tra dữ liệu lưu ở tab Application > localStorage (theme, lastVisitTime...)
- Kiểm tra lỗi trong Console nếu có AxiosError, 404, v.v.

---

## 📁 Cấu trúc dự án

product-cms/
├── backend/              # Sails.js API
│   ├── api/
│   │   └── controllers/ProductController.js
│   └── config/
├── frontend/             # React + Vite
│   ├── components/
│   │   ├── ProductList.jsx
│   │   ├── ProductForm.jsx
│   │   └── common/
│   │       ├── Input.jsx
│   │       └── Pagination.jsx
│   ├── App.jsx
│   └── main.jsx
