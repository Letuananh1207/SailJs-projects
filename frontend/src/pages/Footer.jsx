import { Typography } from "antd";

const { Paragraph } = Typography;

function Footer({ lastVisit }) {
  return (
    <footer>
      <Paragraph>Lần truy cập gần nhất: {lastVisit}</Paragraph>
    </footer>
  );
}

export default Footer;
