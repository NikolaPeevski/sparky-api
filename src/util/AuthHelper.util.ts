import { Action } from 'routing-controllers';

const authHandler = (action: Action, roles: string[]): boolean => {
  console.log(action);
  return true;
};

export default { authHandler };
