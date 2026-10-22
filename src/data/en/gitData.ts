import type { GitStage, GitHop, GitTopic } from '../../types/git';

export const gitStagesEn: GitStage[] = [
  {
    id: 'working-tree',
    title: 'Working Directory',
    subtitle: 'Your local untracked files',
    icon: 'folder'
  },
  {
    id: 'staging-area',
    title: 'Staging Area',
    subtitle: 'Prepared for the next commit (Index)',
    icon: 'check-square'
  },
  {
    id: 'local-repo',
    title: 'Local Repository',
    subtitle: 'Your commit history (.git)',
    icon: 'git-commit'
  },
  {
    id: 'remote-repo',
    title: 'Remote Repository',
    subtitle: 'GitHub, GitLab, or origin server',
    icon: 'cloud'
  }
];

export const gitHopsEn: GitHop[] = [
  {
    id: 'add',
    command: 'git add',
    title: 'Stage changes',
    description: 'Move changes from the working directory to the Staging Area (Index).',
    fromIndex: 0,
    toIndex: 1,
    commands: [
      {
        command: 'git status',
        description: 'Displays the state of modified, tracked, and untracked files',
        detail: 'Run this before staging files to verify exactly what changed.',
        tag: 'habitual'
      },
      {
        command: 'git diff',
        description: 'Shows unstaged line-by-line code differences',
        detail: 'Compares your working directory against the staging area.',
        tag: 'habitual'
      },
      {
        command: 'git add <file>',
        description: 'Stages a specific file for the next commit',
        detail: 'Example: git add index.html styles.css',
        tag: 'básico'
      },
      {
        command: 'git add .',
        description: 'Stages all changes in the current directory and subdirectories',
        detail: 'Includes modifications, new files, and deletions.',
        tag: 'básico'
      },
      {
        command: 'git add -p',
        description: 'Interactive patch mode: review and stage hunk by hunk',
        detail: 'Best practice for crafting clean, atomic commits.',
        tag: 'avanzado'
      }
    ]
  },
  {
    id: 'commit',
    command: 'git commit',
    title: 'Save to history',
    description: 'Capture a permanent snapshot from staging area into the local repository.',
    fromIndex: 1,
    toIndex: 2,
    commands: [
      {
        command: 'git commit -m "feat: clear message"',
        description: 'Creates a new commit with a descriptive message',
        detail: 'Follow conventions like Conventional Commits (feat, fix, docs, refactor).',
        tag: 'básico'
      },
      {
        command: 'git commit -am "message"',
        description: 'Stages tracked files and commits in a single command',
        detail: 'Does not include untracked new files created recently.',
        tag: 'habitual'
      },
      {
        command: 'git commit --amend',
        description: 'Modifies the most recent commit (add changes or update message)',
        detail: 'Use only before pushing your commit to a shared remote repository.',
        tag: 'avanzado'
      },
      {
        command: 'git log --oneline --graph --decorate',
        description: 'Visualizes commit history in a concise ASCII tree graph',
        detail: 'Essential command to inspect branch divergence and HEAD location.',
        tag: 'habitual'
      }
    ]
  },
  {
    id: 'push',
    command: 'git push',
    title: 'Publish to remote',
    description: 'Upload your local commits to the shared remote repository.',
    fromIndex: 2,
    toIndex: 3,
    commands: [
      {
        command: 'git push origin <branch>',
        description: 'Pushes local commits to the specified remote branch',
        detail: 'Example: git push origin feat/login',
        tag: 'básico'
      },
      {
        command: 'git push -u origin <branch>',
        description: 'Pushes and sets up upstream tracking for future shortcut pushes',
        detail: 'After this, you can just run `git push` or `git pull` on this branch.',
        tag: 'habitual'
      },
      {
        command: 'git push --force-with-lease',
        description: 'Safe force-push: overwrites remote only if no one else pushed new work',
        detail: 'Always prefer this over destructive `git push --force`.',
        tag: 'cuidado'
      },
      {
        command: 'git push origin --delete <branch>',
        description: 'Deletes a feature branch from the remote server after merging',
        detail: 'Keeps the remote repository tidy and free of dead branches.',
        tag: 'habitual'
      }
    ]
  },
  {
    id: 'fetch-pull',
    command: 'git fetch / pull',
    title: 'Download from remote',
    description: 'Retrieve changes from the remote server into your local environment.',
    fromIndex: 3,
    toIndex: 2,
    commands: [
      {
        command: 'git fetch origin',
        description: 'Downloads latest remote references without touching working files',
        detail: 'Safe and non-destructive: updates origin/main without merge conflicts.',
        tag: 'habitual'
      },
      {
        command: 'git pull origin <branch>',
        description: 'Fetches remote changes and merges them immediately into current branch',
        detail: 'Shorthand equivalent to: git fetch + git merge.',
        tag: 'básico'
      },
      {
        command: 'git pull --rebase origin <branch>',
        description: 'Pulls remote changes and replays your local commits on top cleanly',
        detail: 'Avoids cluttering the commit graph with unnecessary merge commits.',
        tag: 'avanzado'
      }
    ]
  },
  {
    id: 'checkout',
    command: 'git restore / checkout',
    title: 'Unstage & Discard',
    description: 'Revert uncommitted modifications or move between commit snapshots.',
    fromIndex: 1,
    toIndex: 0,
    commands: [
      {
        command: 'git restore <file>',
        description: 'Discards uncommitted changes in working directory for a file',
        detail: 'Irreversible action! Restores the file to the last committed state.',
        tag: 'cuidado'
      },
      {
        command: 'git restore --staged <file>',
        description: 'Unstages a file back into working directory without losing edits',
        detail: 'The modern and clear replacement for the confusing `git reset HEAD <file>`.',
        tag: 'habitual'
      },
      {
        command: 'git clean -fd',
        description: 'Removes untracked files and directories from your working tree',
        detail: 'Always run `git clean -nd` first to dry-run and preview what will be erased.',
        tag: 'cuidado'
      }
    ]
  }
];

