import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Outlet } from '@umijs/max';
import React, { PropsWithChildren } from 'react';
const Admin: React.FC<PropsWithChildren<{}>> = (props) => {
  const { children } = props;
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};
export default Admin;
