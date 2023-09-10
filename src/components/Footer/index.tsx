import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'Berger❤️';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'berger',
          title: '个人博客',
          href: 'https://www.xins666.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <a><GithubOutlined />  Berger GitHub</a>,
          href: 'https://github.com/berger10086',
          blankTarget: true,
        }
      ]}
    />
  );
};
export default Footer;
