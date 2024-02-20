import CodeEditor from '@/components/CodeEditor';
import { getRecordSubmit } from '@/services/ant-design-pro/recordSubmitController';
import type { TableProps } from 'antd';
import { Card, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';

const lang = ['', 'java', 'cpp', 'go'];
const columns: TableProps<API.RecordSubmitVO>['columns'] = [
  {
    title: '做题状态',
    dataIndex: 'submitStatus',
    key: 'submitStatus',
    render: (text, record, index) => (
      <div>
        {record.judgeInfo?.message === 'ACCEPTED' && (
          <Tag color="green">{record.judgeInfo.message}</Tag>
        )}
        {record.judgeInfo?.message !== undefined && record.judgeInfo?.message !== 'ACCEPTED' && (
          <Tag color="red">{record.judgeInfo?.message}</Tag>
        )}
      </div>
    ),
    width: 144,
  },
  {
    title: '提交时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: 288,
  },
];

export default () => {
  const [data, setData] = useState<API.RecordSubmitVO | undefined>();
  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    const getQuestion = async () => {
      // 使用URLSearchParams来提取查询参数
      const queryParams = new URLSearchParams(window.location.search);
      const recordId = queryParams.get('recordId'); // 获取id参数
      console.log(1);
      const body = { id: Number(recordId) };
      // 获取数据
      try {
        const result = await getRecordSubmit(body);

        if (result?.code === 20000) {
          const record = result.data;
          setData(record);
          setCode(record?.code);
        }
      } catch (error) {
        console.error('发生错误', error);
      }
    };
    getQuestion();
  }, []);

  return (
    <div>
      <Card>
        <Typography.Title level={5}>
          题目id: {data?.questionId} 语言: {lang[data?.language as number]}
        </Typography.Title>
        {data?.judgeInfo?.message === 'ACCEPTED' && (
          <Tag
            bordered={false}
            style={{ fontSize: '24px', float: 'left', marginTop: '15px' }}
            color="green"
          >
            {data?.judgeInfo?.message}
          </Tag>
        )}
        {data?.judgeInfo?.message !== 'ACCEPTED' && (
          <Tag
            bordered={false}
            style={{ fontSize: '24px', float: 'left', marginTop: '15px' }}
            color="red"
          >
            {data?.judgeInfo?.message}
          </Tag>
        )}
        <br></br>
        <br></br>
        <br></br>
        <Typography.Title level={5}>判题详情</Typography.Title>
        <Typography.Text type="success">
          时间消耗: {(data?.judgeInfo?.timeConsume as number) / 1}ms
        </Typography.Text>
        <br></br>
        <Typography.Text type="success">
          内存消耗: {(data?.judgeInfo?.memoryConsume as number) / 1000 / 1000 / 8}MB
        </Typography.Text>
        <Card>
          <Typography.Text type="danger">{data?.judgeInfo?.detailMessage}</Typography.Text>
        </Card>

        <Typography.Title level={5}>提交代码</Typography.Title>
        <CodeEditor
          codeBack="light"
          lang={1}
          value={code as string}
          onValueChange={setCode}
        ></CodeEditor>
      </Card>
    </div>
  );
};
