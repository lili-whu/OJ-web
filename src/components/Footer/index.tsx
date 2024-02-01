import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: 'web by lili',
          href: 'https://github.com/lili-whu',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
