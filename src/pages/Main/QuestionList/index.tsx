import { getQuestionsByUser } from '@/services/ant-design-pro/questionController';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

const columns: TableProps<API.QuestionUserVO>['columns'] = [
  // todo 用户该题的状态

  {
    title: '做题状态',
    dataIndex: 'status',
    key: 'status',
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
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 288,
    render: (text, record, index) => <a href={`/main/coding/?id=${record.id}`}>{text}</a>,
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
    width: 108,
  },
  {
    title: '创建者',
    key: 'createId',
    dataIndex: 'createId',
    width: 72,
  },
];

export default () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<API.QuestionUserVO[] | undefined>([]);
  const [totalData, setTotalData] = useState<number | undefined>(0);

  useEffect(() => {
    const getQuestionData = async () => {
      const body = {
        current: currentPage, // 使用currentPage状态
        pageSize: 10,
        // 其他属性按需
      };

      try {
        const questions = await getQuestionsByUser(body);
        setTotalData(questions.data?.total);
        setDataSource(questions.data?.listResult);
      } catch (error) {
        console.error('发生错误', error);
      }
    };

    getQuestionData();
  }, [currentPage]); // 依赖于currentPage，当它改变时重新获取数据

  return (
    <div>
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
