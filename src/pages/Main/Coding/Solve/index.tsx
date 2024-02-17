import MdViewer from '@/components/MdViewer';
import { Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import { CodeContext } from '..';

export default () => {
  const [lang, setLang] = useState('Java');
  const [currentId, setCurrentId] = useState(0);
  const [codeBack, setCodeBack] = useState('light');
  const [code, setCode] = useState('');
  // const [questionUserVO, setQuestionUserVO] = useState<API.QuestionUserVO | undefined>();

  const [current, setCurrent] = useState('mail');
  const { questionUser } = useContext(CodeContext);

  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: '20px', alignItems: 'center' }}>
        {questionUser?.id}. {questionUser?.title}
        {questionUser?.difficulty !== undefined && (
          <Tag style={{ marginTop: '10px', float: 'right' }} color="green">
            {questionUser.difficulty}
          </Tag>
        )}
      </Typography.Title>

      <Typography.Title level={4}>具体描述</Typography.Title>
      <MdViewer value={questionUser?.description as string} />
      <Typography.Title level={4} style={{ marginTop: '20px' }}>
        判题限制
      </Typography.Title>
      <Typography.Text>
        内存限制: {(questionUser?.judgeConfig?.memoryLimit as number) / 1000000}MB
      </Typography.Text>
      <br />
      <Typography.Text>
        时间限制: {(questionUser?.judgeConfig?.timeLimit as number) / 1000}s
      </Typography.Text>
      <br />
      <Typography.Title level={5} style={{ marginTop: '20px' }}>
        题目标签
      </Typography.Title>
      <div>
        {questionUser?.tags?.[0] !== undefined && <Tag color="blue">{questionUser.tags?.[0]}</Tag>}
        {questionUser?.tags?.[1] !== undefined && <Tag color="green">{questionUser.tags?.[1]}</Tag>}
        {questionUser?.tags?.[2] !== undefined && (
          <Tag color="purple">{questionUser.tags?.[2]}</Tag>
        )}
        {questionUser?.tags?.[3] !== undefined && <Tag color="red">{questionUser.tags?.[3]}</Tag>}
      </div>
    </div>
  );
};