export const gitTopicsEn: GitTopic[] = [
  {
    id: 'config',
    title: 'Initial Setup',
    description: 'Global Git configuration, identity, default branch, and aliases.',
    badge: 'Config',
    commands: [
      {
        command: 'git config --global user.name "Your Name"',
        description: 'Sets the author name associated with all your future commits',
        detail: 'Configures your identity in ~/.gitconfig.',
        tag: 'básico'
      },
      {
        command: 'git config --global user.email "you@example.com"',
        description: 'Sets the author email associated with your commits',
        detail: 'Must match your GitHub/GitLab verified account email.',
        tag: 'básico'
      },
      {
        command: 'git config --global init.defaultBranch main',
        description: 'Sets "main" as default branch name for all new repositories',
        detail: 'Industry standard replacing legacy master naming.',
        tag: 'habitual'
      },
      {
        command: 'git config --list --show-origin',
        description: 'Displays all active Git configurations and where each file is located',
        detail: 'Great for debugging SSH, credential helper, or user identity conflicts.',
        tag: 'habitual'
      }
    ]
  },
  {
    id: 'branching',
    title: 'Branches & Switching',
    description: 'Create, navigate, rename, and manage isolated lines of development.',
    badge: 'Branches',
    commands: [
      {
        command: 'git branch',
        description: 'Lists all local branches and highlights active branch with asterisk',
        detail: 'Use `git branch -a` to view remote tracking branches as well.',
        tag: 'básico'
      },
      {
        command: 'git switch <branch>',
        description: 'Switches to an existing branch (modern recommended syntax)',
        detail: 'Modern, unambiguous alternative to legacy `git checkout <branch>`.',
        tag: 'básico'
      },
      {
        command: 'git switch -c <new-branch>',
        description: 'Creates a new branch and immediately switches into it',
        detail: 'Example: git switch -c feat/user-authentication',
        tag: 'habitual'
      },
      {
        command: 'git branch -d <branch>',
        description: 'Safely deletes a local branch that has already been merged',
        detail: 'Use -D with caution to force deletion of unmerged branches.',
        tag: 'habitual'
      },
      {
        command: 'git branch -m <new-name>',
        description: 'Renames the currently checked out branch',
        detail: 'Quickly fixes typos in branch names.',
        tag: 'habitual'
      }
    ]
  },
  {
    id: 'merging-rebasing',
    title: 'Merging & Rebase',
    description: 'Integrate feature branches, resolve conflicts, and maintain clean linear history.',
    badge: 'Integrate',
    commands: [
      {
        command: 'git merge <branch>',
        description: 'Merges the specified branch into your current active branch',
        detail: 'Creates a merge commit unless fast-forward is possible.',
        tag: 'básico'
      },
      {
        command: 'git merge --no-ff <branch>',
        description: 'Forces creation of a merge commit even if fast-forward is possible',
        detail: 'Preserves the historical boundary of a feature branch.',
        tag: 'habitual'
      },
      {
        command: 'git rebase <base-branch>',
        description: 'Replays current branch commits on top of base-branch tip',
        detail: 'Creates a pristine linear history without merge bubbles.',
        tag: 'avanzado'
      },
      {
        command: 'git rebase -i HEAD~3',
        description: 'Interactive rebase: squash, edit, reorder, or drop last 3 commits',
        detail: 'Clean up local WIP commits before opening a pull request.',
        tag: 'avanzado'
      },
      {
        command: 'git merge --abort',
        description: 'Aborts an active merge process and resets files to pre-merge state',
        detail: 'Your emergency escape button when merge conflicts get messy.',
        tag: 'cuidado'
      }
    ]
  },
  {
    id: 'stash',
    title: 'Stash & Quick Shelving',
    description: 'Temporarily shelve uncommitted work to switch context without committing.',
    badge: 'Stash',
    commands: [
      {
        command: 'git stash',
        description: 'Saves uncommitted modifications into a temporary stash stack',
        detail: 'Leaves working directory completely clean to switch branches.',
        tag: 'básico'
      },
      {
        command: 'git stash save "wip: working on checkout form"',
        description: 'Saves changes with a clear descriptive message for later retrieval',
        detail: 'Helpful when you have multiple stashes saved.',
        tag: 'habitual'
      },
      {
        command: 'git stash pop',
        description: 'Reapplies the most recent stashed changes and drops it from the stack',
        detail: 'Restores your shelved changes right where you left off.',
        tag: 'básico'
      },
      {
        command: 'git stash list',
        description: 'Lists all currently saved stash entries in the repository',
        detail: 'Displays stash@{0}, stash@{1}, etc.',
        tag: 'habitual'
      },
      {
        command: 'git stash clear',
        description: 'Deletes all stored stashes permanently',
        detail: 'Use with caution: dropped stashes cannot be restored easily.',
        tag: 'cuidado'
      }
    ]
  },
  {
    id: 'undo-rescue',
    title: 'Undo & Reflog Rescue',
    description: 'Recover discarded commits, unstage files, and travel back in time.',
    badge: 'Rescue',
    commands: [
      {
        command: 'git reflog',
        description: 'Chronological safety diary of every HEAD movement in your repository',
        detail: 'Your #1 tool to recover accidentally deleted branches or reset commits.',
        tag: 'avanzado'
      },
      {
        command: 'git reset --soft HEAD~1',
        description: 'Undoes last commit while keeping its changes staged in Index',
        detail: 'Perfect for modifying a commit message or adding forgotten files.',
        tag: 'habitual'
      },
      {
        command: 'git reset --hard HEAD~1',
        description: 'Destroys last commit and wipes out its working directory changes',
        detail: 'Dangerous! Only use if you are 100% sure you want to discard the work.',
        tag: 'cuidado'
      },
      {
        command: 'git revert <commit-hash>',
        description: 'Creates a new commit that records the exact inverse of a past commit',
        detail: 'The safe and standard way to undo bugs already pushed to production.',
        tag: 'habitual'
      }
    ]
  }
];
