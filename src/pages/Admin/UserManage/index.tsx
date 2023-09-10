import {PlusOutlined} from '@ant-design/icons';
import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Image} from 'antd';
import {searchUsers} from "@/services/ant-design-pro/api";
import message from "antd/es/message";

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

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 48,
    search: false
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    search: false,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={50}/>
      </div>
    )
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    copyable: true,
    ellipsis: true,
    search: false
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'Default',
      },
      1: {
        text: '管理员',
        status: 'Success',
        disabled: true,
      }
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    ellipsis: true,
    valueEnum: {
      0: {text: '男'},
      1: {text: '女'},
    }
  }, {
    title: '手机号',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  }, {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
  }, {
    title: '用户状态',
    dataIndex: 'userStatus',
    ellipsis: true,
    valueEnum: {
      0: {text: '正常'},
      1: {text: '冻结'},
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    valueType: 'date',
    search: false
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          message.info(record.id)
        }}
      >
        编辑
      </a>,
      <a
        key="delete"
        onClick={() => {
          message.info('delete：' + record.id)
        }}
      >
        删除
      </a>,
    ],
  },
];

export default () => {
  // const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      // actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers()
        console.log('searchUsers', userList)
        await waitTime(2000);
        return {
          data: userList.data
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
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
          // @ts-ignore
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
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined/>}
          onClick={() => {
            message.info("新建")
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
