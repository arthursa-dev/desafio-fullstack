import { Typography } from "antd";

const { Text, Title } = Typography;

export function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Title>Desafio Fullstack</Title>
      <Text>
        Essa aplicação foi desenvolvida com o propósito de apresentar conceitos
        da tecnologia React
      </Text>
    </div>
  );
}