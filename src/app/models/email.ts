export class Email {
  text:	string;
  from:	string;
  to:		string[];
  cc:		string[];
  subject:	string;
  attachment: any[];
}

export class EmailServer {
  user: string;
  password: string;
  host: string;
  ssl: boolean;
}
