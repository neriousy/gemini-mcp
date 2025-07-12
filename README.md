# Gemini MCP Server

A Model Context Protocol (MCP) server that integrates Google's Gemini AI with Claude Code for enhanced development workflows.

## Overview

This MCP server provides Claude Code with access to Gemini AI capabilities for advanced code analysis, planning, and consultation. It bridges the gap between Claude's development assistance and Gemini's powerful language understanding, offering a comprehensive AI-powered development experience.

## Features

### Current Tools

- **`generate-plan`** - Generate detailed implementation plans for development tasks
- **`gemini-consult`** - Get expert guidance when stuck on problems or need additional context
- **`analyze-codebase`** - Analyze codebase structure and patterns before making changes
- **`strategic-plan`** - Create high-level strategic roadmaps for complex features
- **`review-approach`** - Review and validate implementation approaches before coding

### Claude Commands

Each tool is accessible via Claude Code commands:
- `/plan` - Generate implementation plans
- `/consult` - Consult with Gemini for development guidance
- `/analyze` - Analyze codebase architecture
- `/strategy` - Create strategic roadmaps
- `/review-by-gemini` - Review implementation approaches

## Prerequisites

- Node.js 18+ and pnpm
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) installed and configured
- Valid Google AI API credentials for Gemini access
- Claude Code CLI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gemini-mcp.git
   cd gemini-mcp
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the project:
   ```bash
   pnpm build
   ```

4. Configure Gemini CLI with your API credentials:
   ```bash
   gemini auth login
   ```

## Usage

### Running the Server

For development:
```bash
pnpm dev
```

For production:
```bash
pnpm start
```

### Integration with Claude Code

Add this server to your Claude Code configuration:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/path/to/gemini-mcp/dist/index.js"]
    }
  }
}
```

### Using the Tools

Once configured, you can use the tools directly in Claude Code:

```
/plan Add user authentication with JWT tokens
```

```
/consult How should I structure error handling in my React app?
```

```
/analyze [paste your codebase structure here]
```

## Development

### Project Structure

```
├── src/
│   ├── index.ts          # Entry point
│   ├── server.ts         # MCP server setup and tool definitions
│   └── gemini.ts         # Gemini client wrapper
├── claude-commands/      # Claude command documentation
│   ├── plan.md
│   ├── consult.md
│   ├── analyze.md
│   ├── strategy.md
│   └── review-by-gemini.md
├── dist/                 # Compiled output
└── package.json
```

### Available Scripts

- `pnpm dev` - Run in development mode with hot reload
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run the compiled server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm clean` - Remove build artifacts

### Adding New Tools

1. Add the tool definition in `src/server.ts`
2. Implement the logic in `src/gemini.ts` if needed
3. Create corresponding documentation in `claude-commands/`
4. Update this README with the new functionality

## API Reference

### Tool Parameters

#### generate-plan
- `task` (string) - The task or feature to implement
- `context` (string, optional) - Additional project context

#### gemini-consult
- `question` (string) - The question or problem
- `currentContext` (string, optional) - Current work context

#### analyze-codebase
- `codebaseInfo` (string) - Codebase structure and files
- `task` (string, optional) - Specific analysis goal

#### strategic-plan
- `feature` (string) - Feature to implement
- `requirements` (string) - Detailed requirements
- `codebaseContext` (string, optional) - Codebase constraints

#### review-approach
- `proposedApproach` (string) - Implementation approach to review
- `context` (string, optional) - Additional context

## Configuration

The server uses the following Gemini models:
- `gemini-2.5-pro` - For complex planning and analysis tasks
- `gemini-2.5-flash` - For quick consultations and reviews

Timeout is set to 10 minutes for complex operations.

## Troubleshooting

### Common Issues

1. **Gemini CLI not found**: Ensure Gemini CLI is installed and in PATH
2. **Authentication errors**: Run `gemini auth login` to refresh credentials
3. **Timeout errors**: Complex requests may exceed the 10-minute timeout
4. **Permission errors**: Ensure proper file permissions for the project directory

### Debugging

Enable debug logging by setting environment variables:
```bash
DEBUG=gemini-mcp* pnpm dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see LICENSE file for details

## Roadmap

Planned enhancements:
- Direct code generation and modification tools
- Automated test generation
- Code refactoring assistance
- Enhanced error handling and debugging tools
- Support for additional Gemini models and configurations