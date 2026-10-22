// src/data/gitToolsData.ts

export interface ConflictScenario {
  id: string;
  filename: string;
  description: string;
  currentBranch: string;
  incomingBranch: string;
  currentCode: string;
  incomingCode: string;
  commonAncestor: string;
  explanation: string;
}

export const conflictScenariosEs: ConflictScenario[] = [
  {
    id: 'auth-config',
    filename: 'src/config/auth.ts',
    description: 'Conflicto al actualizar el método de autenticación y tiempo de expiración del token JWT.',
    currentBranch: 'main',
    incomingBranch: 'feat/oauth2',
    currentCode: `export const AUTH_CONFIG = {
  provider: 'jwt-local',
  tokenExpiry: '24h',
  refreshWindow: 3600
};`,
    incomingCode: `export const AUTH_CONFIG = {
  provider: 'oauth2-google',
  tokenExpiry: '12h',
  scopes: ['profile', 'email']
};`,
    commonAncestor: `export const AUTH_CONFIG = {
  provider: 'jwt-local',
  tokenExpiry: '1h'
};`,
    explanation: 'Ambas ramas modificaron el archivo auth.ts en las mismas líneas. Git no puede decidir automáticamente si priorizar la configuración local de main o la integración OAuth2 de feat/oauth2.'
  },
  {
    id: 'server-port',
    filename: 'src/server.ts',
    description: 'Conflicto en la variable de entorno y puerto de escucha de la API.',
    currentBranch: 'main',
    incomingBranch: 'feat/docker-env',
    currentCode: `const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';`,
    incomingCode: `const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'; // Docker container bind`,
    commonAncestor: `const PORT = 3000;
const HOST = 'localhost';`,
    explanation: 'Una rama adaptó el host para contenedores Docker (0.0.0.0:8080), mientras que la otra añadió fallback a variables de entorno para desarrollo local (127.0.0.1:3000).'
  }
];

export interface GitAlias {
  alias: string;
  command: string;
  description: string;
  category: 'historial' | 'estado' | 'deshacer' | 'ramas';
}

export const gitAliasesEs: GitAlias[] = [
  {
    alias: 'lg',
    command: "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative",
    description: 'Grafo de historial visual, ultra compacto y coloreado en una línea por commit.',
    category: 'historial'
  },
  {
    alias: 'st',
    command: 'status -sb',
    description: 'Estado breve (short) mostrando la rama actual y la relación con upstream.',
    category: 'estado'
  },
  {
    alias: 'unstage',
    command: 'restore --staged',
    description: 'Saca archivos del Staging Area sin perder las modificaciones locales.',
    category: 'deshacer'
  },
  {
    alias: 'undo',
    command: 'reset --soft HEAD~1',
    description: 'Deshace el último commit pero conserva todos los cambios en el Staging Area.',
    category: 'deshacer'
  },
  {
    alias: 'amend',
    command: 'commit --amend --no-edit',
    description: 'Agrega los archivos en staging al commit anterior sin abrir el editor de mensaje.',
    category: 'estado'
  },
  {
    alias: 'br',
    command: 'branch -vv',
    description: 'Lista ramas locales con su último commit y estado de tracking remoto.',
    category: 'ramas'
  },
  {
    alias: 'cleanup',
    command: '!git branch --merged | grep -v "\\*" | xargs -n 1 git branch -d',
    description: 'Elimina de forma segura todas las ramas locales que ya fueron fusionadas.',
    category: 'ramas'
  },
  {
    alias: 'wip',
    command: '!git add -A && git commit -m "chore: work in progress [skip ci]"',
    description: 'Guarda rápidamente un snapshot temporal de trabajo en progreso.',
    category: 'estado'
  }
];

export interface GitInternalObject {
  type: 'blob' | 'tree' | 'commit' | 'tag';
  title: string;
  subtitle: string;
  description: string;
  plumbingCommand: string;
  sampleHash: string;
  rawPayload: string;
}

