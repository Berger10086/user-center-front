/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.BaseResponse<API.CurrentUser> } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser?.data && currentUser?.data.userRole === 1,
  };
}
