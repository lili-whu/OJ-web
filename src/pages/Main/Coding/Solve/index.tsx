import MdViewer from '@/components/MdViewer';
import { getUserQuestionById } from '@/services/ant-design-pro/questionController';
import { history } from '@umijs/max';
import { Typography, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [lang, setLang] = useState('Java');
  const [currentId, setCurrentId] = useState(0);
  const [codeBack, setCodeBack] = useState('light');
  const [code, setCode] = useState('');
  const [questionUserVO, setQuestionUserVO] = useState<API.QuestionUserVO | undefined>();

  const [current, setCurrent] = useState('mail');
  useEffect(() => {
    const getQuestion = async () => {
      // 使用URLSearchParams来提取查询参数
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id'); // 获取id参数

      if (!id) {
        console.error('ID is missing from the URL');
        message.error('请选择题目');
        history.push('/main/questionList');
        return;
      }
      const body = { id: Number(id) };
      try {
        const result = await getUserQuestionById(body);
        setQuestionUserVO(result.data);
        console.log(questionUserVO);
      } catch (error) {
        console.error('发生错误', error);
      }
    };
    getQuestion();
  }, [window.location.search]);

  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: '20px' }}>
        {questionUserVO?.id}. {questionUserVO?.title}
      </Typography.Title>
      <Typography.Text>{questionUserVO?.difficulty}</Typography.Text>
      <Typography.Title level={3}>具体描述</Typography.Title>
      <MdViewer value={questionUserVO?.description as string} />
      <Typography.Title level={3} style={{ marginTop: '20px' }}>
        测试用例
      </Typography.Title>
      <Typography.Title level={3} style={{ marginTop: '20px' }}>
        判题限制
      </Typography.Title>
      <Typography.Text>内存限制: {questionUserVO?.judgeConfig?.memoryLimit}MB</Typography.Text>
      <br />
      <Typography.Text>时间限制: {questionUserVO?.judgeConfig?.timeLimit}ms</Typography.Text>
      <br />
      <Typography.Text>堆栈限制: {questionUserVO?.judgeConfig?.stackLimit}MB</Typography.Text>
      <Typography.Title level={3} style={{ marginTop: '20px' }}>
        题目标签
      </Typography.Title>
      <Typography.Text>{questionUserVO?.tags?.join(', ')}</Typography.Text>
    </div>
  );
};