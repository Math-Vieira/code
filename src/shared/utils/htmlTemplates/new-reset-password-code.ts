import { DOMAIN } from '../constants/GENERAL_ENV';

export const NEW_RESET_PASSWORD_CODE_TEMPLATE = (
  code: string,
  email: string
): string => {
  const url = DOMAIN;

  return `${code},<br/> ${email},<br/> ${url}`;
};
