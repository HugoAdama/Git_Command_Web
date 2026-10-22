import type { GlossaryTerm } from '../../types/glossary';

export const gitGlossaryTermsEn: GlossaryTerm[] = [
  {
    id: 'head',
    term: 'HEAD',
    category: 'punteros',
    metaphor: 'Like a bookmark that points to the exact page of the book you are currently reading.',
    definition: 'A symbolic pointer referencing the most recent commit on the currently active branch in your repository.',
    sampleCommand: 'git show HEAD'
  },
  {
    id: 'detached-head',
    term: 'Detached HEAD',
    category: 'punteros',
    metaphor: 'Like taking the bookmark out of the book and leaving it hovering over an old page without a chapter label.',
    definition: 'A state where HEAD points directly to a specific commit hash rather than a named branch. Any new commits will be lost if you switch away without creating a branch.',
    sampleCommand: 'git switch -c rescue-changes'
  },
  {
    id: 'origin-upstream',
    term: 'Origin & Upstream',
    category: 'remotos',
    metaphor: '"Origin" is your personal cloud home (your fork on GitHub); "Upstream" is the parent headquarters where the original project lives.',
    definition: '"origin" is the default alias assigned to the remote repository you cloned. "upstream" is typically the alias for the main source repo when collaborating on open-source.',
    sampleCommand: 'git remote -v'
  },
  {
    id: 'commit-hash',
    term: 'Commit Hash (SHA-1 / SHA-256)',
    category: 'estructuras',
    metaphor: 'A mathematical digital fingerprint or passport ID of a version in time.',
    definition: 'A unique 40-character alphanumeric checksum calculated from the file tree snapshot, author, date, and parent commit.',
    sampleCommand: 'git log --oneline'
  },
  {
    id: 'working-tree',
    term: 'Working Tree',
    category: 'estructuras',
    metaphor: 'Your physical workshop workbench where files and code sit unpacked ready to be edited.',
    definition: 'The actual unpacked files and directories in your local filesystem that you are editing right now.',
    sampleCommand: 'git status'
  },
  {
    id: 'staging-index',
    term: 'Staging Area (Index)',
    category: 'estructuras',
    metaphor: 'A moving box before taping it shut: you choose exactly which items go inside before sealing.',
    definition: 'An intermediate preparation layer where changes are formatted and curated before forming the next commit.',
    sampleCommand: 'git add <file>'
  },
  {
    id: 'fast-forward',
    term: 'Fast-Forward Merge',
    category: 'operaciones',
    metaphor: 'Fast-forwarding a film: history did not fork into two parallel paths, Git simply slides the pointer forward to where the other branch reached.',
    definition: 'A merge where the target branch has no diverging commits, allowing Git to move the branch pointer forward without generating a merge commit.',
    sampleCommand: 'git merge --ff-only'
  },
  {
    id: 'cherry-pick',
    term: 'Cherry-Pick',
    category: 'operaciones',
    metaphor: 'Picking a single cherry from another tree without uprooting the entire branch.',
    definition: 'A command that copies and reapplies the exact patch introduced by a specific commit from any branch into your current branch.',
    sampleCommand: 'git cherry-pick <commit-hash>'
  },
  {
    id: 'squash',
    term: 'Squash (Commit Collapsing)',
    category: 'operaciones',
    metaphor: 'Taking 10 messy scratchpad draft notes and writing one clean, polished executive summary.',
    definition: 'The process of combining multiple small or WIP commits into a single cohesive commit before merging into main.',
    sampleCommand: 'git merge --squash <branch>'
  },
  {
    id: 'reflog',
    term: 'Reflog (Reference Logs)',
    category: 'punteros',
    metaphor: 'The airplane black box of your Git repository: records every single step and movement you made locally.',
    definition: 'A local safety journal that records every time HEAD changed position, enabling recovery of deleted branches and lost commits.',
    sampleCommand: 'git reflog'
  }
];
