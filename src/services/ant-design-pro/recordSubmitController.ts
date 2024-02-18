// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/record/ */
export async function recordSubmit(
  body: API.RecordSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultLong>('/api/record/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/record/${param0} */
export async function getRecordSubmit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRecordSubmitParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultRecordSubmitVO>(`/api/record/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/record/page */
export async function getRecordSubmitPage(
  body: API.RecordSubmitQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResultRecordSubmitVO>('/api/record/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
