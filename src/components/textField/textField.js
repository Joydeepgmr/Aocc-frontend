import React from 'react';
import { Input } from 'antd';
import './textField.scss';


const { TextArea } = Input;
const App = () => (
  <div style={{ display: 'flex', flexDirection: 'row', }}>
    <TextArea rows={4} className="custom-textarea" />
    <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} className="custom-textarea" />
  </div>
);
export default App;