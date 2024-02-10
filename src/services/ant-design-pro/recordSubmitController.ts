// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /record/ */
export async function recordSubmit(
  body: API.RecordSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultLong>('/record/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
