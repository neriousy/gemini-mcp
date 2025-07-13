# Gemini MCP Server

A Model Context Protocol (MCP) server that integrates Google's Gemini AI with Claude Code for enhanced development workflows.

## Overview

This MCP server provides Claude Code with access to Gemini AI capabilities for advanced code analysis, planning, and consultation. It bridges the gap between Claude's development assistance and Gemini's powerful language understanding, offering a comprehensive AI-powered development experience.

## Features

### Current Tools

#### Planning & Strategy
- **`generate-plan`** - Generate detailed implementation plans for development tasks
- **`strategic-plan`** - Create high-level strategic roadmaps for complex features
- **`review-approach`** - Review and validate implementation approaches before coding

#### Analysis & Understanding  
- **`analyze-codebase`** - Analyze codebase structure and patterns before making changes
- **`explain-concept`** - Get comprehensive explanations of technical concepts and patterns
- **`compare-technologies`** - Compare different technologies, frameworks, or approaches

#### Development Support
- **`gemini-consult`** - Get expert guidance when stuck on problems or need additional context
- **`generate-tests`** - Generate comprehensive test strategies and plans
- **`generate-docs`** - Create documentation structure and content strategies
- **`debug-assist`** - Analyze errors and get systematic debugging assistance

### Claude Commands

Each tool is accessible via Claude Code commands:

#### Planning & Strategy
- `/plan` - Generate detailed implementation plans
- `/strategy` - Create strategic roadmaps for complex features
- `/review` - Review and validate implementation approaches

#### Analysis & Understanding
- `/analyze` - Analyze codebase architecture and patterns
- `/explain` - Get comprehensive explanations of technical concepts
- `/compare` - Compare technologies, frameworks, or approaches

#### Development Support
- `/consult` - Get expert guidance and development advice
- `/tests` - Generate comprehensive test strategies
- `/docs` - Create documentation structure and strategies
- `/debug` - Get systematic debugging assistance

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

```bash
claude mcp add gemini-mcp node /path/to/dist/index.js
```

### Adding custom commands 

Copy the content of claude-commands to your .claude/commands folder

```bash
cp claude-commands/* ./claude/commands
```

### Using the Tools

Once configured, you can use the tools directly in Claude Code:

#### Planning and Strategy
```
/plan Add user authentication with JWT tokens
/strategy Real-time chat system | WebSocket connections, message persistence, user presence
/review I plan to use Redux Toolkit with RTK Query for state management
```

#### Analysis and Understanding
```
/analyze [select files/folders to analyze their architecture]
/explain event loop in Node.js and asynchronous operations
/compare React vs Vue for building a dashboard application
```

#### Development Support
```
/consult How should I structure error handling in my React app?
/tests UserAuthenticationService with login, logout, and password reset methods
/docs REST API endpoints for user management system
/debug TypeError: Cannot read property 'map' of undefined in React component
```

## Development

### Project Structure

```
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # MCP server setup and tool registration
│   ├── gemini.ts             # Gemini client wrapper
│   ├── prompts.ts            # Structured prompt templates
│   ├── tools.ts              # Tool configurations and metadata
│   └── generateCommands.ts   # Auto-generates claude-commands
├── claude-commands/          # Auto-generated Claude command docs
│   ├── plan.md, strategy.md, review.md
│   ├── analyze.md, explain.md, compare.md
│   ├── consult.md, tests.md, docs.md
│   └── debug.md
├── dist/                     # Compiled output
└── package.json
```

### Available Scripts

- `pnpm dev` - Run in development mode with hot reload
- `pnpm build` - Compile TypeScript and auto-generate commands
- `pnpm generate-commands` - Generate claude-commands from tool configurations
- `pnpm start` - Run the compiled server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm clean` - Remove build artifacts

### Adding New Tools

1. Add new prompt template in `src/prompts.ts`
2. Add tool configuration in `src/tools.ts` 
3. Implement the method in `src/gemini.ts`
4. Add case in `src/server.ts` switch statement
5. Run `pnpm generate-commands` to auto-create documentation
6. Update this README if needed

The system automatically generates claude-commands from tool configurations, ensuring consistency.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details