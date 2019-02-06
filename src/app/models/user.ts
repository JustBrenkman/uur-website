
export class User {
  email: string;
  password: string;
  remember: boolean;
}

export class UserAdd {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  privilege: string;
  school: string;
}

export class UserFull {
  timestamp: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  privileges: string;
  school: string;
  status: string;
  last_log_in: string;
}

export class UserEdit {
  timestamp: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  privilege: string;
  school: string;
  status: string;
}
