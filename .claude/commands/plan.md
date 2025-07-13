# Plan Implementation

Generate a detailed implementation plan using Gemini's strategic planning capabilities. This command helps you break down complex tasks into actionable steps with clear architecture and testing strategies.

## Usage
`/plan <task description>`

## Example
`/plan Add user authentication with JWT tokens to the Express API`

## How it works
This command takes your task description and generates a comprehensive plan including requirements analysis, implementation steps, files to modify, technical challenges, and testing strategy.

## Command
Use the Gemini MCP server to create a detailed implementation plan:

```
/mcp__gemini-mcp__generate-plan task="{{arg1}}" context="{{@.}}"
```

**Note**: The context (`{{@.}}`) automatically includes any selected files or folders in your editor.