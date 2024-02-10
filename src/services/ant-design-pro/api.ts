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

/** 批量查找用户 POST /api/user/search */
export async function search(
  pageSize: number,
  current: number,
  body: API.CurrentUserDTO,
  options?: { [key: string]: any },
) {
  return request<API.Result<API.SearchResult>>(
    `/api/user/search?pageSize=${pageSize}&current=${current}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 批量查找用户 DElETE '/api/user/delete/' + {id} */
// ``加上doller符号差值表达式
export async function deleteUser(id: number, options?: { [key: string]: any }) {
  return request<API.Result<API.DeleteResult>>(`/api/user/delete/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
