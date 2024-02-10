// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number;

    username?: string;

    userAccount?: string;

    avatar?: string;

    userRole?: number;

    gender?: number;

    phone?: string;

    email?: string;

    status?: number;

    createTime?: Date;

    updateTime?: Date;
  };

  type CurrentUserDTO = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatar?: string;
    userRole?: number;
    gender?: number;
    phone?: string;
    email?: string;
    status?: number;
  };

  /**
   * 对接后端的通用返回类
   */
  type Result<T> = {
    message?: string;
    code?: number;
    data?: T;
  };
  // data直接是number而不是对象
  type RegisterResult = number;
  type LogOutResult = number;
  type SearchResult = {
    total: number;
    userList: CurrentUser[];
  };
  type LoginResult = CurrentUser;
  type DeleteResult = boolean;
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  // 登录传递的参数
  type LoginParams = {
    userAccount?: string;
    password?: string;
  };

  // 注册传递的参数
  type RegisterParams = {
    userAccount?: string;
    password?: string;
    confirmPassword?: string;
  };

  type MdProps = {
    value?: string;
    onValueChange;
  };
}
