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
  limit: number;
}

export class CreateCompetition {
  name: string;
  start: string;
  end: string;
  tasks: Array<Task>;
  actions: Array<Action>;
}

export class Score {
  constructor(id: number, taskValue: any) {
    this.task_id = id;
    this.score = taskValue;
  }

  task_id: number;
  score: number;
}

export class Scoreboard {
  team_number: String;
  score: number;
}

export class TaskScores {
  constructor() {
    this.scores = [];
  }
  scores: Score[];
  addScore(score: Score) {
    this.scores.push(score);
  }
}
