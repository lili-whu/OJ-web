import { Footer } from '@/components';
import { register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Form, Input, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import Title from 'antd/es/typography/Title';
import React from 'react';
import Settings from '../../../../config/defaultSettings';
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

const Register: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      // 登录
      const ret = await register({
        ...values,
      });
      if (ret.code === 20000) {
        message.success('注册成功');
        history.push('/user/login');
        return;
      } else {
        // 如果失败去展示用户错误信息
        message.error(ret.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      {/* helmet 头部 最上方导航栏*/}
      <Helmet>
        <title>
          {'注册'}-{Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '160px 35% 0 35%',
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
              lili-web
            </Title>
          </div>
          <div style={{ width: '100%', textAlign: 'center', padding: '5px' }}>
            <span style={{ fontSize: 15 }}>这是一个web项目</span>
          </div>
        </div>
        <Tabs
          centered
          items={[
            {
              key: 'register',
              label: '用户注册',
            },
          ]}
        />
        <Form
          size="large"
          name="registerForm"
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
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
            <Input prefix={<UserOutlined />} placeholder="请输入初始账号" />
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
            <Input prefix={<LockOutlined />} type="password" placeholder="请输入初始密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,100}$/,
                message: '密码需大于等于6位, 且包含字母和数字',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('新密码与旧密码不一致'));
                },
              }),
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="请确认初始密码" />
          </Form.Item>
          <Form.Item>
            {/* float指定位置 */}
            <a
              style={{
                float: 'right',
              }}
              href="login"
            >
              已有账号, 点击登录
            </a>
          </Form.Item>

          <Form.Item
            style={{
              textAlign: 'center',
            }}
          >
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>

        {/* procomponents实现 */}
        {/* <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={Settings.logo}
          title={Settings.title}
          subTitle={Constants.subtitle}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            centered
            items={[
              {
                key: 'register',
                label: '用户注册',
              },
            ]}
          />
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <UserAddOutlined />,
              }}
              name="userAccount"
              placeholder={'请输入初始账号'}
              rules={[
                {
                  pattern: /[0-9a-zA-Z_]{6,20}/,
                  message: '账号需大于等于6位, 由字母数字下划线组成',
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'请输入初始密码'}
              name="password"
              rules={[
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,100}$/,
                  message: '密码需大于等于6位, 且同时包含字母和数字',
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'请确认初始密码'}
              name="confirmPassword"
              rules={[
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,100}$/,
                  message: '密码需大于等于6位, 且同时包含字母和数字',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('新密码与旧密码不一致'));
                  },
                }),
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
              href="login"
            >
              已有账号, 点击登录
            </a>
          </div>
        </LoginForm> */}
      </div>
      <Footer />
    </div>
  );
};
export default Register;
