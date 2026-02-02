# Commit, Push, and Create PR

Automates the git workflow: stage changes, commit, push, and create a pull request.

## Usage

```
/commit-push-pr
```

## Steps

1. Run `git status` to see changes
2. Run `git diff` to review changes
3. Stage all changes with `git add .`
4. Create a commit with a descriptive message
5. Push to the current branch
6. Create a pull request using `gh pr create`

## Notes

- Commit message should follow conventional commits format
- Always include "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
- PR title should be concise and descriptive
