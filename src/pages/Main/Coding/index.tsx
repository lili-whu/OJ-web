import CodeEditor from '@/components/CodeEditor';
import { Outlet, history } from '@umijs/max';
import { Card, Col, Menu, MenuProps, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';

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

export default () => {
  const [lang, setLang] = useState('Java');
  const [currentId, setCurrentId] = useState(0);
  const [codeBack, setCodeBack] = useState('light');
  const [code, setCode] = useState('');
  const [questionUserVO, setQuestionUserVO] = useState<API.QuestionUserVO | undefined>();

  const [current, setCurrent] = useState('solve');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    history.push(`/main/coding/${e.key}?id=${currentId}`);
    setCurrent(e.key);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    if (!id) {
      message.error('请选择题目');
      history.push('/main/questionList');
    } else {
      setCurrentId(Number(id));
      const pathSegments = window.location.pathname.split('/');
      if (
        !pathSegments.includes('solve') &&
        !pathSegments.includes('answer') &&
        !pathSegments.includes('record')
      ) {
        history.push(`/main/coding/solve?id=${id}`);
      }
    }
  }, [window.location.search]); // 依赖于navigate和查询字符串的变化

  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col span={12} style={{ minHeight: '100vh' }}>
          <Card style={{ minHeight: '100vh' }}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Outlet />
          </Card>
        </Col>
        <Col span={12} style={{ minHeight: '100vh' }}>
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
              defaultValue="Java"
              style={{ width: 120, marginBottom: '20px', textAlign: 'left' }}
              value={lang}
              onChange={setLang}
              options={[
                { value: 'Java', label: 'Java' },
                { value: 'C++', label: 'C++' },
                { value: 'Golang', label: 'Golang' },
              ]}
            />
          </div>
          <CodeEditor
            codeBack={codeBack}
            lang={lang}
            value={code}
            onValueChange={setCode}
          ></CodeEditor>
        </Col>
      </Row>
    </div>
  );
};
