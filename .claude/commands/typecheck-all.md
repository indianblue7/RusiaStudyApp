# Typecheck All

Run TypeScript type checking across the entire project.

## Usage

```
/typecheck-all
```

## Steps

1. Run `npx tsc --noEmit` to check all TypeScript files
2. Report any type errors found
3. Suggest fixes if errors are found

## Notes

- This does not emit any files, only checks types
- Run this before committing to catch type errors early
