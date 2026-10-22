export interface GitCommand {
  command: string;
  description: string;
  detail?: string;
  category?: string;
  tag?: 'básico' | 'habitual' | 'avanzado' | 'cuidado';
}

export interface GitStage {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface GitHop {
  id: string;
  command: string;
  title: string;
  description: string;
  fromIndex: number;
  toIndex: number;
  isReverse?: boolean;
  commands: GitCommand[];
}

export interface GitTopic {
  id: string;
  title: string;
  badge?: string;
  description: string;
  commands: GitCommand[];
}
