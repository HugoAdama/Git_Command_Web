// src/data/en/gitToolsData.ts
import type { ConflictScenario, GitAlias, GitInternalObject, BisectCommit, GitHook } from '../gitToolsData';

export const conflictScenariosEn: ConflictScenario[] = [
  {
    id: 'auth-config',
    filename: 'src/config/auth.ts',
    description: 'Merge conflict while updating authentication method and JWT token expiration window.',
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
    explanation: 'Both branches modified auth.ts at the exact same lines. Git cannot automatically determine whether to prioritize main\'s local JWT config or feat/oauth2\'s Google OAuth provider.'
  },
  {
    id: 'server-port',
    filename: 'src/server.ts',
    description: 'Conflict in server listening port and host IP binding.',
    currentBranch: 'main',
    incomingBranch: 'feat/docker-env',
    currentCode: `const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';`,
    incomingCode: `const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'; // Docker container bind`,
    commonAncestor: `const PORT = 3000;
const HOST = 'localhost';`,
    explanation: 'One branch adapted the host for Docker container ingress (0.0.0.0:8080), while the other added environment variable fallback for local development (127.0.0.1:3000).'
  }
];

export const gitAliasesEn: GitAlias[] = [
  {
    alias: 'lg',
    command: "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative",
    description: 'Visual, ultra-compact colored history graph formatted into one line per commit.',
    category: 'historial'
  },
  {
    alias: 'st',
    command: 'status -sb',
    description: 'Short status display showing current branch and tracking relation to upstream.',
    category: 'estado'
  },
  {
    alias: 'unstage',
    command: 'restore --staged',
    description: 'Unstages changes from the index without discarding local working tree edits.',
    category: 'deshacer'
  },
  {
    alias: 'undo',
    command: 'reset --soft HEAD~1',
    description: 'Undoes the most recent commit while keeping all changes staged in the index.',
    category: 'deshacer'
  },
  {
    alias: 'amend',
    command: 'commit --amend --no-edit',
    description: 'Stages modifications into the previous commit without opening the message editor.',
    category: 'estado'
  },
  {
    alias: 'br',
    command: 'branch -vv',
    description: 'Lists local branches with their latest commit SHA, message, and remote tracking status.',
    category: 'ramas'
  },
  {
    alias: 'cleanup',
    command: '!git branch --merged | grep -v "\\*" | xargs -n 1 git branch -d',
    description: 'Safely deletes all local branches that have already been merged into the active branch.',
    category: 'ramas'
  },
  {
    alias: 'wip',
    command: '!git add -A && git commit -m "chore: work in progress [skip ci]"',
    description: 'Quickly creates a temporary snapshot commit for uncommitted work in progress.',
    category: 'estado'
  }
];

export const gitInternalsEn: GitInternalObject[] = [
  {
    type: 'blob',
    title: 'Blob (Binary Large Object)',
    subtitle: 'Raw file content storage',
    description: 'A Blob stores only raw compressed bytes of a file using zlib. It does not store file names, permissions, or timestamps—only raw payload addressed by its cryptographic SHA-1 hash.',
    plumbingCommand: 'git cat-file -p 70a34b2',
    sampleHash: '70a34b220377e8a93da26042e9154a43c7b3992d',
    rawPayload: `console.log("Hello World!");
export const API_KEY = "secure_token";`
  },
  {
    type: 'tree',
    title: 'Tree (Directory)',
    subtitle: 'Folder structure and POSIX modes',
    description: 'Analogous to a directory in your filesystem. Lists filenames, POSIX permissions (100644, 100755), and references SHA-1 hashes of Blobs or sub-Trees.',
    plumbingCommand: 'git ls-tree 83ba6fc',
    sampleHash: '83ba6fc59a8523315a0de7ab2ee105e45a27eb2a',
    rawPayload: `100644 blob 70a34b220377e8...    index.js
100644 blob 3b18e512dba79e...    package.json
040000 tree e2084c2a514d2a...    src/`
  },
  {
    type: 'commit',
    title: 'Commit (Immutable Snapshot)',
    subtitle: 'Metadata and root tree pointer',
    description: 'A commit links a root tree hash, one or two parent commit SHAs, author and committer timestamps, and a descriptive commit message.',
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
    title: 'Annotated Tag (Permanent Reference)',
    subtitle: 'Cryptographic immutable milestone',
    description: 'Unlike lightweight tags (which are just text pointers in refs/tags/), an annotated tag is a distinct object with its own author, date, optional GPG signature, and release notes.',
    plumbingCommand: 'git cat-file -p 1c9b4e8',
    sampleHash: '1c9b4e889a716c5d10ef4f2168395da1204859a2',
    rawPayload: `object f4a12099388df6718d09f7b0f69a531cfb562a01
type commit
tag v1.0.0
tagger Release Bot <bot@github.com> 1700005000 -0500

Official production release v1.0.0`
  }
];

