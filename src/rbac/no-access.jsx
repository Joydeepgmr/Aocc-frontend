import React from "react";
import { CloseOutlined } from '@ant-design/icons';

import Text from "../components/typographyComponent/typographyComponent";

export const NoAccess = ({ permissionsNeeded }) => {
  return (
    <div style={{
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <CloseOutlined style={{ fontSize: '30px', marginBottom: '10px' }} />
      <div>
        <Text type="text" style={{ color: "#F00", fontSize: '25px' }}>
          Unauthorized -- <em>Please contact to IT Admin</em>
        </Text>
      </div>

    </div>
  );
};

export default NoAccess;
