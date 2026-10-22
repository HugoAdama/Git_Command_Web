import type { GitignoreCategory } from '../types/gitignore';

export type { GitignoreCategory };

export const gitignorePresets: GitignoreCategory[] = [
  {
    id: 'node-astro',
    name: 'Node.js & Astro',
    description: 'Dependencias de paquetes, compilados y caché de Astro',
    defaultChecked: true,
    patterns: [
      '# Dependencias',
      'node_modules/',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      '',
      '# Salida de compilacion de Astro & frameworks',
      'dist/',
      '.astro/',
      '.cache/',
      '.temp/'
    ]
  },
  {
    id: 'env-secrets',
    name: 'Variables de Entorno & Claves',
    description: 'Archivos .env, credenciales locales y llaves privadas',
    defaultChecked: true,
    patterns: [
      '# Secretos y credenciales de entorno',
      '.env',
      '.env.local',
      '.env.*.local',
      '*.pem',
      '*.key',
      '*.cert',
      'credentials.json'
    ]
  },
  {
    id: 'os-system',
    name: 'Archivos de Sistema (macOS / Windows)',
    description: 'Archivos ocultos de indexación (.DS_Store, Thumbs.db)',
    defaultChecked: true,
    patterns: [
      '# Archivos del sistema operativo',
      '.DS_Store',
      '.AppleDouble',
      '.LSOverride',
      'Thumbs.db',
      'ehthumbs.db',
      'Desktop.ini',
      '$RECYCLE.BIN/'
    ]
  },
  {
    id: 'ides-editors',
    name: 'Editores (VS Code, JetBrains)',
    description: 'Configuraciones locales de editor que no deben compartirse',
    defaultChecked: false,
    patterns: [
      '# Configuraciones de editor',
      '.vscode/*',
      '!.vscode/settings.json',
      '!.vscode/tasks.json',
      '!.vscode/launch.json',
      '!.vscode/extensions.json',
      '.idea/',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.swp'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Entornos virtuales, bytecode y caché __pycache__',
    defaultChecked: false,
    patterns: [
      '# Python bytecode y entornos',
      '__pycache__/',
      '*.py[cod]',
      '*$py.class',
      '.venv/',
      'venv/',
      'ENV/',
      'env/',
      'build/',
      '*.egg-info/'
    ]
  },
  {
    id: 'react-next',
    name: 'React & Next.js',
    description: 'Caché de Next.js y empaquetadores de React',
    defaultChecked: false,
    patterns: [
      '# Next.js y compilacion React',
      '.next/',
      'out/',
      'build/',
      '.turbo/'
    ]
  },
  {
    id: 'testing-coverage',
    name: 'Pruebas & Cobertura',
    description: 'Reportes de cobertura de Jest, Vitest y Playwright',
    defaultChecked: false,
    patterns: [
      '# Reportes de pruebas',
      'coverage/',
      '.nyc_output/',
      'test-results/',
      'playwright-report/',
      'blob-report/'
    ]
  }
];
