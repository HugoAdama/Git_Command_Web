export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'punteros' | 'remotos' | 'estructuras' | 'operaciones';
  metaphor: string;
  definition: string;
  sampleCommand?: string;
}
