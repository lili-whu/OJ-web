import { Footer } from '@/components';
import { login } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Form, Input, Tabs, Typography, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
const { Text, Title } = Typography;
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({
        ...values,
      });
      if (msg.code === 20000) {
        message.success('登录成功!');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        // 如果出现错误
        message.error(msg.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      {/* helmet 头部 最上方导航栏*/}
      <Helmet>
        <title>
          {'登录'}-{Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '200px 35% 0 35%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* 头像 */}
            <img
              src="http://lili-web.oss-cn-beijing.aliyuncs.com/logo.svg"
              alt="Logo"
              style={{ height: 50, width: 50, marginRight: 20 }}
            />
            <Title level={2} style={{ marginBottom: 0 }}>
              liOJ
            </Title>
          </div>
          <div style={{ width: '100%', textAlign: 'center', padding: '5px' }}>
            <span style={{ fontSize: 15 }}>一个提升编程水平的编程平台</span>
          </div>
        </div>

        <Tabs
          centered
          items={[
            {
              key: 'login',
              label: '用户登录',
            },
          ]}
        />
        <Form
          size="large"
          name="loginForm"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Form.Item
            name="userAccount"
            rules={[
              {
                pattern: /[0-9a-zA-Z_]{6,20}/,
                message: '账号需大于等于6位, 由字母数字下划线组成',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,100}$/,
                message: '密码需大于等于6位, 且包含字母和数字',
              },
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            {/* float指定位置 */}
            <a
              style={{
                float: 'right',
              }}
              href="register"
            >
              新用户 ?
            </a>
          </Form.Item>

          <Form.Item
            style={{
              textAlign: 'center',
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
