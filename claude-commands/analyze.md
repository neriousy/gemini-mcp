# Analyze Codebase

Analyze project architecture and patterns to understand how the codebase works. Provide codebase information in the current context (selected files/folders) and optionally specify a focus area. Gemini will analyze patterns, conventions, and architecture.

## Usage
`/analyze [optional: specific focus area]`

## Example
`/analyze state management patterns in the React components`

## How it works
Gemini analyzes the codebase structure you provide (via context) and gives insights about architecture patterns, conventions, tech stack, and integration guidelines.

## Command
Use the Gemini MCP server to understand your codebase:

```
/mcp__gemini-mcp__analyze-codebase codebaseInfo="{{@.}}" task="{{arg1}}"
```

**Important**: Select relevant files/folders before running this command to provide context.