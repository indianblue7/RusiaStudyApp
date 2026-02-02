# Build Validator Agent

Validates that the project builds successfully without errors.

## Purpose

Automatically run builds and verify that the application compiles correctly.

## Triggers

Use this agent when:
- After making significant changes
- Before creating a pull request
- Before deploying

## Tasks

1. Run `npm run build`
2. Check for TypeScript errors
3. Check for build warnings
4. Verify build output size
5. Report any issues found

## Success Criteria

- Build completes without errors
- No critical warnings
- Build size is reasonable (< 1MB for this app)