export const gitInternalsEs: GitInternalObject[] = [
  {
    type: 'blob',
    title: 'Blob (Binary Large Object)',
    subtitle: 'Almacenamiento de contenido puro',
    description: 'Un Blob solo almacena los bytes de un archivo comprimidos con zlib. No guarda el nombre del archivo, los permisos ni la fecha; solo el contenido puro indexado por su hash SHA-1.',
    plumbingCommand: 'git cat-file -p 70a34b2',
    sampleHash: '70a34b220377e8a93da26042e9154a43c7b3992d',
    rawPayload: `console.log("Hola Mundo!");
export const API_KEY = "segura";`
  },
  {
    type: 'tree',
    title: 'Tree (Directorio)',
    subtitle: 'Estructura de carpetas y permisos',
    description: 'Equivalente a un directorio en el sistema de archivos. Lista nombres de archivos, permisos POSIX (100644, 100755) y apunta a los hashes de los Blobs o a otros sub-Trees.',
    plumbingCommand: 'git ls-tree 83ba6fc',
    sampleHash: '83ba6fc59a8523315a0de7ab2ee105e45a27eb2a',
    rawPayload: `100644 blob 70a34b220377e8...    index.js
100644 blob 3b18e512dba79e...    package.json
040000 tree e2084c2a514d2a...    src/`
  },
  {
    type: 'commit',
    title: 'Commit (Snapshot inalterable)',
    subtitle: 'Metadatos y puntero al árbol raíz',
    description: 'Un commit enlaza un árbol raíz (tree), uno o dos padres (parent commit), autor, committer con timestamp exacto, y el mensaje descriptivo.',
    plumbingCommand: 'git cat-file -p f4a1209',
    sampleHash: 'f4a12099388df6718d09f7b0f69a531cfb562a01',
    rawPayload: `tree 83ba6fc59a8523315a0de7ab2ee105e45a27eb2a
parent d19a202c484a51167b66ec0e029283e741c91ffb
author Linus Torvalds <torvalds@kernel.org> 1700000000 -0500
committer Linus Torvalds <torvalds@kernel.org> 1700000000 -0500

feat: initial clean commit snapshot`
  },
  {
    type: 'tag',
    title: 'Annotated Tag (Etiqueta Anotada)',
    subtitle: 'Puntero permanente e inmutable',
    description: 'A diferencia de una etiqueta ligera (que solo es un puntero en refs/tags/), una etiqueta anotada es un objeto completo con autor, fecha, firma GPG opcional y mensaje de release.',
    plumbingCommand: 'git cat-file -p 1c9b4e8',
    sampleHash: '1c9b4e889a716c5d10ef4f2168395da1204859a2',
    rawPayload: `object f4a12099388df6718d09f7b0f69a531cfb562a01
type commit
tag v1.0.0
tagger Release Bot <bot@github.com> 1700005000 -0500

Release oficial v1.0.0 de produccion`
  }
];

export interface BisectCommit {
  id: string;
  hash: string;
  message: string;
  author: string;
  isBuggy: boolean;
}

export const bisectCommitsEs: BisectCommit[] = [
  { id: '1', hash: 'a1b2c3d', message: 'feat: setup base project structure', author: 'ana@dev.io', isBuggy: false },
  { id: '2', hash: 'e4f5a6b', message: 'feat: add user login endpoint', author: 'carlos@dev.io', isBuggy: false },
  { id: '3', hash: 'c7d8e9f', message: 'fix: handle token expiration', author: 'ana@dev.io', isBuggy: false },
  { id: '4', hash: '1a2b3c4', message: 'perf: optimize sql queries in auth', author: 'pedro@dev.io', isBuggy: false },
  { id: '5', hash: '5e6f7a8', message: 'refactor: change payload signature in parser', author: 'dev99@dev.io', isBuggy: true }, // BUG INTRODUCED HERE
  { id: '6', hash: '9b0c1d2', message: 'style: format response json outputs', author: 'ana@dev.io', isBuggy: true },
  { id: '7', hash: '3e4f5a6', message: 'docs: update api swagger documentation', author: 'carlos@dev.io', isBuggy: true },
  { id: '8', hash: '7b8c9d0', message: 'feat: add analytics event ping', author: 'pedro@dev.io', isBuggy: true }
];

export interface GitHook {
  name: string;
  stage: 'client' | 'server';
  purpose: string;
  description: string;
  filename: string;
  sampleScript: string;
}

export const gitHooksEs: GitHook[] = [
  {
    name: 'pre-commit',
    stage: 'client',
    purpose: 'Auditoría de seguridad y linter antes de crear el commit',
    description: 'Se ejecuta antes de que se abra el editor para el mensaje del commit. Si sale con código distinto de cero, el commit se cancela inmediatamente.',
    filename: '.git/hooks/pre-commit',
    sampleScript: `#!/bin/sh
# 1. Prevenir commit de archivos .env accidentales
if git diff --cached --name-only | grep -E "(^|/)\.env"; then
  echo "ERROR: Intento de commit de archivo .env detectado!"
  echo "Elimínalo del Staging Area con: git reset HEAD .env*"
  exit 1
fi

# 2. Ejecutar linter en archivos en preparación
echo "Ejecutando verificacion de codigo..."
npm run lint-staged || exit 1`
  },
  {
    name: 'commit-msg',
    stage: 'client',
    purpose: 'Exigir estándar Conventional Commits en el mensaje',
    description: 'Recibe como parámetro la ruta del archivo temporal con el mensaje de commit. Permite validar que cumpla el formato feat:, fix:, docs:, etc.',
    filename: '.git/hooks/commit-msg',
    sampleScript: `#!/bin/sh
MSG_FILE=$1
COMMIT_MSG=$(cat "$MSG_FILE")

# Validar formato: tipo(alcance)?: descripcion
REGEX="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\([a-z0-9_-]+\\))?: .+"

if ! echo "$COMMIT_MSG" | grep -qE "$REGEX"; then
  echo "ERROR: Mensaje de commit invalido!"
  echo "Formato requerido: feat(auth): descripcion en imperativo"
  exit 1
fi`
  },
  {
    name: 'pre-push',
    stage: 'client',
    purpose: 'Garantizar que las pruebas unitarias pasen antes de enviar a remoto',
    description: 'Se ejecuta justo antes de transferir datos al servidor remoto con git push. Ideal para evitar romper el pipeline CI/CD en GitHub.',
    filename: '.git/hooks/pre-push',
    sampleScript: `#!/bin/sh
echo "Ejecutando suite de pruebas antes de hacer push..."
npm test -- --bail

if [ $? -ne 0 ]; then
  echo "ERROR: Pruebas fallidas. El push ha sido cancelado para proteger el repositorio remoto."
  exit 1
fi`
  }
];
