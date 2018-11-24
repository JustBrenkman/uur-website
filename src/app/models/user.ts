
export class User {
  email: string;
  password: string;
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
  privilege: string;
  school: string
}
