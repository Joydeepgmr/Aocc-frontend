import React from 'react';
import { Typography } from 'antd';
import "./typographyComponent.scss";

const { Title, Paragraph, Text } = Typography;

const CustomTypography = ({ type, fontSize = '16px', color, fontWeight = 600, children, ...restProps }) => {
  const style = { fontSize, color, fontWeight };

  switch (type) {
    case 'title':
      return <Title style={style} {...restProps} className='custom-font'>{children}</Title>;
    case 'paragraph':
      return <Paragraph style={style} {...restProps} className='custom-font'>{children}</Paragraph>;
    case 'text':
      return <Text style={style} {...restProps} className='custom-font'>{children}</Text>;
    default:
      return <Text style={style} {...restProps} className='custom-font'>{children}</Text>;
  }
};

export default CustomTypography;