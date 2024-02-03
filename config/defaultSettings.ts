import { ProLayoutProps } from '@ant-design/pro-components';
// 第一个是ProLayoutProps和{}是类型注解, 后面是对象赋值
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  subtitle?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'lili-web',
  subtitle: '这是一个web项目',
  pwa: true,
  logo: 'http://lili-web.oss-cn-beijing.aliyuncs.com/logo.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
