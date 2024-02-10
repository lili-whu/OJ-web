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
  // { path: '/', redirect: '/' },

  // 管理界面的侧边栏直接读取的这个路由下的内容
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    component: './Admin',
    access: 'canAdmin', // 对应access, 只有管理员能查看的界面
    routes: [
      { path: '/admin/userManage', name: '用户管理', component: './Admin/UserManage' },
      { path: '/admin/questionCreate', name: '题目创建', component: './Admin/QuestionCreate' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
