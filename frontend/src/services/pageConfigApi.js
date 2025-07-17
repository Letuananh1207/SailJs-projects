import axios from "axios";

export const fetchPageConfig = async () => {
  const res = await axios.get("http://localhost:1337/api/page-config");
  console.log("📄 Cấu hình trang:", res.data); // In ra cấu hình để debug
  return res.data;
};
