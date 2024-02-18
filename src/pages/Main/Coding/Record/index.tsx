import type { TableProps } from 'antd';
import { Table, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CodeContext } from '..';

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
    defaultSortOrder: 'descend',
    sorter: (a, b) =>
      new Date(a.createTime as string).getTime() - new Date(b.createTime as string).getTime(),
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
  const { questionUser } = useContext(CodeContext);

  const [dataSource, setDataSource] = useState<API.RecordSubmitVO[] | undefined>([]);

  useEffect(() => {
    setDataSource(questionUser?.recordSubmitVOList);
  }, [questionUser]);

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};
