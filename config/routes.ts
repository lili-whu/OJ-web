export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/info', component: './User/Info' },
    ],
  },
  // 系统首页, 未登录自动跳转到登录界面
  { path: '/', redirect: 'user/info' },
  { path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    // access: 'canAdmin', // 对应access, 只有管理员能查看的界面
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/admin' },
  { path: '*', layout: false, component: './404' },
];
