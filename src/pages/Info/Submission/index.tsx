import { getRecordSubmitPage } from '@/services/ant-design-pro/recordSubmitController';
import type { TableProps } from 'antd';
import { Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';

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
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => new Date(a.createTime as string).getTime() - new Date(b.createTime as string).getTime(),
    width: 288,
  },
  {
    title: '查看详情',
    dataIndex: 'detail',
    key: 'detail',
    width: 144,
    // 查询详细的提交记录
    render: (text, record, index) => (
      <a
        href={`/detail?id=${record.questionId}&recordId=${record.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        查看详情
      </a>
    ),
  },
];

export default () => {
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [dataSource, setDataSource] = useState<API.RecordSubmitVO[] | undefined>([]);
  const [totalData, setTotalData] = useState<number | undefined>(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const getRecords = async () => {
    const body: API.RecordSubmitQueryRequest = {
      current: currentPage,
      pageSize: pageSize,
      sortField: 'createTime',
      sortOrder: 'descend',
    };
    const result = await getRecordSubmitPage(body);
    if (result.code === 20000) {
      const data = result.data?.listResult;
      setDataSource(data);
      setTotalData(result.data?.total);
    } else {
      message.error('查询失败');
    }
  };
  useEffect(() => {
    getRecords();
  }, [currentPage, pageSize]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
          total: totalData,
          position: ['bottomCenter'],
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};
