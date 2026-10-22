import type {
  GitSosScenario,
  GitWorkflow,
  ComparisonItem,
  QuizQuestion,
  SimulatedCommand
} from '../../types/educational';

export const gitSosScenariosEn: GitSosScenario[] = [
  {
    id: 'commit-wrong-branch',
    title: 'Committed directly to the wrong branch (e.g. main)',
    subtitle: 'Move your latest commit to a new feature branch safely',
    category: 'ramas',
    severity: 'media',
    problem: 'You made code changes and committed directly to the main branch instead of creating an isolated feature branch.',
    solutionSummary: 'Create the desired branch at the current point, then rewind main by 1 commit cleanly.',
    steps: [
      {
        command: 'git branch feat/my-correct-branch',
        explanation: 'Creates the new feature branch pointer right at the current commit.'
      },
      {
        command: 'git reset --hard HEAD~1',
        explanation: 'Rewinds main branch back by 1 commit, leaving main pristine.'
      },
      {
        command: 'git switch feat/my-correct-branch',
        explanation: 'Switches into your new branch where your commit is waiting untouched.'
      }
    ],
    tip: 'If you already pushed the commit to GitHub, avoid reset --hard; use `git revert` to create an audit-safe inverse commit.'
  },
  {
    id: 'commit-wrong-message',
    title: 'Typo in last commit message or forgot a file',
    subtitle: 'Fix the most recent commit instantly',
    category: 'commits',
    severity: 'baja',
    problem: 'You made a typo in the commit message or realized you forgot to stage one more file.',
    solutionSummary: 'Use the --amend flag to update the latest commit without duplicating history.',
    steps: [
      {
        command: 'git add forgotten-file.js',
        explanation: '(Optional) If you missed a file, stage it first with git add.'
      },
      {
        command: 'git commit --amend -m "feat: corrected descriptive message"',
        explanation: 'Overwrites the message and absorbs staged files into the previous commit.'
      }
    ],
    dangerNotice: 'Only use --amend before pushing your commit to a remote shared repository.'
  },
  {
    id: 'committed-env-secret',
    title: 'Accidentally committed API keys, secrets, or .env',
    subtitle: 'Remove sensitive files before deploying to production',
    category: 'archivos',
    severity: 'alta',
    problem: 'You staged and committed private credentials or secrets into your local Git repository.',
    solutionSummary: 'Untrack the file from Git index immediately and add it to .gitignore.',
    steps: [
      {
        command: 'echo ".env" >> .gitignore',
        explanation: 'Ensures Git ignores future edits to the secret configuration file.'
      },
      {
        command: 'git rm --cached .env',
        explanation: 'Removes .env from Git tracking without deleting it from your local disk.'
      },
      {
        command: 'git commit -m "chore: remove sensitive env credentials from tracking"',
        explanation: 'Records the removal in history.'
      }
    ],
    tip: 'If you already pushed secrets to GitHub, immediately rotate and revoke the compromised API keys in your provider dashboard.'
  },
  {
    id: 'undo-merge-conflict',
    title: 'Merge conflicts got out of hand',
    subtitle: 'Abort the merge and return to a clean working state',
    category: 'conflictos',
    severity: 'media',
    problem: 'You ran git merge, encountered dozens of conflict markers (<<<<<<<), and want to start over.',
    solutionSummary: 'Use the official abort switch to revert files back to the exact pre-merge state.',
    steps: [
      {
        command: 'git merge --abort',
        explanation: 'Cancels the merge in progress and cleanly restores all files.'
      }
    ],
    tip: 'If resolving an interactive rebase conflict, the equivalent command is `git rebase --abort`.'
  },
  {
    id: 'lost-commit-deleted-branch',
    title: 'Accidentally deleted a branch or lost commits',
    subtitle: 'Time travel rescue using the Git Reflog diary',
    category: 'ramas',
    severity: 'alta',
    problem: 'You deleted a branch thinking it was merged, or ran git reset --hard by mistake.',
    solutionSummary: 'Git never deletes commits immediately. Find the SHA hash in reflog and resurrect it.',
    steps: [
      {
        command: 'git reflog',
        explanation: 'Displays a chronological ledger of every time HEAD moved in your repository.'
      },
      {
        command: 'git switch -c recovered-branch HEAD@{2}',
        explanation: 'Creates a new branch pointing directly to the commit before the accidental deletion.'
      }
    ],
    tip: 'Git Reflog keeps orphaned commits for roughly 30 to 90 days before running garbage collection.'
  }
];

