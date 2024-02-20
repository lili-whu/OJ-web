import CodeEditor from '@/components/CodeEditor';
import { getUserQuestionById } from '@/services/ant-design-pro/questionController';
import { recordSubmit } from '@/services/ant-design-pro/recordSubmitController';
import { Outlet, history } from '@umijs/max';
import { Button, Card, Col, Menu, MenuProps, Row, Select, Tag, Typography, message } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';

const baseStyle: React.CSSProperties = {
  width: '50%',
  // height: "100vh",
};

const items: MenuProps['items'] = [
  {
    label: '解题',
    key: 'solve',
  },
  {
    label: '题解',
    key: 'answer',
  },
  {
    label: '提交记录',
    key: 'record',
  },
];

interface CodeContextType {
  questionUser: API.QuestionUserVO | undefined;
}

const defaultContextValue: CodeContextType = {
  questionUser: undefined,
};
// 自定义Hook来使用Context
export const CodeContext = createContext(defaultContextValue);

interface CodeProviderProps {
  children: React.ReactNode;
  value: CodeContextType;
}
// Context的Provider组件
const CodeProvider: React.FC<CodeProviderProps> = ({ children, value }) => (
  <CodeContext.Provider value={value}>{children}</CodeContext.Provider>
);

export default () => {
  const [lang, setLang] = useState(1);
  const [currentId, setCurrentId] = useState(0);
  const [error, setError] = useState<string | undefined>('');
  const [codeBack, setCodeBack] = useState('light');
  const [code, setCode] = useState('');
  const [submitStatus, setSubmitStatus] = useState<string | undefined>('');
  const [recordId, setRecordId] = useState<number>();
  const [questionUserVO, setQuestionUserVO] = useState<API.QuestionUserVO | undefined>();
  const [current, setCurrent] = useState('solve');

  const useCodeContext = () => useContext(CodeContext);
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    history.push(`/main/coding/${e.key}?id=${currentId}`);
    setCurrent(e.key);
  };
  async function submitCode() {
    const body = {
      language: lang,
      code: code,
      questionId: currentId,
    };
    const result = await recordSubmit(body);
    if (result.code === 20000) {
      setRecordId(result.data);
    } else {
      message.error(result.message);
      return;
    }
    setSubmitStatus('Waiting');
    setTimeout(function () {
      window.location.reload();
    }, 3000); // 等待 3000 毫秒（3 秒）
  }

  useEffect(() => {
    const getQuestion = async () => {
      // 使用URLSearchParams来提取查询参数
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id'); // 获取id参数

      const pathSegments = location.pathname.split('/');
      const activeKey = pathSegments[pathSegments.length - 1]; // 获取URL最后一部分作为activeKey
      setCurrent(activeKey);
      if (!id) {
        message.error('请选择题目');
        history.push('/main/questionList');
        return;
      } else {
        setCurrentId(Number(id));
        const body = { id: Number(id) };
        // 获取数据
        try {
          const result = await getUserQuestionById(body);
          const data = result.data;
          setQuestionUserVO(result.data);
          const LastIndex: number = (data?.recordSubmitVOList?.length as number) - 1;
          // 如果code不存在, 不设置其为上一次的答案, 防止code不能保存
          if (code === '') {
            console.log(data?.recordSubmitVOList?.[LastIndex].code);
            setCode(data?.recordSubmitVOList?.[LastIndex].code as string);
          }
          setSubmitStatus(data?.recordSubmitVOList?.[LastIndex].judgeInfo?.message);
          setError(data?.recordSubmitVOList?.[LastIndex].judgeInfo?.detailMessage);
        } catch (error) {
          console.error('发生错误', error);
        }
        // 加载子组件
        // const pathSegments = window.location.pathname.split('/');
        // if (
        //   !pathSegments.includes('solve') &&
        //   !pathSegments.includes('answer') &&
        //   !pathSegments.includes('record')
        // ) {
        //   history.push(`/main/coding/solve?id=${id}`);
        // }
      }
    };
    getQuestion();
  }, [window.location.search]);
  const contextValue = { questionUser: questionUserVO };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={11} style={{ minHeight: '100vh' }}>
          <Card style={{ minHeight: '100vh' }}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <CodeProvider value={contextValue}>
              <Outlet />
              {/* UI组件 */}
            </CodeProvider>
          </Card>
        </Col>
        <Col span={13} style={{ minHeight: '100vh' }}>
          <div style={{ textAlign: 'end' }}>
            <Select
              defaultValue="light"
              style={{ width: 120, marginRight: '20px', marginBottom: '20px', textAlign: 'left' }}
              value={codeBack}
              onChange={setCodeBack}
              options={[
                { value: 'light', label: 'light' },
                { value: 'vs-dark', label: 'vs-dark' },
              ]}
            />
            <Select
              defaultValue={1}
              style={{ width: 120, marginBottom: '20px', textAlign: 'left' }}
              value={lang}
              onChange={setLang}
              options={[
                { value: 1, label: 'java' },
                { value: 2, label: 'cpp' },
                { value: 3, label: 'go' },
              ]}
            />
          </div>
          <CodeEditor
            codeBack={codeBack}
            lang={lang}
            value={code}
            onValueChange={setCode}
          ></CodeEditor>
          <Button
            type="primary"
            htmlType="submit"
            onClick={submitCode}
            style={{ width: '100px', marginTop: '10px' }}
          >
            提交
          </Button>
          {submitStatus === 'ACCEPTED' && (
            <Tag
              bordered={false}
              style={{ fontSize: '24px', float: 'right', marginTop: '15px' }}
              color="green"
            >
              {submitStatus}
            </Tag>
          )}
          {submitStatus === 'Waiting' && (
            <Tag
              bordered={false}
              style={{ fontSize: '24px', float: 'right', marginTop: '15px' }}
              color="blue"
            >
              {submitStatus}
            </Tag>
          )}
          {submitStatus !== 'ACCEPTED' && submitStatus !== 'Waiting' && (
            <Tag
              bordered={false}
              style={{ fontSize: '24px', float: 'right', marginTop: '15px' }}
              color="red"
            >
              {submitStatus}
            </Tag>
          )}
          <Card>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
