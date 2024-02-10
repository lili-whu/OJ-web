import MdEditor from '@/components/MdEditor';
import { addQuestion } from '@/services/ant-design-pro/questionController';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  Typography,
  message,
} from 'antd';
import { useState } from 'react';

export default () => {
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [tags, setTags] = useState(['栈']);
  const [form] = Form.useForm();

  const options = [
    { label: '简单', value: 'easy' },
    { label: '普通', value: 'medium' },
    { label: '困难', value: 'hard' },
  ];

  const questionType = [
    { label: '栈', value: '栈' },
    { label: '队列', value: '队列' },
    { label: '二叉树', value: '二叉树' },
    { label: '贪心', value: '贪心' },
    { label: '动态规划', value: '动态规划' },
    { label: '回溯', value: '回溯' },
  ];

  async function handleSubmit(data: {
    title: string;
    judgeCase: API.JudgeCase[];
    judgeConfig: API.JudgeConfig;
  }) {
    console.log(data);
    console.log(description);
    tags.push(difficulty);
    console.log(tags);

    const req: API.QuestionAddRequest = {
      title: data.title,
      description: description,
      tags: tags,
      answer: undefined,
      judgeCase: data.judgeCase,
      judgeConfig: data.judgeConfig,
    };
    console.log(req);
    try {
      // 插入题目
      const msg = await addQuestion(req);
      if (msg.code === 20000) {
        message.success(`题目插入成功, 题号: ${msg.data}!`);
      } else {
        // 出现错误
        message.error(msg.message);
      }
    } catch (error) {
      message.error('出现错误！');
    }
  }
  return (
    <div>
      <Card>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          name="questionAdd"
          style={{ alignItems: 'center' }}
          form={form}
          onFinish={(data) => {
            var judgeConfig: API.JudgeConfig = {
              timeLimit: data.time,
              memoryLimit: data.memory,
              stackLimit: data.stack,
            };
            data.judgeConfig = judgeConfig;
            handleSubmit(data);
          }}
          autoComplete="off"
        >
          <Typography.Title level={4}>标题</Typography.Title>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '标题不能为空' }]}
          >
            <Input style={{ width: '50%' }} />
          </Form.Item>
          <Typography.Title level={4}>具体描述</Typography.Title>
          <MdEditor value={description} onValueChange={setDescription}></MdEditor>
          <Typography.Title level={4} style={{ marginTop: '20px' }}>
            题目标签
          </Typography.Title>

          {/* <Typography.Title level={5} >难度</Typography.Title> */}
          <Form.Item label="难度">
            <Radio.Group
              options={options}
              onChange={(event) => {
                setDifficulty(event.target.value);
              }}
            />
          </Form.Item>

          {/* <Typography.Title level={5} >类型</Typography.Title> */}
          <Form.Item label="类型">
            <Checkbox.Group
              options={questionType}
              onChange={(checedValue) => {
                setTags(checedValue);
              }}
            />
          </Form.Item>

          <Typography.Title level={4} style={{ marginTop: '20px' }}>
            测试用例
          </Typography.Title>
          <Form.Item label="测试用例">
            <Form.List name="judgeCase">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ alignItems: 'baseline' }} align="center">
                      <Form.Item
                        {...restField}
                        name={[name, 'input']}
                        rules={[{ required: true, message: '输入不能为空' }]}
                      >
                        <Input placeholder="input" style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'output']}
                        rules={[{ required: true, message: '输出不能为空' }]}
                      >
                        <Input placeholder="output" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      style={{ width: '60%' }}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加测试用例
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Typography.Title level={4} style={{ marginTop: '20px' }}>
            判题限制
          </Typography.Title>
          <Form.Item label="内存限制" name="memory">
            <InputNumber addonAfter="MB" />
          </Form.Item>
          <Form.Item label="时间限制" name="time">
            <InputNumber addonAfter="ms" />
          </Form.Item>
          <Form.Item label="堆栈限制" name="stack">
            <InputNumber addonAfter="MB" />
          </Form.Item>

          <Form.Item
            style={{
              textAlign: 'center',
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: '100px' }}>
              提交新题目
            </Button>
          </Form.Item>
        </Form>

        {/* <MdViewer value={description} /> */}
      </Card>
    </div>
  );
};