export const bisectCommitsEn: BisectCommit[] = [
  { id: '1', hash: 'a1b2c3d', message: 'feat: setup base project structure', author: 'ana@dev.io', isBuggy: false },
  { id: '2', hash: 'e4f5a6b', message: 'feat: add user login endpoint', author: 'carlos@dev.io', isBuggy: false },
  { id: '3', hash: 'c7d8e9f', message: 'fix: handle token expiration', author: 'ana@dev.io', isBuggy: false },
  { id: '4', hash: '1a2b3c4', message: 'perf: optimize sql queries in auth', author: 'pedro@dev.io', isBuggy: false },
  { id: '5', hash: '5e6f7a8', message: 'refactor: change payload signature in parser', author: 'dev99@dev.io', isBuggy: true }, // BUG INTRODUCED HERE
  { id: '6', hash: '9b0c1d2', message: 'style: format response json outputs', author: 'ana@dev.io', isBuggy: true },
  { id: '7', hash: '3e4f5a6', message: 'docs: update api swagger documentation', author: 'carlos@dev.io', isBuggy: true },
  { id: '8', hash: '7b8c9d0', message: 'feat: add analytics event ping', author: 'pedro@dev.io', isBuggy: true }
];

export const gitHooksEn: GitHook[] = [
  {
    name: 'pre-commit',
    stage: 'client',
    purpose: 'Security audit and linter check before commit creation',
    description: 'Runs before the commit message editor opens. If it exits with a non-zero code, the commit is aborted immediately.',
    filename: '.git/hooks/pre-commit',
    sampleScript: `#!/bin/sh
# 1. Prevent accidental .env secrets commit
if git diff --cached --name-only | grep -E "(^|/)\.env"; then
  echo "ERROR: Attempted commit of sensitive .env file detected!"
  echo "Unstage it using: git reset HEAD .env*"
  exit 1
fi

# 2. Run linter on staged files
echo "Running code quality checks..."
npm run lint-staged || exit 1`
  },
  {
    name: 'commit-msg',
    stage: 'client',
    purpose: 'Enforce Conventional Commits specification',
    description: 'Receives the path to the temporary commit message file. Validates that it matches feat:, fix:, docs:, chore:, etc.',
    filename: '.git/hooks/commit-msg',
    sampleScript: `#!/bin/sh
MSG_FILE=$1
COMMIT_MSG=$(cat "$MSG_FILE")

# Validate format: type(scope)?: description
REGEX="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\([a-z0-9_-]+\\))?: .+"

if ! echo "$COMMIT_MSG" | grep -qE "$REGEX"; then
  echo "ERROR: Invalid commit message format!"
  echo "Required format: feat(auth): imperative summary"
  exit 1
fi`
  },
  {
    name: 'pre-push',
    stage: 'client',
    purpose: 'Ensure all tests pass before sending data to remote',
    description: 'Runs immediately before transmitting data to the remote origin server during git push. Prevents broken commits from reaching CI/CD.',
    filename: '.git/hooks/pre-push',
    sampleScript: `#!/bin/sh
echo "Running automated test suite before pushing..."
npm test -- --bail

if [ $? -ne 0 ]; then
  echo "ERROR: Tests failed. The push was aborted to protect the remote branch."
  exit 1
fi`
  }
];
