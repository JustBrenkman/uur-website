export class Competition {
  timestamp: string;
  id: number;
  name: string;
  start: string;
  end: string;
  registration_status: string;
  status: string;
}

export class Task {
  name: string;
  id: number;
  description: string;
  max_value: number;
}

export class Action {
  name: string;
  description: string;
  task_id: number;
  increment_value: number;
}

export class CreateCompetition {
  name: string;
  start: string;
  end: string;
  tasks: Array<Task>;
  actions: Array<Action>;
}
