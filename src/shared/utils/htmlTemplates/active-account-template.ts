import { DOMAIN } from '../constants/GENERAL_ENV';

export const ACTIVE_ACCOUNT_EMAIL_TEMPLATE = (
  userName: string,
  code: string,
  email: string
): string => {
  const url = DOMAIN;

  return `${userName},<br/> ${code},<br/> ${email},<br/> ${url}`;
};
