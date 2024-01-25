export interface LoginResponse {
  userId: number;
  canAccessApi: boolean;
  email: string;
  roleId: number;
  roleName: string;
  roleType: string;
  is2Faenabled: number;
  emailNotificationStatus: boolean;
  tkxTrading: boolean;
  userType: string;
  token: string;
  refreshToken: string;
  algoInvited: any;
}
