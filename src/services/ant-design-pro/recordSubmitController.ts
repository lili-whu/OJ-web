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

/** 此处后端没有提供注释 POST /api/record/page */
export async function getRecordSubmitPage(
  body: API.RecordSubmitQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultListRecordSubmitVO>('/api/record/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
