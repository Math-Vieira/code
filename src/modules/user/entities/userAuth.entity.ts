export interface UserAuthEntity {
  id: string;
  user_id: string;
  admin: boolean;
  is_active: boolean;
  activation_code: string;
  activation_code_expiration: string;
  recover_password_code: string | null;
  recover_password_code_expiration: string | null;
}
