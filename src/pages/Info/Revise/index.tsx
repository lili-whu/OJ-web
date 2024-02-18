import { fileUpload } from '@/services/ant-design-pro/upload';
import { getCurrentUser, reviseUserByUser } from '@/services/ant-design-pro/userController';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  GetProp,
  Input,
  Radio,
  Typography,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default () => {
  const [gender, setGender] = useState<number>(1);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  async function submitAvatar(avatar: RcFile): Promise<boolean> {
    try {
      const msg = await fileUpload(avatar);
      if (msg.code === 20000) {
        message.success(`头像上传成功`);
        console.log(msg.data);
        setImageUrl(msg.data);
        return true;
      } else {
        // 出现错误
        message.error(msg.message);
      }
    } catch (error) {
      message.error('出现错误！');
    }
    return false;
  }

  // 校验图片 + 上传 + 返回结果
  const beforeUpload = async (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    var res: boolean = false;
    if (isJpgOrPng && isLt2M) {
      res = await submitAvatar(file);
    }
    return res;
  };

  const options = [
    { label: '男生', value: 1 },
    { label: '女生', value: 0 },
  ];

  async function submitId() {
    const data = await getCurrentUser();

    if (data.code === 20000) {
      const user = data.data as API.SafetyUser;
      console.log(user);
      form.setFieldsValue({
        username: user.username,
        userAccount: user.userAccount,
        phone: user.phone,
        email: user.email,
      });
      setGender(user.gender as number);
      setImageUrl(user.avatar);
    } else {
      message.error(data.message);
    }
  }

  async function handleSubmit(user: API.SafetyUserDTOByUser) {
    const req: API.SafetyUserDTOByUser = {
      username: user.username,
      userAccount: user.userAccount,
      avatar: imageUrl,
      gender: gender,
      phone: user.phone,
      email: user.email,
    };
    console.log(req);
    try {
      const msg = await reviseUserByUser(req);
      if (msg.code === 20000 && msg.data === true) {
        message.success(`用户信息更新成功`);
      } else {
        // 出现错误
        message.error(msg.message);
      }
    } catch (error) {
      message.error('出现错误！');
    }
  }

  useEffect(() => {
    submitId();
  }, []);
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
            handleSubmit(data);
          }}
          autoComplete="off"
        >
          <Typography.Title level={3}>用户信息修改</Typography.Title>

          <Form.Item
            label="昵称"
            name="username"
            rules={[{ required: true, message: '昵称不能为空' }]}
          >
            <Input style={{ width: '50%' }} />
          </Form.Item>

          <Form.Item
            label="账户名"
            name="userAccount"
            rules={[
              {
                pattern: /[0-9a-zA-Z_]{6,20}/,
                message: '账号需大于等于6位, 由字母数字下划线组成',
              },
            ]}
          >
            <Input style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不能为空' }]}
          >
            <Input style={{ width: '50%' }} />
          </Form.Item>

          <Typography.Title level={4} style={{ marginTop: '20px' }}>
            {' '}
            性别{' '}
          </Typography.Title>

          <Form.Item label="性别">
            <Radio.Group
              options={options}
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            />
          </Form.Item>
          <Typography.Title level={4} style={{ marginTop: '20px' }}>
            {' '}
            头像{' '}
          </Typography.Title>

          <Form.Item
            style={{
              textAlign: 'center',
            }}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              //   onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
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
      </Card>
    </div>
  );
};
