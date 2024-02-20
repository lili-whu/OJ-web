import MdViewer from '@/components/MdViewer';
import { Typography } from 'antd';
import { useContext } from 'react';
import { CodeContext } from '..';

export default () => {
  const { questionUser } = useContext(CodeContext);

  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: '20px', alignItems: 'center' }}>
        官方题解
      </Typography.Title>
      <MdViewer value={questionUser?.answer as string} />
    </div>
  );
};
