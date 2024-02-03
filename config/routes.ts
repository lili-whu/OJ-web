export default [
  {
    path: '/user',
    layout: false, // 不加载全局layout
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  // 系统首页, 未登录自动跳转到登录界面
  { path: '/', redirect: 'partner/selfInfo' },
  { path: '/welcome', icon: 'smile', component: './Welcome' },

  {
    path: '/partner',
    component: './Partner', // 在这里设置component, 子组件就不能正常加载了
    routes: [
      { path: '/partner/selfInfo', component: './Partner/SelfInfo' },
      { path: '/partner/searchPartner', component: './Partner/SearchPartner' },
    ],
  },

  // {
  //   path: '/admin',
  //   icon: 'crown',
  //   // access: 'canAdmin', // 对应access, 只有管理员能查看的界面
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', component: './Admin' },
  //   ],
  // },
  { icon: 'table', path: '/list', component: './TableList' },
  { path: '*', layout: false, component: './404' },
];