export const gitWorkflowsDataEn: GitWorkflow[] = [
  {
    id: 'wf-first-repo',
    title: 'Publish First Repository to Cloud',
    badge: 'Beginner',
    description: 'Learn the exact initial sequence to turn a local directory into a cloud-hosted Git repo.',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Git locally',
        description: 'Creates the hidden .git directory to begin version control.',
        command: 'git init',
        mentalModelNote: 'Spawns a local ledger for this project folder.'
      },
      {
        stepNumber: 2,
        title: 'Stage all initial files',
        description: 'Prepares your code in the Staging Area.',
        command: 'git add .',
        mentalModelNote: 'Packs everything into the first shipping crate.'
      },
      {
        stepNumber: 3,
        title: 'Create genesis commit',
        description: 'Creates your initial permanent snapshot.',
        command: 'git commit -m "feat: initial project setup"',
        mentalModelNote: 'Seals the first milestone in your local history.'
      },
      {
        stepNumber: 4,
        title: 'Link remote repository',
        description: 'Connects your local project with GitHub/GitLab origin URL.',
        command: 'git remote add origin https://github.com/user/my-repo.git',
        mentalModelNote: 'Establishes the communication conduit to the cloud.'
      },
      {
        stepNumber: 5,
        title: 'Publish commits to remote',
        description: 'Uploads your main branch and sets upstream tracking.',
        command: 'git push -u origin main',
        mentalModelNote: 'Syncs your local safe to the cloud server.'
      }
    ]
  },
  {
    id: 'wf-feature-branch',
    title: 'Team Collaboration (Feature Branch Workflow)',
    badge: 'Collaboration',
    description: 'The global industry standard for developers working in parallel.',
    steps: [
      {
        stepNumber: 1,
        title: 'Synchronize local main',
        description: 'Pull latest approved changes from teammates before branching.',
        command: 'git switch main && git pull',
        mentalModelNote: 'Ensures you branch off the freshest codebase.'
      },
      {
        stepNumber: 2,
        title: 'Create task branch',
        description: 'Open an isolated branch lane with a descriptive semantic name.',
        command: 'git switch -c feat/oauth-authentication',
        mentalModelNote: 'Isolates code so bugs never affect production main.'
      },
      {
        stepNumber: 3,
        title: 'Stage and commit milestones',
        description: 'Record small, atomic units of work.',
        command: 'git add . && git commit -m "feat(auth): add google sign-in"',
        mentalModelNote: 'Provides clear check-ins for code reviewers.'
      },
      {
        stepNumber: 4,
        title: 'Push and open Pull Request',
        description: 'Upload branch to GitHub to request team peer review.',
        command: 'git push -u origin feat/oauth-authentication',
        mentalModelNote: 'Shares your code for review without directly touching main.'
      }
    ]
  },
  {
    id: 'wf-resolve-conflict',
    title: 'Merge Conflict Resolution',
    badge: 'Essential',
    description: 'Master how to identify, resolve, and commit when two people edit the same lines.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify colliding files',
        description: 'Git flags files with overlapping changes.',
        command: 'git status',
        mentalModelNote: 'Conflicted files are listed under "both modified".'
      },
      {
        stepNumber: 2,
        title: 'Inspect conflict markers',
        description: 'Open file and look for <<<<<<< HEAD and >>>>>>> branch.',
        command: 'code <conflicted-file>',
        mentalModelNote: 'Decide which changes to keep, delete markers, and save.'
      },
      {
        stepNumber: 3,
        title: 'Stage resolved files',
        description: 'Tells Git you resolved the differences.',
        command: 'git add <resolved-file>',
        mentalModelNote: 'Marks the conflict as settled in the index.'
      },
      {
        stepNumber: 4,
        title: 'Finalize the merge commit',
        description: 'Completes the merge process cleanly.',
        command: 'git commit -m "merge: resolve conflicts with main"',
        mentalModelNote: 'Closes the conflict loop permanently.'
      }
    ]
  }
];

