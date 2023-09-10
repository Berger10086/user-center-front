import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {message} from 'antd';
// import {Alert, message} from 'antd';
import React, {useState} from 'react';
import {history, useModel} from 'umi';
import styles from './index.less';

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({content}) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );
const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  //获取登录用户信息
  const fetchUserInfo = async () => {
    const res = await initialState?.fetchUserInfo?.();
    if (res?.data) {
      // @ts-ignore
      await setInitialState((s) => ({
        ...s,
        currentUser: res,
      }));
    }
  };
  // 登陆操作
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({
        ...values,
        type,
      })
      if (user) {
        const defaultLoginSuccessMessage = "登陆成功！";
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
      // setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  // const {status, type: loginType} = userLoginState;
  // const {type: loginType} = userLoginState;
  const findPassword = () => {
    message.error('功能未开启');
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg"/>}
          title="芝士用户后台管理系统"
          subTitle={'User background management system'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >

          {type === 'account' && (
            <>
              <ProFormText
                initialValue={'admin'}
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'系统预览账号：admin'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  }, {
                    required: true,
                    min: 5,
                    type: 'string',
                    message: '用户名最小长度为5位！',
                  },
                ]}
              />
              <ProFormText.Password
                initialValue={'123123'}
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'系统预览密码：123123'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  }, {
                    required: true,
                    min: 6,
                    type: 'string',
                    message: '密码最小长度为6位！',
                  },
                ]}
              />
            </>
          )}


          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              onClick={findPassword}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
