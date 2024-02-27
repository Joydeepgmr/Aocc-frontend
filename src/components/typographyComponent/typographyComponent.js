import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const CustomTypography = ({ type, fontSize, color, fontWeight, children, ...restProps }) => {
  const style = { fontSize, color, fontWeight };

  switch (type) {
    case 'title':
      return <Title style={style} {...restProps}>{children}</Title>;
    case 'paragraph':
      return <Paragraph style={style} {...restProps}>{children}</Paragraph>;
    case 'text':
      return <Text style={style} {...restProps}>{children}</Text>;
    default:
      return <Text style={style} {...restProps}>{children}</Text>;
  }
};

export default CustomTypography;