export const gitComparisonsDataEn: ComparisonItem[] = [
  {
    id: 'fetch-vs-pull',
    title: 'git fetch vs git pull',
    commandA: {
      name: 'git fetch',
      description: 'Downloads latest commits, refs, and branches from the remote server WITHOUT altering your working directory files.',
      whenToUse: 'When you want to see what your teammates pushed without risking merge conflicts in your active files.',
      pros: [
        '100% safe and non-destructive',
        'Allows diffing against origin/main before integrating'
      ],
      cons: [
        'Does not update your local branch files automatically'
      ]
    },
    commandB: {
      name: 'git pull',
      description: 'Executes git fetch and immediately merges remote changes into your current active local branch.',
      whenToUse: 'When you want to update your local branch quickly and you know your working tree is clean.',
      pros: [
        'One-step convenience',
        'Saves time in routine updates'
      ],
      cons: [
        'Can trigger unexpected merge conflicts while you are in the middle of coding',
        'Can create unnecessary merge bubbles if not using --rebase'
      ]
    },
    keyTakeaway: 'git pull = git fetch + git merge. Fetch to inspect safely; pull to integrate immediately.'
  },
  {
    id: 'merge-vs-rebase',
    title: 'git merge vs git rebase',
    commandA: {
      name: 'git merge',
      description: 'Combines two independent branch histories by creating an explicit join commit with two parent commits.',
      whenToUse: 'When closing a feature branch via Pull Request to preserve historical context of branch lifetime.',
      pros: [
        'Completely non-destructive',
        'Preserves exact chronological timestamps'
      ],
      cons: [
        'Can clutter commit graph with noisy "Merge branch" commits'
      ]
    },
    commandB: {
      name: 'git rebase',
      description: 'Takes your feature commits and replays them one by one on top of the newest commit of the base branch.',
      whenToUse: 'To clean up local commits before opening a Pull Request and keep history completely linear.',
      pros: [
        'Creates a pristine linear history',
        'Makes git bisect debugging much easier'
      ],
      cons: [
        'Golden Rule: NEVER rebase a public branch already shared with others'
      ]
    },
    keyTakeaway: 'Use rebase locally to keep your feature branch up to date; use merge to close Pull Requests into main.'
  },
  {
    id: 'restore-vs-reset-vs-revert',
    title: 'git restore vs git reset vs git revert',
    commandA: {
      name: 'git restore & reset',
      description: 'Affects the local working tree and index. Restore discards uncommitted file edits; reset moves branch pointers.',
      whenToUse: 'To undo uncommitted mistakes or rearrange local unpushed commits.',
      pros: [
        'Cleans up your local workspace quickly',
        'Modern git restore prevents accidental checkout bugs'
      ],
      cons: [
        'git reset --hard is destructive and deletes uncommitted work permanently',
        'Must never be used on branches already pushed to remote'
      ]
    },
    commandB: {
      name: 'git revert',
      description: 'Creates a brand NEW commit that applies the mathematically exact inverse of the commit you wish to cancel.',
      whenToUse: 'Whenever a bug has already been pushed to main, GitHub, or production.',
      pros: [
        '100% safe for shared public branches',
        'Never rewrites past history; adds a transparent audit record'
      ],
      cons: [
        'Adds one more commit to the repository history'
      ]
    },
    keyTakeaway: 'Local and unpushed: use restore or reset. Already pushed to GitHub: use revert.'
  },
  {
    id: 'switch-vs-checkout',
    title: 'git switch vs git checkout',
    commandA: {
      name: 'git switch',
      description: 'Modern command (Git 2.23+) designed with a single responsibility: navigate or create branches.',
      whenToUse: 'Whenever you change branches or create a new branch using the -c flag.',
      pros: [
        'Intuitive syntax with zero ambiguity',
        'No risk of accidentally overwriting file content'
      ],
      cons: [
        'Only handles branches (file restoration moved to git restore)'
      ]
    },
    commandB: {
      name: 'git checkout',
      description: 'Legacy multi-tool command that handled branch navigation and file discarding at the same time.',
      whenToUse: 'Only in legacy tutorials or older systems with outdated Git binaries.',
      pros: [
        'Widely mentioned on older StackOverflow answers'
      ],
      cons: [
        'Confusing syntax: a missed argument could wipe out a file instead of switching branches',
        'Deprecated in practice by the Git core maintainers'
      ]
    },
    keyTakeaway: 'Use `git switch` for branches and `git restore` for files. Leave checkout in the past.'
  }
];

