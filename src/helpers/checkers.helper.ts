import { IUser } from '../users/users.interface';

function checkURL(url: string): boolean {
  if (url.includes('/api/users')) return true;
  return false;
}

function checkNewUserData(data:string): IUser | false {
  const { userName, age, hobbies }: IUser = JSON.parse(data);
  if (
    typeof userName === 'string'
    && typeof age === 'number'
    && (Array.isArray(hobbies) && hobbies.every((item) => typeof item === 'string'))
  ) {
    return { userName, age, hobbies };
  } return false;
}

export { checkURL, checkNewUserData };
