export interface GitSosStep {
  command: string;
  explanation: string;
}

export interface GitSosScenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'commits' | 'ramas' | 'archivos' | 'conflictos';
  severity: 'baja' | 'media' | 'alta';
  problem: string;
  solutionSummary: string;
  steps: GitSosStep[];
  tip?: string;
  dangerNotice?: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  command: string;
  expectedOutput?: string;
  mentalModelNote: string;
}

export interface GitWorkflow {
  id: string;
  title: string;
  badge: string;
  description: string;
  steps: WorkflowStep[];
}

export interface ComparisonDetail {
  name: string;
  description: string;
  whenToUse: string;
  pros: string[];
  cons: string[];
}

export interface ComparisonItem {
  id: string;
  title: string;
  commandA: ComparisonDetail;
  commandB: ComparisonDetail;
  keyTakeaway: string;
}

export interface QuizOption {
  label: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: QuizOption[];
}

export interface SimulatedCommand {
  cmd: string;
  output: string;
  stageActive: number;
  label: string;
}
