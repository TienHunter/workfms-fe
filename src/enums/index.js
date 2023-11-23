const Enums = {
  LoginType: {
    LoginByUsername: 1,
    LoginOther: 2,
  },
  ServiceResponseCode: {
    Success: 0,
    Warning: 1,
    UsernameTaken: 2,
    EmailTaken: 3,
    Error: 99,
    Exception: 999,
  },
  WorkspaceType: {
    Private: 0,
    Public: 1,
  },
  ProjectType: {
    Private: 1,
    Workspace: 2,
    Public: 3
  },
  localStorage: {
    Token: "token",
  },
};
export default Enums;
