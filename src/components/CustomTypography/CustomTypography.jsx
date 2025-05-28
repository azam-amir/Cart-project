import { Typography } from "antd";
import { cn } from "../../utils/util.service";

const { Title, Paragraph, Text } = Typography;

export const H1 = ({ children, className, ...rest }) => (
  <Title level={1} {...rest} className={cn("!m-0", className)}>
    {children}
  </Title>
);

export const H2 = ({ children, className, ...rest }) => (
  <Title level={2} {...rest} className={cn("!m-0", className)}>
    {children}
  </Title>
);

export const H3 = ({ children, className, ...rest }) => (
  <Title level={3} {...rest} className={cn("!m-0", className)}>
    {children}
  </Title>
);

export const H4 = ({ children, className, ...rest }) => (
  <Title level={4} {...rest} className={cn("!m-0", className)}>
    {children}
  </Title>
);

export const H5 = ({ children, className, ...rest }) => (
  <Title level={5} {...rest} className={cn("!m-0", className)}>
    {children}
  </Title>
);

export const P = ({ children, className, ...rest }) => (
  <Paragraph {...rest} className={cn("!mb-[12px]", className)}>
    {children}
  </Paragraph>
);

export const SmallText = ({ children, ...rest }) => (
  <Text type="secondary" {...rest}>
    {children}
  </Text>
);

export const BoldText = ({ children, ...rest }) => (
  <Text strong {...rest}>
    {children}
  </Text>
);

export const DangerText = ({ children, ...rest }) => (
  <Text type="danger" {...rest}>
    {children}
  </Text>
);

export const SuccessText = ({ children, ...rest }) => (
  <Text type="success" {...rest}>
    {children}
  </Text>
);

export const WarningText = ({ children, ...rest }) => (
  <Text type="warning" {...rest}>
    {children}
  </Text>
);
