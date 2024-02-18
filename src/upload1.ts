// @ts-ignore
/* eslint-disable */
import { RcFile } from 'antd/es/upload';
import { request } from 'umi';

export async function fileUpload(file: RcFile, options?: { [key: string]: any }) {
  const formData = new FormData();
  formData.append('file', file); // 假设后端接口接收的文件字段名为 "file"

  return request<API.ResultString>('/api/upload', {
    method: 'POST',
    data: formData, // 使用 data 而不是 params 来发送请求主体
    ...(options || {}),
    headers: {
      // 移除 Content-Type 让浏览器自动设置，以正确包含 boundary 参数
      'Content-Type': 'multipart/form-data',
    },
  });
}
