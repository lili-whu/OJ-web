import { deleteUser, searchUsers } from '@/services/ant-design-pro/userController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};
async function deleteUserSubmit(id: number) {
  const res = await deleteUser({ id: id } as API.deleteUserParams);
  if (res.code === 20000) {
    message.success('用户删除成功');
    window.location.reload();
  } else {
    message.error(res.message);
  }
  // 发送删除请求
}

const columns: ProColumns<API.SafetyUser>[] = [
  {
    dataIndex: 'id',
    title: 'id',
    width: 36,
    editable: false,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    // ellipsis: true,
    // tip: '标题过长会自动收缩', // ?提示
  },
  {
    title: '账户名',
    dataIndex: 'userAccount',
    copyable: true,
    // ellipsis: true,
    // tip: '标题过长会自动收缩', // ?提示
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    width: 96,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
    width: 96,
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    width: 96,
    // filters: true, // 筛选
    // onFilter: true,
    // ellipsis: true,
    valueType: 'select',
    valueEnum: {
      0: {
        text: '正常',
        status: 'Success',
        // disabled: true,
      },
      1: {
        text: '禁用',
        status: 'Error',
      },
    },
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    width: 96,
    // filters: true, // 筛选
    // onFilter: true,
    // ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '管理员',
        status: 'Success',
        // disabled: true,
      },
      0: {
        text: '普通用户',
        status: 'Default',
      },
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 48,
    search: false,
    valueType: 'avatar',
    // render: (dom, entity, index, action, schema) => (
    //   <div>
    //     <Image src={entity.avatar}></Image>
    //   </div>
    // ),
  },
  {
    disable: true,
    title: '性别',
    width: 96,
    dataIndex: 'gender',
    // filters: true, // 筛选
    // onFilter: true,
    // ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '男',
        status: 'Processing',
        // disabled: true,
      },
      0: {
        text: '女',
        status: 'Error',
      },
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: false,
    width: 128,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '修改时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    width: 128,
    sorter: false,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      // <a
      //   key="editable"
      //   onClick={() => {
      //     action?.startEditable?.(record.id as number);
      //   }}
      // >
      //   编辑
      // </a>,
      <a
        key="deleteUser"
        onClick={() => {
          deleteUserSubmit(record.id as number);
        }}
      >
        删除
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.SafetyUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        if (params.username === '') params.username = undefined;
        var user: API.SafetyUser = {
          id: params.id,
          username: params.username,
          userAccount: params.userAccount,
          avatar: params.avatar,
          userRole: params.userRole,
          gender: params.gender,
          phone: params.phone,
          email: params.email,
          status: params.status,
        };
        const p = {
          pageSize: params.pageSize,
          current: params.current,
        } as API.searchUsersParams;
        // await waitTime(2000);
        const result = await searchUsers(p, user);
        return {
          data: result.data?.userList,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: true,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: result.data?.total,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle=""
      toolBarRender={() => [
        // <Button
        //   key="button"
        //   icon={<PlusOutlined />}
        //   onClick={() => {
        //     actionRef.current?.reload();
        //   }}
        //   type="primary"
        // >
        //   新建
        // </Button>,
      ]}
    />
  );
};