export const gitQuizQuestionsEn: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'You edited "styles.css" and ran "git add styles.css", but realized you are not ready to commit it yet.',
    question: 'Which modern command unstages "styles.css" without losing your written code?',
    options: [
      {
        label: 'git restore --staged styles.css',
        isCorrect: true,
        explanation: 'Correct: "git restore --staged" removes the file from the Staging Area (index) while keeping your code intact in your working directory.'
      },
      {
        label: 'git rm styles.css',
        isCorrect: false,
        explanation: 'Danger: "git rm" would delete the file from the repository and your hard drive.'
      },
      {
        label: 'git reset --hard',
        isCorrect: false,
        explanation: 'Danger: "git reset --hard" destroys all uncommitted changes.'
      },
      {
        label: 'git revert styles.css',
        isCorrect: false,
        explanation: 'Incorrect: "git revert" operates on committed commit hashes, not on staged files.'
      }
    ]
  },
  {
    id: 2,
    scenario: 'You want to create a branch named "feat/profile" and switch to it immediately in a single step using modern Git syntax.',
    question: 'What is the recommended command according to current Git official documentation?',
    options: [
      {
        label: 'git switch -c feat/profile',
        isCorrect: true,
        explanation: 'Excellent: "git switch -c" (or --create) is the modern standard to create and jump into a branch without checkout ambiguity.'
      },
      {
        label: 'git branch feat/profile -c',
        isCorrect: false,
        explanation: 'Incorrect: "git branch" creates the branch but does not switch your working directory to it.'
      },
      {
        label: 'git merge -c feat/profile',
        isCorrect: false,
        explanation: 'Incorrect: "git merge" combines existing branches.'
      },
      {
        label: 'git new branch feat/profile',
        isCorrect: false,
        explanation: 'Invalid command: Git has no "new" command.'
      }
    ]
  },
  {
    id: 3,
    scenario: 'You are working on a feature and your manager asks you to urgently review a hotfix on main. You have unfinished code and do not want to create an ugly WIP commit.',
    question: 'How can you temporarily shelve your uncommitted work safely?',
    options: [
      {
        label: 'git stash',
        isCorrect: true,
        explanation: 'Correct: "git stash" shelves your uncommitted work onto a temporary stack, leaving your directory clean to switch branches. Run `git stash pop` later to restore it.'
      },
      {
        label: 'git clean -fd',
        isCorrect: false,
        explanation: 'Warning: "git clean -fd" permanently erases untracked files from disk.'
      },
      {
        label: 'git reset --hard',
        isCorrect: false,
        explanation: 'Destructive: would wipe out all your work in progress.'
      },
      {
        label: 'git checkout main -f',
        isCorrect: false,
        explanation: 'Forcing a switch risks losing uncommitted edits.'
      }
    ]
  },
  {
    id: 4,
    scenario: 'A commit introduced a critical production bug and is already merged into the public "main" branch on GitHub.',
    question: 'What is the safest, team-friendly command to undo this change in production?',
    options: [
      {
        label: 'git revert <commit-hash>',
        isCorrect: true,
        explanation: 'Perfect: "git revert" creates a new commit that inverts the buggy changes without rewriting history, making it 100% safe for shared branches.'
      },
      {
        label: 'git reset --hard HEAD~1 && git push -f',
        isCorrect: false,
        explanation: 'Hazardous: force-pushing rewritten history breaks other teammates local copies.'
      },
      {
        label: 'git drop <commit-hash>',
        isCorrect: false,
        explanation: 'Invalid command: git has no drop command.'
      },
      {
        label: 'git rm -r .',
        isCorrect: false,
        explanation: 'Catastrophic: would delete the entire project.'
      }
    ]
  },
  {
    id: 5,
    scenario: 'You just ran "git commit -m \'fix: responsive header\'" and immediately realized you forgot to stage "header.css".',
    question: 'How do you absorb "header.css" into the commit you just made without creating a second commit?',
    options: [
      {
        label: 'git add header.css && git commit --amend --no-edit',
        isCorrect: true,
        explanation: 'Brilliant: "git commit --amend --no-edit" absorbs the newly staged file into the previous commit while keeping the same commit message.'
      },
      {
        label: 'git commit -m "fix"',
        isCorrect: false,
        explanation: 'Creates a redundant commit that pollutes history.'
      },
      {
        label: 'git reset --hard',
        isCorrect: false,
        explanation: 'Destroys the modification you wanted to keep.'
      },
      {
        label: 'git push --force',
        isCorrect: false,
        explanation: 'Does not add the missing file; only pushes what you already had.'
      }
    ]
  }
];

export const terminalMockDataEn: SimulatedCommand[] = [
  {
    cmd: 'git status',
    label: 'Initial state',
    stageActive: 0,
    output: `On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/app.js
	modified:   public/styles.css

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	src/auth.js

no changes added to commit (use "git add" to track)`
  },
  {
    cmd: 'git add .',
    label: 'Stage files',
    stageActive: 1,
    output: `On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   src/app.js
	modified:   public/styles.css
	new file:   src/auth.js`
  },
  {
    cmd: 'git commit -m "feat: user authentication flow"',
    label: 'Record commit',
    stageActive: 2,
    output: `[main 9d4f1a2] feat: user authentication flow
 3 files changed, 48 insertions(+), 6 deletions(-)
 create mode 100644 src/auth.js`
  },
  {
    cmd: 'git push origin main',
    label: 'Push to remote',
    stageActive: 3,
    output: `Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 624 bytes | 624.00 KiB/s, done.
Total 4 (delta 2), reused 0 (delta 0), pack-reused 0
To https://github.com/developer/git-command-web.git
   b23f81e..9d4f1a2  main -> main`
  },
  {
    cmd: 'git log --oneline --graph',
    label: 'View history',
    stageActive: 2,
    output: `* 9d4f1a2 (HEAD -> main, origin/main) feat: user authentication flow
* b23f81e fix: mobile responsive layout
* 3a089f1 feat: initial project scaffold`
  }
];
