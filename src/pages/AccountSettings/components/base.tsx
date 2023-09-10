import React from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';
import ProForm, {ProFormRadio, ProFormText} from '@ant-design/pro-form';
import {useRequest} from 'umi';
import styles from './BaseView.less';
import {currentUser as getCurrentUserInfo, updateUserInfo} from "@/services/ant-design-pro/api";

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({avatar}: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar"/>
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined/>
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const {data: currentUser, loading} = useRequest(() => {
    return getCurrentUserInfo();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatarUrl) {
        return currentUser.avatarUrl;
      }
      return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    }
    return '';
  };

  const updateInfo = async (values: Record<string, any>) => {
    const res = await updateUserInfo(values)
    if (res.code == 200) {
      message.success(res.description)
    }
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={async (values) => {
                await updateInfo(values)
                return true;
              }}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
            >
              <ProFormText
                disabled={true}
                // @ts-ignore
                initialValue={currentUser.userAccount}
                width="md"
                name="userAccount"
                label="用户账户"
              />
              <ProFormText
                // @ts-ignore
                initialValue={currentUser.nickname}
                width="md"
                name="nickname"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormRadio.Group
                name="gender"
                label="性别"
                // @ts-ignore
                initialValue={currentUser.gender}
                options={[
                  {
                    label: '男',
                    value: 0,
                  },
                  {
                    label: '女',
                    value: 1,
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                // @ts-ignore
                initialValue={currentUser.email}
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="phone"
                label="手机号"
                // @ts-ignore
                initialValue={currentUser.phone}
                rules={[
                  {
                    required: true,
                    message: '请输入您的手机号!',
                  },
                ]}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()}/>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
