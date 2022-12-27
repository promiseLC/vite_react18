import { useState } from 'react';
import Home from '@/view/home/index';
import CustomSelect from '@/component/customSelect';
import styles from './App.module.less';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}>
      <div className={styles.app}>
        <Home />
      </div>
    </ConfigProvider>
  );
}

export default App;
