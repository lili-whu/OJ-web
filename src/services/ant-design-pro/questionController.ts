// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/question/add */
export async function addQuestion(body: API.QuestionAddRequest, options?: { [key: string]: any }) {
  return request<API.ResultLong>('/api/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/question/admin/${param0} */
export async function getAdminQuestionById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminQuestionByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultQuestionAdminVO>(`/api/question/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/question/admin/page */
export async function getQuestionsByAdmin(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResultQuestionAdminVO>('/api/question/admin/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/question/delete/${param0} */
export async function deleteQuestion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultBoolean>(`/api/question/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/question/update */
export async function updateQuestion(
  body: API.QuestionUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultBoolean>('/api/question/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/question/user/${param0} */
export async function getUserQuestionById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserQuestionByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultQuestionUserVO>(`/api/question/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/question/user/page */
export async function getQuestionsByUser(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResultQuestionUserVO>('/api/question/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
