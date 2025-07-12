# Contributing to Gemini MCP Server

Thank you for your interest in contributing to the Gemini MCP Server! This document provides guidelines for contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- pnpm package manager
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) installed and configured
- Git

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/gemini-mcp.git
   cd gemini-mcp
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Build the project:
   ```bash
   pnpm build
   ```

5. Run in development mode:
   ```bash
   pnpm dev
   ```

## Project Structure

```
├── src/
│   ├── index.ts          # Entry point and server startup
│   ├── server.ts         # MCP server configuration and tool definitions
│   └── gemini.ts         # Gemini API client wrapper
├── claude-commands/      # Claude Code command documentation
├── dist/                 # Compiled TypeScript output
├── package.json          # Project configuration
└── tsconfig.json         # TypeScript configuration
```

## Development Guidelines

### Code Style

- Use TypeScript for all source code
- Follow existing code formatting and naming conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose

### Adding New Tools

When adding a new MCP tool:

1. **Define the tool in `src/server.ts`**:
   ```typescript
   server.tool(
     'tool-name',
     'Description of what the tool does',
     {
       param1: z.string().describe('Parameter description'),
       param2: z.string().optional().describe('Optional parameter'),
     },
     async ({ param1, param2 }) => {
       // Implementation
     }
   );
   ```

2. **Add corresponding method to `src/gemini.ts`** if needed:
   ```typescript
   async newFeature(param1: string, param2?: string): Promise<string> {
     const prompt = `Your Gemini prompt here`;
     return this.executeCommand('gemini-2.5-pro', prompt);
   }
   ```

3. **Create Claude command documentation** in `claude-commands/`:
   ```markdown
   # Tool Name
   
   Description of the tool and its purpose.
   
   ## Usage
   `/command-name <parameters>`
   
   ## Parameters
   - `param1` - Description
   - `param2` (optional) - Description
   ```

4. **Update README.md** with the new tool information

### Error Handling

- Always wrap Gemini API calls in try-catch blocks
- Return meaningful error messages to users
- Log errors for debugging purposes
- Handle timeouts gracefully

### Testing

Currently, the project uses manual testing. When adding new features:

1. Test the tool through Claude Code integration
2. Verify error handling with invalid inputs
3. Test with various prompt complexities
4. Ensure proper timeout handling

## Commit Guidelines

### Commit Message Format

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(tools): add code generation tool
fix(gemini): handle timeout errors properly
docs: update README with new tool documentation
```

### Branch Naming

- Feature branches: `feature/tool-name` or `feature/description`
- Bug fixes: `fix/issue-description`
- Documentation: `docs/update-description`

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines above
3. **Test your changes** thoroughly
4. **Update documentation** as needed
5. **Submit a pull request** with:
   - Clear description of changes
   - Link to any related issues
   - Screenshots/examples if applicable

### Pull Request Template

```markdown
## Description
Brief description of what this PR does.

## Changes Made
- List of specific changes
- New features added
- Bugs fixed

## Testing
- [ ] Manual testing completed
- [ ] Error handling verified
- [ ] Documentation updated

## Related Issues
Closes #issue-number
```

## Code Review Process

All contributions will be reviewed for:
- Code quality and consistency
- Proper error handling
- Security considerations
- Documentation completeness
- Functionality and testing

## Security Guidelines

- Never commit API keys or sensitive information
- Validate all user inputs before processing
- Use secure shell command execution practices
- Handle file operations safely

## Getting Help

- Create an issue for bugs or feature requests
- Use discussions for questions and ideas
- Check existing issues before creating new ones

## License

By contributing to this project, you agree that your contributions will be licensed under the same ISC license as the project.