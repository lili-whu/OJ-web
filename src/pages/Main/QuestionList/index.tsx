import { getQuestionsByUser } from '@/services/ant-design-pro/questionController';
import type { TableProps } from 'antd';
import { Button, Checkbox, Input, InputNumber, Radio, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';

const columns: TableProps<API.QuestionUserVO>['columns'] = [
  // todo 用户该题的状态

  {
    title: '做题状态',
    dataIndex: 'submitStatus',
    key: 'submitStatus',
    render: (text, record, index) => (
      // 使用&&表达式, 条件为真时渲染后半部分
      <div>
        {record.submitStatus === 'ACCEPTED' && <Tag color="green">{record.submitStatus}</Tag>}
        {record.submitStatus !== undefined && record.submitStatus !== 'ACCEPTED' && (
          <Tag color="red">{record.submitStatus}</Tag>
        )}
      </div>
    ),
    width: 144,
  },
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <span>{id}</span>,
    width: 72,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (text, record, index) => (
      // 使用&&表达式, 条件为真时渲染后半部分
      <div>
        {record.tags?.[0] !== undefined && <Tag color="blue">{record.tags?.[0]}</Tag>}
        {record.tags?.[1] !== undefined && <Tag color="green">{record.tags?.[1]}</Tag>}
        {record.tags?.[2] !== undefined && <Tag color="purple">{record.tags?.[2]}</Tag>}
        {record.tags?.[3] !== undefined && <Tag color="red">{record.tags?.[3]}</Tag>}
      </div>
    ),
    width: 256,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 288,
    render: (text, record, index) => <a href={`/main/coding/solve?id=${record.id}`}>{text}</a>,
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
    render: (text, record, index) => (
      <div>{record.difficulty !== undefined && <Tag color="green">{record.difficulty}</Tag>}</div>
    ),
    width: 108,
  },
  {
    title: '创建者',
    key: 'createId',
    dataIndex: 'createId',
    width: 72,
  },
];

const options = [
  { label: '简单', value: '简单' },
  { label: '普通', value: '普通' },
  { label: '困难', value: '困难' },
];

const questionType = [
  { label: '数组', value: '数组' },
  { label: '双指针', value: '双指针' },
  { label: '栈', value: '栈' },
  { label: '队列', value: '队列' },
  { label: '二叉树', value: '二叉树' },
  { label: '贪心', value: '贪心' },
  { label: '动态规划', value: '动态规划' },
  { label: '回溯', value: '回溯' },
];

export default () => {
  const [searchId, setSearchId] = useState<number>();
  const [searchTitle, setSearchTitle] = useState<string>();
  const [tags, setTags] = useState<string[]>();
  const [difficulty, setDifficulty] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [dataSource, setDataSource] = useState<API.QuestionUserVO[] | undefined>([]);
  const [totalData, setTotalData] = useState<number | undefined>(0);
  const getQuestionData = async () => {
    const body = {
      current: currentPage, // 使用currentPage状态
      pageSize: 10,
      id: searchId,
      title: searchTitle,
      difficulty: difficulty,
      tags: tags,
    };
    console.log(body);

    try {
      const questions = await getQuestionsByUser(body);
      setTotalData(questions.data?.total);
      setDataSource(questions.data?.listResult);
    } catch (error) {
      console.error('发生错误', error);
    }
  };
  useEffect(() => {
    getQuestionData();
  }, [currentPage]); // 依赖于currentPage，当它改变时重新获取数据

  return (
    <div>
      <InputNumber
        addonBefore="题号"
        onChange={(value) => {
          setSearchId(value as number);
        }}
        style={{ width: '200px', marginRight: '100px' }}
      />
      <Input
        addonBefore="标题"
        onChange={(e) => setSearchTitle(e.target.value)}
        style={{ width: '200px', marginBottom: '10px' }}
      />

      <br />
      <Typography.Text>难度: </Typography.Text>
      <Radio.Group
        style={{ marginBottom: '10px' }}
        options={options}
        onChange={(event) => {
          setDifficulty(event.target.value);
        }}
      />

      <br />
      <Typography.Text>标签: </Typography.Text>
      <Checkbox.Group
        options={questionType}
        onChange={(checedValue) => {
          setTags(checedValue);
        }}
      />
      <br />
      <Button
        type="primary"
        htmlType="submit"
        onClick={getQuestionData}
        style={{ width: '100px', marginTop: '10px' }}
      >
        查询
      </Button>
      <Table
        columns={columns}
        pagination={{
          pageSize: 10,
          total: totalData,
          position: ['bottomCenter'],
          onChange: (page) => {
            setCurrentPage(page);
          },
        }}
        dataSource={dataSource}
      />
    </div>
  );
};
