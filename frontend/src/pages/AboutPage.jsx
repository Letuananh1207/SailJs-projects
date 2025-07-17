import { Typography } from "antd";

const { Title } = Typography;

function AboutPage({ message }) {
  return (
    <section id="gioithieu">
      <Title level={2}>Welcome to My CMS</Title>
      <p>{message}</p>
    </section>
  );
}

export default AboutPage;
