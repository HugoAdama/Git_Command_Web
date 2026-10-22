export interface GitignoreCategory {
  id: string;
  name: string;
  description: string;
  patterns: string[];
  defaultChecked?: boolean;
}
