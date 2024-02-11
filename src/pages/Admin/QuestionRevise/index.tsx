import MdEditor from '@/components/MdEditor';
import { getAdminQuestionById, updateQuestion } from '@/services/ant-design-pro/questionController';
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
  const [id, setId] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [tags, setTags] = useState<string[]>();
  const [form] = Form.useForm();

  const options = [
    { label: '简单', value: '简单' },
    { label: '普通', value: '普通' },
    { label: '困难', value: '困难' },
  ];

  const questionType = [
    { label: '栈', value: '栈' },
    { label: '队列', value: '队列' },
    { label: '二叉树', value: '二叉树' },
    { label: '贪心', value: '贪心' },
    { label: '动态规划', value: '动态规划' },
    { label: '回溯', value: '回溯' },
  ];
  async function submitId() {
    const data = await getAdminQuestionById({ id: id as number });

    if (data.code === 20000) {
      const question = data.data as API.QuestionAdminVO;
      console.log(question);
      form.setFieldsValue({
        title: question.title,
        memory: question.judgeConfig?.memoryLimit,
        time: question.judgeConfig?.timeLimit,
        stack: question.judgeConfig?.stackLimit,
        // 注意：对于复杂结构可能需要额外处理
      });

      // 更新状态
      setDescription(question.description as string);
      setAnswer(question.answer as string);
      setDifficulty(question.difficulty as string);
      setTags(question.tags);
      // 处理JudgeCase
      form.setFieldsValue({
        judgeCase: question.judgeCase,
      });
    } else {
      message.error(data.message);
    }
  }

  async function handleSubmit(data: {
    title: string;
    judgeCase: API.JudgeCase[];
    judgeConfig: API.JudgeConfig;
  }) {
    const req: API.QuestionUpdateRequest = {
      id: id,
      title: data.title,
      description: description,
      tags: tags,
      answer: answer,
      judgeCase: data.judgeCase,
      judgeConfig: data.judgeConfig,
      difficulty: difficulty,
    };
    console.log(req);
    try {
      // 插入题目
      const msg = await updateQuestion(req);
      if (msg.code === 20000 && msg.data === true) {
        message.success(`题目更新成功`);
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
      <InputNumber
        onChange={(value) => {
          if (value !== null) {
            setId(value as number);
          }
        }}
        addonBefore="请输入要修改的题号"
      />

      <Button
        type="primary"
        onClick={() => submitId()}
        htmlType="submit"
        style={{ marginLeft: '20px', width: '100px' }}
      >
        提交题号
      </Button>

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
            答案
          </Typography.Title>
          <MdEditor value={answer} onValueChange={setAnswer}></MdEditor>

          <Typography.Title level={4} style={{ marginTop: '20px' }}>
            题目标签
          </Typography.Title>

          {/* <Typography.Title level={5} >难度</Typography.Title> */}
          <Form.Item label="难度">
            <Radio.Group
              options={options}
              value={difficulty}
              onChange={(event) => {
                setDifficulty(event.target.value);
              }}
            />
          </Form.Item>

          {/* <Typography.Title level={5} >类型</Typography.Title> */}
          <Form.Item label="类型">
            <Checkbox.Group
              options={questionType}
              value={tags}
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
              提交修改
            </Button>
          </Form.Item>
        </Form>

        {/* <MdViewer value={description} /> */}
      </Card>
    </div>
  );
};
