// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 请求前缀
const BasePrefix = 'http://localhost:8080/';

/** 获取当前的用户 GET /api/user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser>>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.Result<API.LogOutResult>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  // 这里的请求路径开头需要加/, 否则会带上当前网站的路由, 然后/api会通过ant design pro代理
  return request<API.Result<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  // 这里的请求路径开头需要加/, 否则会带上当前网站的路由, 然后/api会通过ant design pro代理
  return request<API.Result<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量查找用户 GET /api/user/search */
export async function search(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.Result<API.SearchResult>>('/api/user/search', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

/** 批量查找用户 DElETE '/api/user/delete/' + {id} */
// ``加上doller符号差值表达式
export async function deleteUser(id: number, options?: { [key: string]: any }) {
  return request<API.Result<API.DeleteResult>>(`/api/user/delete/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
