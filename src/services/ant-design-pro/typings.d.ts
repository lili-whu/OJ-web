declare namespace API {
  type deleteQuestionParams = {
    id: number;
  };

  type deleteUserParams = {
    id: number;
  };

  type fileUploadParams = {
    file: string;
  };

  type getAdminQuestionByIdParams = {
    id: number;
  };

  type getRecordSubmitParams = {
    id: number;
  };

  type getUserQuestionByIdParams = {
    id: number;
  };

  type JudgeCase = {
    input?: string;
    output?: string;
  };

  type JudgeConfig = {
    timeLimit?: number;
    memoryLimit?: number;
  };

  type JudgeInfo = {
    message?: string;
    memoryConsume?: number;
    timeConsume?: number;
    detailMessage?: string;
  };

  type PageResultQuestionAdminVO = {
    total?: number;
    listResult?: QuestionAdminVO[];
  };

  type PageResultQuestionUserVO = {
    total?: number;
    listResult?: QuestionUserVO[];
  };

  type PageResultRecordSubmitVO = {
    total?: number;
    listResult?: RecordSubmitVO[];
  };

  type PageSafetyUserVO = {
    total?: number;
    userList?: SafetyUser[];
  };

  type QuestionAddRequest = {
    title?: string;
    description?: string;
    tags?: string[];
    answer?: string;
    difficulty?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
  };

  type QuestionAdminVO = {
    avatar?: string;
    username?: string;
    id?: number;
    title?: string;
    description?: string;
    difficulty?: string;
    tags?: string[];
    answer?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    acceptNum?: number;
    thumbNum?: number;
    favorNum?: number;
    createId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type QuestionQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    title?: string;
    difficulty?: string;
    description?: string;
    tags?: string[];
    answer?: string;
    createId?: number;
  };

  type QuestionUpdateRequest = {
    id?: number;
    title?: string;
    description?: string;
    difficulty?: string;
    tags?: string[];
    answer?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
  };

  type QuestionUserVO = {
    avatar?: string;
    username?: string;
    id?: number;
    title?: string;
    description?: string;
    tags?: string[];
    difficulty?: string;
    answer?: string;
    judgeConfig?: JudgeConfig;
    recordSubmitVOList?: RecordSubmitVO[];
    submitStatus?: string;
    submitNum?: number;
    acceptNum?: number;
    thumbNum?: number;
    favorNum?: number;
    createId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type RecordSubmitAddRequest = {
    language?: number;
    code?: string;
    questionId?: number;
  };

  type RecordSubmitQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    language?: number;
    result?: number;
    questionId?: number;
    createId?: number;
  };

  type RecordSubmitVO = {
    id?: number;
    language?: number;
    code?: string;
    judgeInfo?: JudgeInfo;
    status?: number;
    questionId?: number;
    createId?: number;
    createTime?: string;
    updateTime?: string;
    safetyUser?: SafetyUser;
  };

  type ResultBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
  };

  type ResultInteger = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ResultLong = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ResultPageResultQuestionAdminVO = {
    code?: number;
    message?: string;
    data?: PageResultQuestionAdminVO;
  };

  type ResultPageResultQuestionUserVO = {
    code?: number;
    message?: string;
    data?: PageResultQuestionUserVO;
  };

  type ResultPageResultRecordSubmitVO = {
    code?: number;
    message?: string;
    data?: PageResultRecordSubmitVO;
  };

  type ResultPageSafetyUserVO = {
    code?: number;
    message?: string;
    data?: PageSafetyUserVO;
  };

  type ResultQuestionAdminVO = {
    code?: number;
    message?: string;
    data?: QuestionAdminVO;
  };

  type ResultQuestionUserVO = {
    code?: number;
    message?: string;
    data?: QuestionUserVO;
  };

  type ResultRecordSubmitVO = {
    code?: number;
    message?: string;
    data?: RecordSubmitVO;
  };

  type ResultSafetyUser = {
    code?: number;
    message?: string;
    data?: SafetyUser;
  };

  type ResultString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type SafetyUser = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatar?: string;
    userRole?: number;
    gender?: number;
    phone?: string;
    email?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
  };

  type SafetyUserDTO = {
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

  type SafetyUserDTOByUser = {
    username?: string;
    userAccount?: string;
    avatar?: string;
    gender?: number;
    phone?: string;
    email?: string;
  };

  type searchUsersParams = {
    pageSize: number;
    current: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    password?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    password?: string;
    confirmPassword?: string;
  };
}
